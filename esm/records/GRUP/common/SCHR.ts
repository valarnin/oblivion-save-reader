import { formid, ubyte } from "../../../types";
import { ESMBuffer } from "../../../util";
import { Subrecord } from "./Subrecord";

export class SCHR extends Subrecord {
    
    constructor(buf: ESMBuffer) {
        super('SCHR', buf, false);
        buf.advance(this.subrecordDataLength);
    }
}
