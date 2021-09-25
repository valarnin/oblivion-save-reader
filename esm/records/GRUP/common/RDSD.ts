import { ubyte } from "../../../types";
import { ESMBuffer } from "../../../util";
import { Subrecord } from "./Subrecord";

export class RDSD extends Subrecord {
    
    constructor(buf: ESMBuffer) {
        super('RDSD', buf, false);
        buf.advance(this.subrecordDataLength);
    }
}
