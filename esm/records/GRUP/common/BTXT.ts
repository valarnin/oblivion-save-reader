import { formid, int32, ubyte, uint32 } from "../../../types";
import { ESMBuffer } from "../../../util";
import { Subrecord } from "./Subrecord";

export class BTXT extends Subrecord {
    public readonly formid: formid;
    public readonly quadrant: ubyte;
    public readonly unknown: ubyte[];
    constructor(buf: ESMBuffer) {
        super('BTXT', buf, false);
        this.formid = buf.readUInt();
        this.quadrant = buf.readUByte();
        this.unknown = buf.readUByteArray(3);
    }
}
