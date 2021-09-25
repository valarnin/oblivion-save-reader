import { ushort } from "../../../types";
import { ESMBuffer } from "../../../util";
import { Subrecord } from "./Subrecord";

export class ANAM extends Subrecord {
    public readonly enchantment: ushort;
    constructor(buf: ESMBuffer) {
        super('ANAM', buf, false);
        this.enchantment = buf.readUShort();
    }
}
