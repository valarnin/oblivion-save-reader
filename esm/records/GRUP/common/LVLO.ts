import { short, uint32 } from "../../../types";
import { ESMBuffer } from "../../../util";
import { Subrecord } from "./Subrecord";

export class LVLO extends Subrecord {
    public readonly level: short;
    public readonly unknown1: short;
    public readonly formid: uint32;
    public readonly count?: short;
    public readonly unknown2?: short;
    constructor(buf: ESMBuffer) {
        super('LVLO', buf, false);
        this.level = buf.readShort();
        this.unknown1 = buf.readShort();
        this.formid = buf.readUInt();
        if (this.subrecordDataLength > 8) {
            this.count = buf.readShort();
            this.unknown2 = buf.readShort();
        }
    }
}
