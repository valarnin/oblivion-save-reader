import { ArgumentParser } from 'argparse';

import fs from 'fs';
import JsonStreamStringify from 'json-stream-stringify';
import path from 'path';
import ESM from './ESM';
import sqlite3 from 'sqlite3';
import * as sqlite from 'sqlite';
import { GRUP_Subrecord } from './records/GRUP/GRUPFactory';
import GRUP from './records/GRUP';
import { Record } from './records/GRUP/Record';
import { Subrecord } from './records/GRUP/common/Subrecord';

const argumentParser = new ArgumentParser({
    description: 'A collection of common util functions for developing cactbot.',
});

argumentParser.add_argument('-f', '--from', {
    type: 'string',
    help: 'The ESM or ESP file to read',
    required: true,
});

argumentParser.add_argument('-t', '--to', {
    type: 'string',
    help: 'The SQLite DB to write to',
    required: false,
});

const args = argumentParser.parse_args();

const from: string = args.from;

const ext = path.extname(from);

if (!['.esp', '.esm'].includes(ext.toLowerCase())) {
    console.log(`Invalid input file ${from}`);
    process.exit(1);
}

if (!fs.existsSync(from)) {
    console.log(`Invalid input file ${from}`);
    process.exit(1);
}

const bigIntReplacer = (k:string,v:any) => typeof v === 'bigint' ? v.toString() : v;

const to: string = args.to ?? from.replace(/\.es[mp]$/i, '.db');
void sqlite.open({
    filename: to,
    driver: sqlite3.Database,
}).then(async (db) => {
    const file = fs.readFileSync(from);
    const esm = new ESM(file.buffer.slice(file.byteOffset, file.byteOffset + file.byteLength)).init();
    await db.exec(`
CREATE TABLE "Records" (
    "id"	INTEGER,
    "type"	TEXT NOT NULL,
    "offset"	INT,
    "formId"	INT,
    "parent"	INT,
    "content"	TEXT,
    FOREIGN KEY("parent") REFERENCES "Records"("id"),
    PRIMARY KEY("id" AUTOINCREMENT)
);
CREATE INDEX idx_type ON Records(type);
CREATE INDEX idx_formId ON Records(formId);
`).catch(e=>console.log(e));

    const stmt = await db.prepare('INSERT INTO Records (type, parent, offset, formId, content) VALUES (?, ?, ?, ?, ?)');
    await db.run('BEGIN');
    let i = 0;
    const runStmt = async (type: string, parent: number, offset: number, formId: number|null, content: string) => {
        const res = await stmt.run(type,parent,offset,formId,content);
        ++i;
        if (i >= 100000) {
            console.log(`Committing ${i} statements in transaction`);
            await db.run('END');
            await db.run('BEGIN');
            i=0;
        }
        return res.lastID as number;
    };
    const recursiveAdd = async (parent: number, record: Record | GRUP) => {
        const tmpCopy = {...record} as Partial<Record | GRUP>;
        delete tmpCopy.subRecords;
        const id = await runStmt(record.type, parent, record.offset, record instanceof GRUP ? null : record.formId, JSON.stringify(tmpCopy, bigIntReplacer));
        for (const v of record.subRecords) {
            if (v instanceof Subrecord) {
                await runStmt(v.label, id, v.offset, null, JSON.stringify(v, bigIntReplacer));
            } else {
                await recursiveAdd(id, v as GRUP_Subrecord);
            }
        }
    };

    const res = await stmt.run(esm.header?.type, null, 0, esm.header?.formId, JSON.stringify(esm.header, bigIntReplacer));
    const tes4Id = res.lastID ?? 0;
    for (const r of esm.groups) {
        await recursiveAdd(tes4Id, r);
    }
    console.log(`Committing ${i} statements in transaction`);
    await db.run('END');
}, (reason) => {
    console.log(reason);
});
