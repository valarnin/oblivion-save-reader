import pako from "pako";
import { uint32, formid, ubyte } from "../../types";
import { ESMBuffer } from "../../util";
import { Subrecord } from "./common/Subrecord";


export class Record {
    public readonly totalSize: uint32;
    public readonly dataSize: uint32;
    public readonly flags: uint32;
    public readonly formId: formid;
    public readonly versionControl: uint32;
    public tmpBuf?: ESMBuffer;
    public subRecords: Subrecord[] = [];
    public offset: number;

    constructor(public readonly type: string, buf: ESMBuffer) {
        this.offset = buf.offset - 4;
        this.dataSize = buf.readUInt();
        this.totalSize = this.dataSize + 20;
        this.flags = buf.readUInt();
        this.formId = buf.readUInt();
        this.versionControl = buf.readUInt();
        if ((this.flags & 0x00040000) === 0x00040000) {
            const decompressedSize = buf.readUInt();
            const data = [...pako.inflate(buf.readUByteArray(this.dataSize - 4))];
            console.assert(decompressedSize === data.length);
            this.tmpBuf = new ESMBuffer(new Uint8Array(data).buffer);
            this.dataSize = decompressedSize;
        } else {
            this.tmpBuf = buf;
        }
    }
}
