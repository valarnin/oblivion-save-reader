import { float, uint32, ushort } from "../../types";
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
ENAM
ANAM
DATA
*/

export class DATA extends Subrecord {
    public readonly speed: float;
    public readonly flags: uint32;
    public readonly value: uint32;
    public readonly weight: float;
    public readonly damage: ushort;
    constructor(buf: ESMBuffer) {
        super('DATA', buf, false);
        this.speed = buf.readFloat();
        this.flags = buf.readUInt();
        this.value = buf.readUInt();
        this.weight = buf.readFloat();
        this.damage = buf.readUShort();
    }
}

export class AMMO extends Record {
    constructor(buf: ESMBuffer) {
        super('AMMO', buf);
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
