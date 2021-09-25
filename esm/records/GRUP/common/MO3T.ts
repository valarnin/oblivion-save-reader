import { formid, ubyte } from "../../../types";
import { ESMBuffer } from "../../../util";
import { Subrecord } from "./Subrecord";

export class MO3T extends Subrecord {
    
    constructor(buf: ESMBuffer) {
        super('MO3T', buf, false);
        buf.advance(this.subrecordDataLength);
    }
}
