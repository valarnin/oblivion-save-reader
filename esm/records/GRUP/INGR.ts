import { float, uint32 } from "../../types";
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
ICON
SCRI
DATA
ENIT
EFID
EFIT
SCIT
FULL
*/

export class DATA extends Subrecord {
    public readonly weight: float;
    constructor(buf: ESMBuffer) {
        super('DATA', buf, false);
        this.weight = buf.readFloat();
    }
}

export class ENIT extends Subrecord {
    public readonly value: uint32;
    public readonly flags: uint32;
    constructor(buf: ESMBuffer) {
        super('ENIT', buf, false);
        this.value = buf.readUInt();
        this.flags = buf.readUInt();
    }
}

export class INGR extends Record {
    constructor(buf: ESMBuffer) {
        super('INGR', buf);
        if (this.tmpBuf) {
            let offset = 0;
            while (offset < this.dataSize) {
                let subRecord: string | undefined = this.tmpBuf.readString(4);
                let subRecordObj: Subrecord | [number, string];
                switch(subRecord) {
                    case 'DATA':
                        subRecordObj = new DATA(this.tmpBuf);
                        break;
                    case 'ENIT':
                        subRecordObj = new ENIT(this.tmpBuf);
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
