import { ubyte } from "../../../types";
import { ESMBuffer } from "../../../util";
import { Subrecord } from "./Subrecord";

export class SNDD extends Subrecord {
    
    constructor(buf: ESMBuffer) {
        super('FGGS', buf, false);
        buf.advance(this.subrecordDataLength);
    }
}
