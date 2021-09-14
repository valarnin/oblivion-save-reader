import Record from "./record";
import { SaveBuffer } from "./util";

export class RecordAI {
    neverRun: boolean;

    constructor(record: Record, buf: SaveBuffer) {
        this.neverRun = (record.flags & 0x10000000) === 0x10000000;
        if (buf.buffer.byteLength !== buf.offset) {
            debugger;
        }
    }
}