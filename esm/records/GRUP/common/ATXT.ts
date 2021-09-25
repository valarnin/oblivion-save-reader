import { formid, int32, ubyte, uint32, ushort } from "../../../types";
import { ESMBuffer } from "../../../util";
import { Subrecord } from "./Subrecord";

export class ATXT extends Subrecord {
    public readonly formid: formid;
    public readonly quadrant: ubyte;
    public readonly unknown: ubyte;
    public readonly layer: ushort;
    constructor(buf: ESMBuffer) {
        super('ATXT', buf, false);
        this.formid = buf.readUInt();
        this.quadrant = buf.readUByte();
        this.unknown = buf.readUByte();
        this.layer = buf.readUShort();
    }
}
