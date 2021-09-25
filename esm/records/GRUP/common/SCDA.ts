import { formid, ubyte } from "../../../types";
import { ESMBuffer } from "../../../util";
import { Subrecord } from "./Subrecord";

export class SCDA extends Subrecord {
    
    constructor(buf: ESMBuffer) {
        super('SCDA', buf, false);
        buf.advance(this.subrecordDataLength);
    }
}
