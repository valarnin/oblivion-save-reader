import { ubyte } from "../../../types";
import { ESMBuffer } from "../../../util";
import { Subrecord } from "./Subrecord";

export class RDMP extends Subrecord {
    
    constructor(buf: ESMBuffer) {
        super('RDMP', buf, false);
        buf.advance(this.subrecordDataLength);
    }
}
