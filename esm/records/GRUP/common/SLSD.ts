import { uint32 } from "../../../types";
import { ESMBuffer } from "../../../util";
import { Subrecord } from "./Subrecord";

export class SLSD extends Subrecord {
    public readonly index: uint32;
    public readonly unknown1: uint32;
    public readonly unknown2: uint32;
    public readonly unknown3: uint32;
    public readonly type: uint32;
    public readonly unknown4: uint32;
    constructor(buf: ESMBuffer) {
        super('SLSD', buf, false);
        this.index = buf.readUInt();
        this.unknown1 = buf.readUInt();
        this.unknown2 = buf.readUInt();
        this.unknown3 = buf.readUInt();
        this.type = buf.readUInt();
        this.unknown4 = buf.readUInt();
    }
}
