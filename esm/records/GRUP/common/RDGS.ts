import { ubyte } from "../../../types";
import { ESMBuffer } from "../../../util";
import { Subrecord } from "./Subrecord";

export class RDGS extends Subrecord {
    
    constructor(buf: ESMBuffer) {
        super('RDGS', buf, false);
        buf.advance(this.subrecordDataLength);
    }
}
