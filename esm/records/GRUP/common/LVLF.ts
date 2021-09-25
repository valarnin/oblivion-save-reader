import { ubyte } from "../../../types";
import { ESMBuffer } from "../../../util";
import { Subrecord } from "./Subrecord";

export class LVLF extends Subrecord {
    public readonly flags: ubyte;
    constructor(buf: ESMBuffer) {
        super('LVLF', buf, false);
        this.flags = buf.readUByte();
    }
}
