import pako from "pako";
import { uint32, formid, ubyte } from "../types";
import { ESMBuffer } from "../util";
import { ACTI } from "./GRUP/ACTI";
import { Subrecord } from "./GRUP/common/Subrecord";
import GRUPFactory, { GRUP_Subrecord } from "./GRUP/GRUPFactory";

export default class GRUP {
    public readonly totalSize: uint32;
    public readonly dataSize: uint32;
    public readonly label: string;
    public readonly groupTypeData: ubyte[];
    public readonly versionControl: uint32;
    public subRecords: GRUP_Subrecord[] = [];
    public offset: number;

    constructor(public readonly type: string, buf: ESMBuffer, include?: string[]) {
        this.offset = buf.offset - 4;
        this.dataSize = buf.readUInt() - 20; // -20 for header
        this.totalSize = this.dataSize + 20;
        this.label = buf.readString(4);
        this.groupTypeData = buf.readUByteArray(4);
        this.versionControl = buf.readUInt();
        if (this.dataSize >= 4) {
            let offset = 0;
            while (offset < this.dataSize) {
                const subrecord: GRUP_Subrecord = GRUPFactory(buf);
                if (!(subrecord instanceof GRUP)) {
                    delete subrecord.tmpBuf;
                }
                offset += subrecord.totalSize;
                if (!include || include.includes(subrecord.type)) {
                    this.subRecords.push(subrecord);
                }
            }
        }
    }
}
