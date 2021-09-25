import { ubyte } from "../../../types";
import { ESMBuffer } from "../../../util";
import { Subrecord } from "./Subrecord";

export class SOUL extends Subrecord {
    public readonly currentSoul: ubyte;
    constructor(buf: ESMBuffer) {
        super('SOUL', buf, false);
        this.currentSoul = buf.readUByte();
    }
}
