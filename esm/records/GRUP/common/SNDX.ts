import { byte, short, ubyte, uint32, ushort } from "../../../types";
import { ESMBuffer } from "../../../util";
import { Subrecord } from "./Subrecord";

export class SNDX extends Subrecord {
    public readonly minAttentuation: byte;
    public readonly maxAttentuation: byte;
    public readonly frequencyAdjustment: byte;
    public readonly unknown1: ubyte;
    public readonly flags: ushort;
    public readonly unknown2: ushort;
    public readonly staticAttentuation: short;
    public readonly stopTime: ubyte;
    public readonly startTime: ubyte;
    constructor(buf: ESMBuffer) {
        super('SNDX', buf, false);
        this.minAttentuation = buf.readByte();
        this.maxAttentuation = buf.readByte();
        this.frequencyAdjustment = buf.readByte();
        this.unknown1 = buf.readUByte();
        this.flags = buf.readUShort();
        this.unknown2 = buf.readUShort();
        this.staticAttentuation = buf.readShort();
        this.stopTime = buf.readUByte();
        this.startTime = buf.readUByte();
    }
}
