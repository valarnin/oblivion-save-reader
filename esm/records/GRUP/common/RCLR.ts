import { ubyte } from "../../../types";
import { ESMBuffer } from "../../../util";
import { Subrecord } from "./Subrecord";

export class RCLR extends Subrecord {
    
    constructor(buf: ESMBuffer) {
        super('RCLR', buf, false);
        buf.advance(this.subrecordDataLength);
    }
}
