import { float, formid, ubyte } from "../../types";
import { ESMBuffer } from "../../util";
import CommonSubrecordFactory from "./common/CommonSubrecordFactory";
import { Subrecord } from "./common/Subrecord";
import { Record } from "./Record";

/*
Expected fields:
EDID
FULL
MODL
MODB
MODT
DATA
SNAM
QNAM
SCRI
CNTO
*/

export class DATA extends Subrecord {
    public readonly flags: ubyte;
    public readonly weight: float;
    constructor(buf: ESMBuffer) {
        super('DATA', buf, false);
        this.flags = buf.readUByte();
        this.weight = buf.readFloat();
    }
}

export class SNAM extends Subrecord {
    public readonly openSound: formid;
    constructor(buf: ESMBuffer) {
        super('SNAM', buf, false);
        this.openSound = buf.readUInt();
    }
}

export class CONT extends Record {
    constructor(buf: ESMBuffer) {
        super('CONT', buf);
        if (this.tmpBuf) {
            let offset = 0;
            while (offset < this.dataSize) {
                let subRecord: string | undefined = this.tmpBuf.readString(4);
                let subRecordObj: Subrecord | [number, string];
                switch(subRecord) {
                    case 'DATA':
                        subRecordObj = new DATA(this.tmpBuf);
                        break;
                    case 'SNAM':
                        subRecordObj = new SNAM(this.tmpBuf);
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
