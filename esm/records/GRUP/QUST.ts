import { short, ubyte } from "../../types";
import { ESMBuffer } from "../../util";
import CommonSubrecordFactory from "./common/CommonSubrecordFactory";
import { Subrecord } from "./common/Subrecord";
import { Record } from "./Record";

/*
Expected fields:
EDID
FULL
ICON
DATA
SCRI
CTDA
INDX
QSDT
CNAM
SCHR
SCDA
SCTX
SCRO
QSTA
CTDA
*/

export class DATA extends Subrecord {
    public readonly flags: ubyte;
    public readonly priority: ubyte;
    constructor(buf: ESMBuffer) {
        super('DATA', buf, false);
        this.flags = buf.readUByte();
        this.priority = buf.readUByte();
    }
}

export class INDX extends Subrecord {
    public readonly index: short;
    constructor(buf: ESMBuffer) {
        super('INDX', buf, false);
        this.index = buf.readShort();
    }
}

export class CNAM extends Subrecord {
    public readonly logEntry: string;
    constructor(buf: ESMBuffer) {
        super('CNAM', buf, true);
        this.logEntry = buf.readszString();
    }
}

export class QUST extends Record {
    constructor(buf: ESMBuffer) {
        super('QUST', buf);
        if (this.tmpBuf) {
            let offset = 0;
            while (offset < this.dataSize) {
                let subRecord: string | undefined = this.tmpBuf.readString(4);
                let subRecordObj: Subrecord | [number, string];
                switch(subRecord) {
                    case 'DATA':
                        subRecordObj = new DATA(this.tmpBuf);
                        break;
                    case 'CNAM':
                        subRecordObj = new CNAM(this.tmpBuf);
                        break;
                    case 'INDX':
                        subRecordObj = new INDX(this.tmpBuf);
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
