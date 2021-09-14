import Record from "./record";
import { SaveBuffer } from "./util";

export class RecordGeneric {
    flags?: number;
    value?: number;
    constructor(record: Record, buf: SaveBuffer) {
        if (record.flags & 0x1) {
            this.flags = buf.readInt();
        }
        if (record.flags & 0x8) {
            this.value = buf.readInt();
        }
        if (buf.buffer.byteLength !== buf.offset) {
            debugger;
        }
    }
}