import Record from "./record";
import { bufToByte, bufToInt } from "./util";

export class RecordGeneric {
    flags?: number;
    value?: number;
    constructor(record: Record, buf: ArrayBuffer, offset: number) {
        if (record.flags & 0x1) {
            this.flags = bufToInt(buf.slice(offset, offset + 4));
            offset += 4;
        }
        if (record.flags & 0x8) {
            this.value = bufToInt(buf.slice(offset, offset + 4));
            offset += 4;
        }
    }
}