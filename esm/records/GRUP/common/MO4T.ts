import { formid, ubyte } from "../../../types";
import { ESMBuffer } from "../../../util";
import { Subrecord } from "./Subrecord";

export class MO4T extends Subrecord {
    
    constructor(buf: ESMBuffer) {
        super('MO4T', buf, false);
        buf.advance(this.subrecordDataLength);
    }
}
