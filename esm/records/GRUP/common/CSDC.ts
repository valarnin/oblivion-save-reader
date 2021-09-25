import { ubyte } from "../../../types";
import { ESMBuffer } from "../../../util";
import { Subrecord } from "./Subrecord";

export class CSDC extends Subrecord {
    public readonly chance: ubyte;
    constructor(buf: ESMBuffer) {
        super('CSDC', buf, false);
        this.chance = buf.readUByte();
    }
}
