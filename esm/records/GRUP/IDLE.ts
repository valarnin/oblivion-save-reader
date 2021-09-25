import { ubyte } from "../../types";
import { ESMBuffer } from "../../util";
import CommonSubrecordFactory from "./common/CommonSubrecordFactory";
import { Subrecord } from "./common/Subrecord";
import { Record } from "./Record";

/*
Expected fields:
EDID
MODL
MODB
MODT
CTDA
ANAM
DATA
*/

export class ANAM extends Subrecord {
    public readonly enchantment: ubyte;
    constructor(buf: ESMBuffer) {
        super('ANAM', buf, false);
        this.enchantment = buf.readUByte();
    }
}

export class DATA extends Subrecord {
    constructor(buf: ESMBuffer) {
        super('DATA', buf, false);
        buf.advance(this.subrecordDataLength);
    }
}

export class IDLE extends Record {
    constructor(buf: ESMBuffer) {
        super('IDLE', buf);
        if (this.tmpBuf) {
            let offset = 0;
            while (offset < this.dataSize) {
                let subRecord: string | undefined = this.tmpBuf.readString(4);
                let subRecordObj: Subrecord | [number, string];
                switch(subRecord) {
                    case 'ANAM':
                        subRecordObj = new ANAM(this.tmpBuf);
                        break;
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
