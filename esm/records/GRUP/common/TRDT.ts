import { ubyte, uint32 } from "../../../types";
import { ESMBuffer } from "../../../util";
import { Subrecord } from "./Subrecord";

export class TRDT extends Subrecord {
    public readonly emotionType: uint32;
    public readonly emotionValue: uint32;
    public readonly unknown1: ubyte[];
    public readonly responseNumber: ubyte;
    public readonly unknown2: ubyte[];
    constructor(buf: ESMBuffer) {
        super('TRDT', buf, false);
        this.emotionType = buf.readUInt();
        this.emotionValue = buf.readUInt();
        this.unknown1 = buf.readUByteArray(4);
        this.responseNumber = buf.readUByte();
        this.unknown2 = buf.readUByteArray(3);
    }
}
