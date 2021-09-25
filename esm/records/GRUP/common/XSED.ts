import { ubyte } from "../../../types";
import { ESMBuffer } from "../../../util";
import { Subrecord } from "./Subrecord";

export class XSED extends Subrecord {
        constructor(buf: ESMBuffer) {
        super('XSED', buf, false);
        buf.advance(this.subrecordDataLength);
    }
}
