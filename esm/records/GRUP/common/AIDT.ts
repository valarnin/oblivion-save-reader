import { ubyte, uint32, ushort } from "../../../types";
import { ESMBuffer } from "../../../util";
import { Subrecord } from "./Subrecord";

export class AIDT extends Subrecord {
    public readonly aggression: ubyte;
    public readonly confidence: ubyte;
    public readonly energyLevel: ubyte;
    public readonly responsibility: ubyte;
    public readonly aiFlags: uint32;
    public readonly trainSkill: ubyte;
    public readonly trainLevel: ubyte;
    public readonly aiUnknown: ushort;
    constructor(buf: ESMBuffer) {
        super('AIDT', buf, false);
        this.aggression = buf.readUByte();
        this.confidence = buf.readUByte();
        this.energyLevel = buf.readUByte();
        this.responsibility = buf.readUByte();
        this.aiFlags = buf.readUInt();
        this.trainSkill = buf.readUByte();
        this.trainLevel = buf.readUByte();
        this.aiUnknown = buf.readUShort();
    }
}
