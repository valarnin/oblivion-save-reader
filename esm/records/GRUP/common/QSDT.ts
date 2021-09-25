import { ubyte } from "../../../types";
import { ESMBuffer } from "../../../util";
import { Subrecord } from "./Subrecord";

export class QSDT extends Subrecord {
    public readonly flags: ubyte;
    constructor(buf: ESMBuffer) {
        super('QSDT', buf, false);
        this.flags = buf.readUByte();
    }
}
