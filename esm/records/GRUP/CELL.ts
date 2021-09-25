import { ubyte } from "../../types";
import { ESMBuffer } from "../../util";
import CommonSubrecordFactory from "./common/CommonSubrecordFactory";
import { Subrecord } from "./common/Subrecord";
import { Record } from "./Record";

/*
Expected fields:
EDID
FULL
DATA
XCLL
XCMT
XOWN
XGLB
XRNK
XCCM
XCWT
XCLW
XCLR
XCLC
*/

export class DATA extends Subrecord {
    public readonly flags: ubyte;
    constructor(buf: ESMBuffer) {
        super('DATA', buf, false);
        this.flags = buf.readUByte();
    }
}

export class CELL extends Record {
    constructor(buf: ESMBuffer) {
        super('CELL', buf);
        if (this.tmpBuf) {
            let offset = 0;
            while (offset < this.dataSize) {
                let subRecord: string | undefined = this.tmpBuf.readString(4);
                let subRecordObj: Subrecord | [number, string];
                switch(subRecord) {
                    case 'DATA':
                        subRecordObj = new DATA(this.tmpBuf);
                        break;
                    default:
                        subRecordObj = CommonSubrecordFactory(subRecord, this.tmpBuf);
                        break;
                }
                offset += subRecordObj.totalLength;
                this.subRecords.push(subRecordObj);
            }
            delete this.tmpBuf;
        }
    }
}
