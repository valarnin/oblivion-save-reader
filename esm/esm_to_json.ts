import { ArgumentParser } from 'argparse';

import fs from 'fs';
import JsonStreamStringify from 'json-stream-stringify';
import path from 'path';
import ESM from './ESM';

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
    help: 'The JSON file to write to',
    required: false,
});

argumentParser.add_argument('-s', '--format', {
    type: 'boolean',
    help: 'Whether to also write a `_formatted` JSON file',
    required: false,
    default: false,
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

const to: string = args.to ?? from.replace(/\.es[mp]$/i, '.json');
const to_formatted: string = to.replace(/\.json$/i, '_formatted.json');

const esm = new ESM(fs.readFileSync(from).buffer).init();

gc && gc();
{
    let stringifier = new JsonStreamStringify(esm);
    stringifier.once('error', () => console.log('Error at path', stringifier.path().join('.')));
    stringifier.pipe(fs.createWriteStream(to));
}
if (args.format) {
    gc && gc();
    {
        let stringifier = new JsonStreamStringify(esm, undefined, 2);
        stringifier.once('error', () => console.log('Error at path', stringifier.path().join('.')));
        stringifier.pipe(fs.createWriteStream(to_formatted));
    }
}