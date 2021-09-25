import { formid, ubyte } from "../../../types";
import { ESMBuffer } from "../../../util";
import { Subrecord } from "./Subrecord";

export class SCHD extends Subrecord {
    
    constructor(buf: ESMBuffer) {
        super('SCHD', buf, false);
        buf.advance(this.subrecordDataLength);
    }
}
