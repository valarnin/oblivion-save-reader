import { uint32 } from "../../types";
import { ESMBuffer } from "../../util";
import CommonSubrecordFactory from "./common/CommonSubrecordFactory";
import { Subrecord } from "./common/Subrecord";
import { Record } from "./Record";

/*
Expected fields:
DATA
VNML
VHGT
VCLR
BTXT
ATXT
VTXT
VTEX
*/

export class DATA extends Subrecord {
    public readonly flags: uint32;
    constructor(buf: ESMBuffer) {
        super('DATA', buf, false);
        this.flags = buf.readUInt();
    }
}

export class LAND extends Record {
    constructor(buf: ESMBuffer) {
        super('LAND', buf);
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
