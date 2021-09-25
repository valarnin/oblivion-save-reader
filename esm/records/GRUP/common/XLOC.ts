import { formid, ubyte } from "../../../types";
import { ESMBuffer } from "../../../util";
import { Subrecord } from "./Subrecord";

export class XLOC extends Subrecord {
    
    constructor(buf: ESMBuffer) {
        super('XLOC', buf, false);
        buf.advance(this.subrecordDataLength);
    }
}
