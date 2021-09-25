import { ESMBuffer } from "../util";
import { CNAM } from "./TES4/CNAM";
import { DELE } from "./TES4/DELE";
import { HEDR } from "./TES4/HEDR";
import { MAST } from "./TES4/MAST";
import { OFST } from "./TES4/OFST";
import { SNAM } from "./TES4/SNAM";
import pako from "pako";
import { uint32, formid, ubyte } from "../types";

export default class TES4 {
    subRecords: (HEDR|OFST|DELE|CNAM|SNAM|MAST)[] = [];
    public readonly type: string;
    public readonly dataSize: uint32;
    public readonly flags: uint32;
    public readonly formId: formid;
    public readonly versionControl: uint32;
    
    constructor(buf: ESMBuffer) {
        this.type = buf.readString(4);
        this.dataSize = buf.readUInt();
        this.flags = buf.readUInt();
        this.formId = buf.readUInt();
        this.versionControl = buf.readUInt();
        if (this.dataSize >= 4) {
            let tmpBuf: ESMBuffer;
            if ((this.flags & 0x00040000) === 0x00040000) {
                const decompressedSize = buf.readUInt();
                const data = [...pako.inflate(buf.readUByteArray(this.dataSize - 4))];
                console.assert(decompressedSize === data.length);
                tmpBuf = new ESMBuffer(new Uint8Array(data).buffer);
                this.dataSize = decompressedSize;
            } else {
                tmpBuf = buf;
            }
            let offset = 0;
            while (offset < this.dataSize) {
                let subRecord: string | undefined = tmpBuf.readString(4);
                let subRecordObj;
                switch(subRecord) {
                    case 'HEDR':
                        subRecordObj = new HEDR(tmpBuf);
                        break;
                    case 'OFST':
                        subRecordObj = new OFST(tmpBuf);
                        break;
                    case 'DELE':
                        subRecordObj = new DELE(tmpBuf);
                        break;
                    case 'CNAM':
                        subRecordObj = new CNAM(tmpBuf);
                        break;
                    case 'SNAM':
                        subRecordObj = new SNAM(tmpBuf);
                        break;
                    case 'MAST':
                        subRecordObj = new MAST(tmpBuf);
                        break;
                    default:
                        console.log(this);
                        throw new Error(`Missing subrecord for TES4 header, ${subRecord}`);
                }
                offset += subRecordObj.totalLength;
                this.subRecords.push(subRecordObj);
            }
        }
    }
}
