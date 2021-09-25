import { float, formid, ubyte, uint32, ushort } from "../../types";
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
ACBS
SNAM
INAM
RNAM
SPLO
SCRI
CNTO
AIDT
PKID
CNAM
DATA
HNAM
LNAM
ENAM
HCLR
ZNAM
FGGS
FGGA
FGTS
FNAM
*/

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

export class INAM extends Subrecord {
    public readonly deathItem: formid;
    constructor(buf: ESMBuffer) {
        super('INAM', buf, false);
        this.deathItem = buf.readUInt();
    }
}

export class RNAM extends Subrecord {
    public readonly race: formid;
    constructor(buf: ESMBuffer) {
        super('RNAM', buf, false);
        this.race = buf.readUInt();
    }
}

export class CNAM extends Subrecord {
    public readonly class: formid;
    constructor(buf: ESMBuffer) {
        super('CNAM', buf, false);
        this.class = buf.readUInt();
    }
}

export class DATA extends Subrecord {
    public readonly armorer: ubyte;
    public readonly athletics: ubyte;
    public readonly blade: ubyte;
    public readonly block: ubyte;
    public readonly blunt: ubyte;
    public readonly handToHand: ubyte;
    public readonly heavyArmor: ubyte;
    public readonly alchemy: ubyte;
    public readonly alteration: ubyte;
    public readonly conjuration: ubyte;
    public readonly destruction: ubyte;
    public readonly illusion: ubyte;
    public readonly mysticism: ubyte;
    public readonly restoration: ubyte;
    public readonly acrobatics: ubyte;
    public readonly lightArmor: ubyte;
    public readonly marksman: ubyte;
    public readonly mercantile: ubyte;
    public readonly security: ubyte;
    public readonly sneak: ubyte;
    public readonly speechcraft: ubyte;
    public readonly health: uint32;
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
        this.armorer = buf.readUByte();
        this.athletics = buf.readUByte();
        this.blade = buf.readUByte();
        this.block = buf.readUByte();
        this.blunt = buf.readUByte();
        this.handToHand = buf.readUByte();
        this.heavyArmor = buf.readUByte();
        this.alchemy = buf.readUByte();
        this.alteration = buf.readUByte();
        this.conjuration = buf.readUByte();
        this.destruction = buf.readUByte();
        this.illusion = buf.readUByte();
        this.mysticism = buf.readUByte();
        this.restoration = buf.readUByte();
        this.acrobatics = buf.readUByte();
        this.lightArmor = buf.readUByte();
        this.marksman = buf.readUByte();
        this.mercantile = buf.readUByte();
        this.security = buf.readUByte();
        this.sneak = buf.readUByte();
        this.speechcraft = buf.readUByte();
        this.health = buf.readUInt();
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

export class HNAM extends Subrecord {
    public readonly hair: formid;
    constructor(buf: ESMBuffer) {
        super('HNAM', buf, false);
        this.hair = buf.readUInt();
    }
}

export class LNAM extends Subrecord {
    public readonly hairLength: float;
    constructor(buf: ESMBuffer) {
        super('LNAM', buf, false);
        this.hairLength = buf.readFloat();
    }
}

export class ENAM extends Subrecord {
    public readonly eyes: formid;
    constructor(buf: ESMBuffer) {
        super('ENAM', buf, false);
        this.eyes = buf.readUInt();
    }
}

export class ZNAM extends Subrecord {
    public readonly combatStyle: formid;
    constructor(buf: ESMBuffer) {
        super('ZNAM', buf, false);
        this.combatStyle = buf.readUInt();
    }
}

export class FNAM extends Subrecord {
    public readonly faceRace: ushort;
    constructor(buf: ESMBuffer) {
        super('FNAM', buf, false);
        this.faceRace = buf.readUShort();
    }
}

export class NPC_ extends Record {
    constructor(buf: ESMBuffer) {
        super('NPC_', buf);
        if (this.tmpBuf) {
            let offset = 0;
            while (offset < this.dataSize) {
                let subRecord: string | undefined = this.tmpBuf.readString(4);
                let subRecordObj: Subrecord | [number, string];
                switch(subRecord) {
                    case 'SNAM':
                        subRecordObj = new SNAM(this.tmpBuf);
                        break;
                    case 'INAM':
                        subRecordObj = new INAM(this.tmpBuf);
                        break;
                    case 'RNAM':
                        subRecordObj = new RNAM(this.tmpBuf);
                        break;
                    case 'CNAM':
                        subRecordObj = new CNAM(this.tmpBuf);
                        break;
                    case 'DATA':
                        subRecordObj = new DATA(this.tmpBuf);
                        break;
                    case 'HNAM':
                        subRecordObj = new HNAM(this.tmpBuf);
                        break;
                    case 'LNAM':
                        subRecordObj = new LNAM(this.tmpBuf);
                        break;
                    case 'ENAM':
                        subRecordObj = new ENAM(this.tmpBuf);
                        break;
                    case 'ZNAM':
                        subRecordObj = new ZNAM(this.tmpBuf);
                        break;
                    case 'FNAM':
                        subRecordObj = new FNAM(this.tmpBuf);
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
