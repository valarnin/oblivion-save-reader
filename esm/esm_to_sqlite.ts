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
import { REFR } from './records/GRUP/REFR';
import { NAME } from './records/GRUP/common/NAME';

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

argumentParser.add_argument('-e', '--exclude', {
    type: 'string',
    help: 'Comma-separated list of record types to exclude. Also excludes REFR records with those types as parents',
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

const excludes: string[] = args.exclude?.split(',') ?? [];
const excludesMap: number[] = [];

const buildExcludesMap = (record: Record | GRUP) => {
    if (record instanceof Record && excludes.includes(record.type)) {
        excludesMap.push(record.formId);
    }
    for (const v of record.subRecords) {
        if (!(v instanceof Subrecord)) {
            buildExcludesMap(v);
        }
    }
};

const bigIntReplacer = (k:string,v:any) => typeof v === 'bigint' ? v.toString() : v;

const extractExtraKey = (record: Record | GRUP | Subrecord) => {
    if (record instanceof GRUP)
        return null;

    const commonKeys = ['id', 'formId', 'formid'];

    for (const key of commonKeys) {
        if (key in record && (typeof record[key as keyof (Record | Subrecord)]) === 'number') {
            return record[key as keyof (Record | Subrecord)] as number;
        }
    }

    for (const key in record) {
        if (key.toLowerCase().includes('id') && (typeof record[key as keyof (Record | Subrecord)]) === 'number') {
            return record[key as keyof (Record | Subrecord)] as number;
        }
    }
    return null;
};

const to: string = args.to ?? from.replace(/\.es[mp]$/i, '.db');
void sqlite.open({
    filename: to,
    driver: sqlite3.Database,
}).then(async (db) => {
    const file = fs.readFileSync(from);
    const esm = new ESM(file.buffer.slice(file.byteOffset, file.byteOffset + file.byteLength)).init();

    if (excludes && excludes.length) {
        for (const group of esm.groups) {
            buildExcludesMap(group);
        }
    }

    await db.exec(`
CREATE TABLE "Records" (
    "id"	INTEGER,
    "type"	TEXT NOT NULL,
    "offset"	INT,
    "formId"	INT,
    "parent"	INT,
    "extraId"	INT,
    "content"	TEXT,
    FOREIGN KEY("parent") REFERENCES "Records"("id"),
    PRIMARY KEY("id" AUTOINCREMENT)
);
CREATE INDEX idx_type ON Records(type);
CREATE INDEX idx_formId ON Records(formId);
CREATE INDEX idx_parent ON Records(parent);
CREATE INDEX idx_extraId ON Records(extraId);
`).catch(e=>console.log(e));

    const stmt = await db.prepare('INSERT INTO Records (type, parent, offset, formId, extraId, content) VALUES (?, ?, ?, ?, ?, ?)');
    await db.run('BEGIN');
    let i = 0;
    const runStmt = async (type: string, parent: number, offset: number, formId: number|null, extraId: number|null, content: string) => {
        const res = await stmt.run(type,parent,offset,formId,extraId,content);
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
        if (record instanceof Record && excludes.includes(record.type)) {
            return;
        }
        if (record instanceof REFR) {
            const name = record.subRecords.find(sr=>sr.label === 'NAME');
            if (name instanceof NAME) {
                if (excludesMap.includes(name.formId)) {
                    return;
                }
            }
        }
        const tmpCopy = {...record} as Partial<Record | GRUP>;
        delete tmpCopy.subRecords;
        const id = await runStmt(record.type, parent, record.offset, record instanceof GRUP ? null : record.formId, extractExtraKey(record), JSON.stringify(tmpCopy, bigIntReplacer));
        for (const v of record.subRecords) {
            if (v instanceof Subrecord) {
                await runStmt(v.label, id, v.offset, null, extractExtraKey(v), JSON.stringify(v, bigIntReplacer));
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
