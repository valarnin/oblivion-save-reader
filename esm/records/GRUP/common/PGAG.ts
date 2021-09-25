import { ubyte } from "../../../types";
import { ESMBuffer } from "../../../util";
import { Subrecord } from "./Subrecord";

export class PGAG extends Subrecord {
    
    constructor(buf: ESMBuffer) {
        super('PGAG', buf, false);
        buf.advance(this.subrecordDataLength);
    }
}
