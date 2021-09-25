import { ubyte } from "../../../types";
import { ESMBuffer } from "../../../util";
import { Subrecord } from "./Subrecord";

export class XCLL extends Subrecord {
    
    constructor(buf: ESMBuffer) {
        super('XCLL', buf, false);
        buf.advance(this.subrecordDataLength);
    }
}
