import { ubyte } from "../../../types";
import { ESMBuffer } from "../../../util";
import { Subrecord } from "./Subrecord";

export class RPLI extends Subrecord {
    
    constructor(buf: ESMBuffer) {
        super('RPLI', buf, false);
        buf.advance(this.subrecordDataLength);
    }
}
