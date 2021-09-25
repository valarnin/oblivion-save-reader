import { ubyte } from "../../../types";
import { ESMBuffer } from "../../../util";
import { Subrecord } from "./Subrecord";

export class CSTD extends Subrecord {
    
    constructor(buf: ESMBuffer) {
        super('CSTD', buf, false);
        buf.advance(this.subrecordDataLength);
    }
}
