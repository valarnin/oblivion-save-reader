import { formid, uint32 } from "../../../types";
import { ESMBuffer } from "../../../util";
import { Subrecord } from "./Subrecord";

export class SPIT extends Subrecord {
    public readonly type: uint32;
    public readonly spellCost: uint32;
    public readonly spellLevel: uint32;
    public readonly flags: uint32;
    constructor(buf: ESMBuffer) {
        super('SPIT', buf, false);
        this.type = buf.readUInt();
        this.spellCost = buf.readUInt();
        this.spellLevel = buf.readUInt();
        this.flags = buf.readUInt();
    }
}
