import Record from "./record";
import { bufToArray, bufTobString, bufToByte, bufToInt, bufToShort } from "./util";

export class RecordCell {
    cellCreated: boolean;
    unknown2: boolean;
    unknown26: number[] = [];
    time?: number;
    flags?: number;

    seenUnknown: number[] = [];
    dataNum?: number;
    dataFlags?: number;
    data: number[][] = [];

    fullName?: string;

    owner?: number;

    pathgridDataLen?: number;
    pathgridData: number[] = [];

    constructor(record: Record, buf: ArrayBuffer, offset: number) {
        let startOffset = offset;
        this.cellCreated = (record.flags & 0x1) === 0x1;
        this.unknown2 = (record.flags & 0x4) === 0x4;

        if (record.flags & 0x4000000) {
            this.unknown26 = bufToArray(buf.slice(offset, offset + 4));
            offset += 4;
        }

        if (record.flags & 0x8000000) {
            this.time = bufToInt(buf.slice(offset, offset + 4));
            offset += 4;
        }

        if (record.flags & 0x8) {
            this.flags = bufToByte(buf.slice(offset, offset + 1));
            offset += 1;
        }

        if (record.flags & 0x10000000) {
            // Due to the format of this not being well understood, this part is complex.
            // Basically just try from the biggest format to smallest, and if the size exceeds the record length,
            // retry with the next smallest
            let seenOffset = offset;
            for (let seenType = 4; seenType >= 0; --seenType) {
                offset = seenOffset;
                if (seenType > 0) {
                    this.seenUnknown = bufToArray(buf.slice(offset, offset + 32));
                    offset += 32;
                }
                if (seenType > 1) {
                    this.dataNum = bufToShort(buf.slice(offset, offset + 2));
                    offset += 2;
                }
                if (seenType > 2) {
                    this.dataFlags = bufToShort(buf.slice(offset, offset + 2));
                    offset += 2;
                }
                if (seenType > 3) {
                    for (let i = 0; i < (this.dataNum ?? 0) - 1; ++i) {
                        this.data.push(bufToArray(buf.slice(offset, offset + 34)));
                        offset += 34;
                        if (offset > startOffset + record.dataSize) break;
                    }
                }
                if (record.flags & 0x10) {
                    this.fullName = bufTobString(buf);
                    offset += bufToByte(buf.slice(offset, offset + 1)) + 1;
                }
        
                if (record.flags & 0x20) {
                    this.owner = bufToInt(buf.slice(offset, offset + 4));
                    offset += 4;
                }
        
                if (record.flags & 0x1000000) {
                    this.pathgridDataLen = bufToShort(buf.slice(offset, offset + 2));
                    offset += 2;
                    for (let i = 0; i < this.pathgridDataLen; ++i) {
                        this.pathgridData.push(bufToShort(buf.slice(offset, offset + 2)));
                        offset += 2;
                    }
                }
                // Now check to make sure we consumed all data, reset if not
                if ((offset - startOffset) !== record.dataSize) {
                    if (seenType === 0) {
                        debugger;
                    }
                    delete this.dataNum;
                    delete this.dataFlags;
                    delete this.fullName;
                    delete this.owner;
                    delete this.pathgridDataLen;
                    this.seenUnknown = [];
                    this.data = [];
                    this.pathgridData = [];
                } else {
                    break;
                }
            }
        } else {
            if (record.flags & 0x10) {
                this.fullName = bufTobString(buf);
                offset += bufToByte(buf.slice(offset, offset + 1)) + 1;
            }
    
            if (record.flags & 0x20) {
                this.owner = bufToInt(buf.slice(offset, offset + 4));
                offset += 4;
            }
    
            if (record.flags & 0x1000000) {
                this.pathgridDataLen = bufToShort(buf.slice(offset, offset + 2));
                offset += 2;
                for (let i = 0; i < this.pathgridDataLen; ++i) {
                    this.pathgridData.push(bufToShort(buf.slice(offset, offset + 2)));
                    offset += 2;
                }
            }
        }
    }
}