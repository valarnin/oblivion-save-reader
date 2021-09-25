import { short, uint32, ushort } from "../../../types";
import { ESMBuffer } from "../../../util";
import { Subrecord } from "./Subrecord";

export class ACBS extends Subrecord {
    public readonly flags: uint32;
    public readonly baseSpell: ushort;
    public readonly fatigue: ushort;
    public readonly barterGold: ushort;
    public readonly level: short;
    public readonly calcMin: ushort;
    public readonly calcMax: ushort;
    constructor(buf: ESMBuffer) {
        super('ACBS', buf, false);
        this.flags = buf.readUInt();
        this.baseSpell = buf.readUShort();
        this.fatigue = buf.readUShort();
        this.barterGold = buf.readUShort();
        this.level = buf.readShort();
        this.calcMin = buf.readUShort();
        this.calcMax = buf.readUShort();
    }
}
