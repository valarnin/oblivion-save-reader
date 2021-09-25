import { formid, ubyte } from "../../../types";
import { ESMBuffer } from "../../../util";
import { Subrecord } from "./Subrecord";

export class NIFT extends Subrecord {
    
    constructor(buf: ESMBuffer) {
        super('NIFT', buf, false);
        buf.advance(this.subrecordDataLength);
    }
}
