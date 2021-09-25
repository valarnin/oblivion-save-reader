import { ubyte } from "../../../types";
import { ESMBuffer } from "../../../util";
import { Subrecord } from "./Subrecord";

export class RDMD extends Subrecord {
    
    constructor(buf: ESMBuffer) {
        super('RDMD', buf, false);
        buf.advance(this.subrecordDataLength);
    }
}
