import { ubyte } from "../../../types";
import { ESMBuffer } from "../../../util";
import { Subrecord } from "./Subrecord";

export class RDAT extends Subrecord {
    
    constructor(buf: ESMBuffer) {
        super('RDAT', buf, false);
        buf.advance(this.subrecordDataLength);
    }
}
