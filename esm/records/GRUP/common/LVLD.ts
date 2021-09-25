import { ubyte } from "../../../types";
import { ESMBuffer } from "../../../util";
import { Subrecord } from "./Subrecord";

export class LVLD extends Subrecord {
    public readonly chance: ubyte;
    constructor(buf: ESMBuffer) {
        super('LVLD', buf, false);
        this.chance = buf.readUByte();
    }
}
