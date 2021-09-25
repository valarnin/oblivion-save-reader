import { ubyte } from "../../../types";
import { ESMBuffer } from "../../../util";
import { Subrecord } from "./Subrecord";

export class SLCP extends Subrecord {
    public readonly maxCapacity: ubyte;
    constructor(buf: ESMBuffer) {
        super('SLCP', buf, false);
        this.maxCapacity = buf.readUByte();
    }
}
