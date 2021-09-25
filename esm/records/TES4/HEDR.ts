import { float, int32, uint32, ushort } from "../../types";
import { ESMBuffer } from "../../util";


export class HEDR {
    public readonly subrecordDataLength: ushort;
    public readonly version: float;
    public readonly numRecords: int32;
    public readonly nextObjectId: uint32;
    public readonly totalLength: number;
    constructor(buf: ESMBuffer) {
        this.subrecordDataLength = buf.readUShort();
        this.totalLength = 6 + this.subrecordDataLength;
        this.version = buf.readFloat();
        this.numRecords = buf.readInt();
        this.nextObjectId = buf.readUInt();
    }
}
