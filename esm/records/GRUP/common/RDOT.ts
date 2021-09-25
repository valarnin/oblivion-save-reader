import { ubyte } from "../../../types";
import { ESMBuffer } from "../../../util";
import { Subrecord } from "./Subrecord";

export class RDOT extends Subrecord {
    
    constructor(buf: ESMBuffer) {
        super('RDOT', buf, false);
        buf.advance(this.subrecordDataLength);
    }
}
