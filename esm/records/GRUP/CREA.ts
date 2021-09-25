import { byte, float, formid, ubyte, ushort } from "../../types";
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
NIFZ
ACBS
SNAM
INAM
RNAM
SPLO
SCRI
CNTO
AIDT
PKID
DATA
ZNAM
CSCR
CSDT
CSDI
CSDC
BNAM
TNAM
WNAM
NAM0
NAM1
KFFZ
*/

export class NAM0 extends Subrecord {
    public readonly bloodSprayFilename: string;
    constructor(buf: ESMBuffer) {
        super('NAM0', buf, true);
        this.bloodSprayFilename = buf.readszString();
    }
}

export class NAM1 extends Subrecord {
    public readonly bloodDecalFilename: string;
    constructor(buf: ESMBuffer) {
        super('NAM1', buf, true);
        this.bloodDecalFilename = buf.readszString();
    }
}

export class RNAM extends Subrecord {
    public readonly attackReach: ubyte;
    constructor(buf: ESMBuffer) {
        super('RNAM', buf, false);
        this.attackReach = buf.readUByte();
    }
}

export class INAM extends Subrecord {
    public readonly deathItem: formid;
    constructor(buf: ESMBuffer) {
        super('INAM', buf, false);
        this.deathItem = buf.readUInt();
    }
}

export class DATA extends Subrecord {
    public readonly unknown1: byte;
    public readonly combat: ubyte;
    public readonly magic: ubyte;
    public readonly stealth: ubyte;
    public readonly soul: ushort;
    public readonly health: ushort;
    public readonly unknown2: ubyte[];
    public readonly damage: ushort;
    public readonly strength: ubyte;
    public readonly intelligence: ubyte;
    public readonly willpower: ubyte;
    public readonly agility: ubyte;
    public readonly speed: ubyte;
    public readonly endurance: ubyte;
    public readonly personality: ubyte;
    public readonly luck: ubyte;
    constructor(buf: ESMBuffer) {
        super('DATA', buf, false);
        this.unknown1 = buf.readByte();
        this.combat = buf.readUByte();
        this.magic = buf.readUByte();
        this.stealth = buf.readUByte();
        this.soul = buf.readUShort();
        this.health = buf.readUShort();
        this.unknown2 = buf.readUByteArray(2);
        this.damage = buf.readUShort();
        this.strength = buf.readUByte();
        this.intelligence = buf.readUByte();
        this.willpower = buf.readUByte();
        this.agility = buf.readUByte();
        this.speed = buf.readUByte();
        this.endurance = buf.readUByte();
        this.personality = buf.readUByte();
        this.luck = buf.readUByte();
    }
}

export class SNAM extends Subrecord {
    public readonly id: formid;
    public readonly rank: ubyte;
    public readonly flag: ubyte[];
    constructor(buf: ESMBuffer) {
        super('SNAM', buf, false);
        this.id = buf.readUInt();
        this.rank = buf.readUByte();
        this.flag = buf.readUByteArray(3);
    }
}

export class BNAM extends Subrecord {
    public readonly baseScale: float;
    constructor(buf: ESMBuffer) {
        super('BNAM', buf, false);
        this.baseScale = buf.readFloat();
    }
}

export class TNAM extends Subrecord {
    public readonly turningSpeed: float;
    constructor(buf: ESMBuffer) {
        super('TNAM', buf, false);
        this.turningSpeed = buf.readFloat();
    }
}

export class WNAM extends Subrecord {
    public readonly footWeight: float;
    constructor(buf: ESMBuffer) {
        super('WNAM', buf, false);
        this.footWeight = buf.readFloat();
    }
}

export class CREA extends Record {
    constructor(buf: ESMBuffer) {
        super('CREA', buf);
        if (this.tmpBuf) {
            let offset = 0;
            while (offset < this.dataSize) {
                let subRecord: string | undefined = this.tmpBuf.readString(4);
                let subRecordObj: Subrecord | [number, string];
                switch(subRecord) {
                    case 'DATA':
                        subRecordObj = new DATA(this.tmpBuf);
                        break;
                    case 'INAM':
                        subRecordObj = new INAM(this.tmpBuf);
                        break;
                    case 'NAM0':
                        subRecordObj = new NAM0(this.tmpBuf);
                        break;
                    case 'NAM1':
                        subRecordObj = new NAM1(this.tmpBuf);
                        break;
                    case 'RNAM':
                        subRecordObj = new RNAM(this.tmpBuf);
                        break;
                    case 'BNAM':
                        subRecordObj = new BNAM(this.tmpBuf);
                        break;
                    case 'SNAM':
                        subRecordObj = new SNAM(this.tmpBuf);
                        break;
                    case 'TNAM':
                        subRecordObj = new TNAM(this.tmpBuf);
                        break;
                    case 'WNAM':
                        subRecordObj = new WNAM(this.tmpBuf);
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
