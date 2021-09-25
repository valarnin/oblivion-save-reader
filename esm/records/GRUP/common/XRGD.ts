import { formid, ubyte } from "../../../types";
import { ESMBuffer } from "../../../util";
import { Subrecord } from "./Subrecord";

// UESP incorrect about this record, it's much longer than 28 bytes
export class XRGD extends Subrecord {
    
    constructor(buf: ESMBuffer) {
        super('XRGD', buf, false);
        buf.advance(this.subrecordDataLength);
    }
}
