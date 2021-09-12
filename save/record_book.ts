import Record from "./record";
import { SaveBuffer } from "./util";

export class RecordBook {
    flags?: number;
    value?: number;
    teaches?: number;
    constructor(record: Record, buf: SaveBuffer) {
        if (record.flags & 0x1) {
            this.flags = buf.readInt();
        }
        if (record.flags & 0x8) {
            this.value = buf.readInt();
        }
        if (record.flags & 0x4) {
            this.teaches = buf.readByte();
        }
    }
}