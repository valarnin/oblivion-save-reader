import { ushort, int32, float } from "../../types";
import { ESMBuffer } from "../../util";
import CommonSubrecordFactory from "./common/CommonSubrecordFactory";
import { Subrecord } from "./common/Subrecord";
import { Record } from "./Record";

/*
Expected fields:
EDID
FULL
SCRI
BMDT
MODL
MOD2
MOD3
MOD4
MODB
MO2B
MO3B
MO4B
MODT
MO2T
MO3T
MO4T
ICON
ICO2
ANAM
ENAM
DATA
*/

export class DATA extends Subrecord {
    public readonly armor: ushort;
    public readonly value: int32;
    public readonly health: int32;
    public readonly weight: float;
    constructor(buf: ESMBuffer) {
        super('DATA', buf, false);
        this.armor = buf.readUShort();
        this.value = buf.readInt();
        this.health = buf.readInt();
        this.weight = buf.readFloat();
    }
}

export class ARMO extends Record {
    constructor(buf: ESMBuffer) {
        super('ARMO', buf);
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
