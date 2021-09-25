import { ubyte } from "../../../types";
import { ESMBuffer } from "../../../util";
import { Subrecord } from "./Subrecord";

export class FGGA extends Subrecord {
    
    constructor(buf: ESMBuffer) {
        super('FGGA', buf, false);
        buf.advance(this.subrecordDataLength);
    }
}
