import { ushort } from "../../types";
import { ESMBuffer } from "../../util";
import { OFST_Subrecord } from "./OFST_Subrecord";

// UESP seems to be incorrect on this record type?

export class OFST {
    public readonly subRecords: OFST_Subrecord[] = [];
    public readonly subrecordDataLength: ushort;
    public readonly subrecordLength: number;
    public readonly totalLength: number;
    constructor(buf: ESMBuffer) {
        this.subrecordDataLength = buf.readUShort();
        this.totalLength = 6 + this.subrecordDataLength;
        this.subrecordLength = this.subrecordDataLength / 12;
        for (let i = 0; i < this.subrecordLength; ++i) {
            this.subRecords.push(new OFST_Subrecord(buf));
        }
    }
}
