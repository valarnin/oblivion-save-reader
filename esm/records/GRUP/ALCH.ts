import { float, int32, ubyte } from "../../types";
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

export class ENIT extends Subrecord {
    public readonly itemValue: int32;
    public readonly flags: ubyte;
    public readonly unknown: ubyte[];
    constructor(buf: ESMBuffer) {
        super('ENIT', buf, false);
        this.itemValue = buf.readUInt();
        this.flags = buf.readUByte();
        this.unknown = buf.readUByteArray(3);
    }
}

export class DATA extends Subrecord {
    public readonly itemWeight: float;
    constructor(buf: ESMBuffer) {
        super('DATA', buf, false);
        this.itemWeight = buf.readFloat();
    }
}

export class ALCH extends Record {
    constructor(buf: ESMBuffer) {
        super('ALCH', buf);
        if (this.tmpBuf) {
            let offset = 0;
            while (offset < this.dataSize) {
                let subRecord: string | undefined = this.tmpBuf.readString(4);
                let subRecordObj: Subrecord | [number, string];
                switch(subRecord) {
                    case 'ENIT':
                        subRecordObj = new ENIT(this.tmpBuf);
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
