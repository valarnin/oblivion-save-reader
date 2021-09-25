import { uint64, ushort } from "../../types";
import { ESMBuffer } from "../../util";


export class MAST {
    public readonly subrecordDataLength: ushort;
    public readonly masterfile: string;
    public readonly masterfileSize: uint64;
    public readonly totalLength: number;
    constructor(buf: ESMBuffer) {
        this.subrecordDataLength = buf.readUShort();
        this.totalLength = 6 + this.subrecordDataLength;
        this.masterfile = buf.readString(this.subrecordDataLength).slice(0, -1);
        buf.readString(4); // DATA
        this.masterfileSize = buf.readUInt64();
    }
}
