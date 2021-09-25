import { ubyte } from "../../../types";
import { ESMBuffer } from "../../../util";
import { Subrecord } from "./Subrecord";

export class FGTS extends Subrecord {
    
    constructor(buf: ESMBuffer) {
        super('FGTS', buf, false);
        buf.advance(this.subrecordDataLength);
    }
}
