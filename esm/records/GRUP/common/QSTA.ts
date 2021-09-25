import { formid, ubyte } from "../../../types";
import { ESMBuffer } from "../../../util";
import { Subrecord } from "./Subrecord";

export class QSTA extends Subrecord {
    public readonly formid: formid;
    public readonly flags: ubyte;
    public readonly unknown: ubyte[];
    constructor(buf: ESMBuffer) {
        super('QSTA', buf, false);
        this.formid = buf.readUInt();
        this.flags = buf.readUByte();
        this.unknown = buf.readUByteArray(3);
    }
}
