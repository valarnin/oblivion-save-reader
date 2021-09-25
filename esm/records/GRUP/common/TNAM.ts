import { ubyte } from "../../../types";
import { ESMBuffer } from "../../../util";
import { Subrecord } from "./Subrecord";

export class TNAM extends Subrecord {
    
    constructor(buf: ESMBuffer) {
        super('TNAM', buf, false);
        buf.advance(this.subrecordDataLength);
    }
}
