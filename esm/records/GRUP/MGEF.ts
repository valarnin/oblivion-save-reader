import { float, formid, uint32 } from "../../types";
import { ESMBuffer } from "../../util";
import CommonSubrecordFactory from "./common/CommonSubrecordFactory";
import { Subrecord } from "./common/Subrecord";
import { Record } from "./Record";

/*
Expected fields:
EDID
FULL
DESC
ICON
MODL
MODB
DATA
ESCE
*/

export class DATA extends Subrecord {
    public readonly flags: uint32;
    public readonly baseCost: float;
    public readonly unknown1: uint32;
    public readonly school: uint32;
    public readonly resist: uint32;
    public readonly unknown2: uint32;
    public readonly light: formid;
    public readonly projectileSpeed: float;
    public readonly effectShader: formid;
    public readonly enchantEffect?: formid;
    public readonly castingSound?: formid;
    public readonly boltSound?: formid;
    public readonly hitSound?: formid;
    public readonly areaSound?: formid;
    public readonly constantEffectEchantmentFactor?: float;
    public readonly constantEffectBarterFactor?: float;
    constructor(buf: ESMBuffer) {
        super('DATA', buf, false);
        this.flags = buf.readUInt();
        this.baseCost = buf.readFloat();
        this.unknown1 = buf.readUInt();
        this.school = buf.readUInt();
        this.resist = buf.readUInt();
        this.unknown2 = buf.readUInt();
        this.light = buf.readUInt();
        this.projectileSpeed = buf.readFloat();
        this.effectShader = buf.readUInt();
        if (this.subrecordDataLength > 36) {
            this.enchantEffect = buf.readUInt();
            this.castingSound = buf.readUInt();
            this.boltSound = buf.readUInt();
            this.hitSound = buf.readUInt();
            this.areaSound = buf.readUInt();
            this.constantEffectEchantmentFactor = buf.readFloat();
            this.constantEffectBarterFactor = buf.readFloat();
        }
    }
}

export class MGEF extends Record {
    constructor(buf: ESMBuffer) {
        super('MGEF', buf);
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
