import { ubyte } from "../../../types";
import { ESMBuffer } from "../../../util";
import { Subrecord } from "./Subrecord";

export class RPLD extends Subrecord {
    
    constructor(buf: ESMBuffer) {
        super('RPLD', buf, false);
        buf.advance(this.subrecordDataLength);
    }
}
