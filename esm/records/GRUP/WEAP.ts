import { float, formid, ubyte, uint32, ushort } from "../../types";
import { ESMBuffer } from "../../util";
import CommonSubrecordFactory from "./common/CommonSubrecordFactory";
import { Subrecord } from "./common/Subrecord";
import { Record } from "./Record";

/*
Expected fields:
EDID
FULL
SCRI
MODL
MODB
MODT
ICON
ANAM
ENAM
DATA
*/

export class ANAM extends Subrecord {
    public readonly enchantmentPoints: ushort;
    constructor(buf: ESMBuffer) {
        super('ANAM', buf, false);
        this.enchantmentPoints = buf.readUShort();
    }
}

export class ENAM extends Subrecord {
    public readonly enchantmentFormid: formid;
    constructor(buf: ESMBuffer) {
        super('ENAM', buf, false);
        this.enchantmentFormid = buf.readUInt();
    }
}

export class DATA extends Subrecord {
    public readonly type: uint32;
    public readonly speed: float;
    public readonly reach: float;
    public readonly flags: uint32;
    public readonly value: uint32;
    public readonly health: uint32;
    public readonly weight: float;
    public readonly damage: ushort;
    constructor(buf: ESMBuffer) {
        super('DATA', buf, false);
        this.type = buf.readUInt();
        this.speed = buf.readFloat();
        this.reach = buf.readFloat();
        this.flags = buf.readUInt();
        this.value = buf.readUInt();
        this.health = buf.readUInt();
        this.weight = buf.readFloat();
        this.damage = buf.readUShort();
    }
}

export class WEAP extends Record {
    constructor(buf: ESMBuffer) {
        super('WEAP', buf);
        if (this.tmpBuf) {
            let offset = 0;
            while (offset < this.dataSize) {
                let subRecord: string | undefined = this.tmpBuf.readString(4);
                let subRecordObj: Subrecord | [number, string];
                switch(subRecord) {
                    case 'ANAM':
                        subRecordObj = new ANAM(this.tmpBuf);
                        break;
                    case 'ENAM':
                        subRecordObj = new ENAM(this.tmpBuf);
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
