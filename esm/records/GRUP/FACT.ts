import { float, formid, int32, ubyte } from "../../types";
import { ESMBuffer } from "../../util";
import CommonSubrecordFactory from "./common/CommonSubrecordFactory";
import { Subrecord } from "./common/Subrecord";
import { Record } from "./Record";

/*
Expected fields:
EDID
FULL
XNAM
DATA
CNAM
RNAM
MNAM
FNAM
INAM
*/

export class XNAM extends Subrecord {
    public readonly faction: formid;
    public readonly mod: int32;
    constructor(buf: ESMBuffer) {
        super('XNAM', buf, false);
        this.faction = buf.readUInt();
        this.mod = buf.readInt();
    }
}

export class DATA extends Subrecord {
    public readonly flags: ubyte;
    constructor(buf: ESMBuffer) {
        super('DATA', buf, false);
        this.flags = buf.readUByte();
    }
}

export class CNAM extends Subrecord {
    public readonly crimeGoldMultiplier: float;
    constructor(buf: ESMBuffer) {
        super('CNAM', buf, false);
        this.crimeGoldMultiplier = buf.readFloat();
    }
}

export class RNAM extends Subrecord {
    public readonly rank: int32;
    constructor(buf: ESMBuffer) {
        super('RNAM', buf, false);
        this.rank = buf.readInt();
    }
}

export class MNAM extends Subrecord {
    public readonly maleName: string;
    constructor(buf: ESMBuffer) {
        super('MNAM', buf, true);
        this.maleName = buf.readszString();
    }
}

export class FNAM extends Subrecord {
    public readonly femaleName: string;
    constructor(buf: ESMBuffer) {
        super('FNAM', buf, true);
        this.femaleName = buf.readszString();
    }
}

export class INAM extends Subrecord {
    public readonly insignia: string;
    constructor(buf: ESMBuffer) {
        super('INAM', buf, true);
        this.insignia = buf.readszString();
    }
}

export class FACT extends Record {
    constructor(buf: ESMBuffer) {
        super('FACT', buf);
        if (this.tmpBuf) {
            let offset = 0;
            while (offset < this.dataSize) {
                let subRecord: string | undefined = this.tmpBuf.readString(4);
                let subRecordObj: Subrecord | [number, string];
                switch(subRecord) {
                    case 'XNAM':
                        subRecordObj = new XNAM(this.tmpBuf);
                        break;
                    case 'DATA':
                        subRecordObj = new DATA(this.tmpBuf);
                        break;
                    case 'CNAM':
                        subRecordObj = new CNAM(this.tmpBuf);
                        break;
                    case 'RNAM':
                        subRecordObj = new RNAM(this.tmpBuf);
                        break;
                    case 'MNAM':
                        subRecordObj = new MNAM(this.tmpBuf);
                        break;
                    case 'FNAM':
                        subRecordObj = new FNAM(this.tmpBuf);
                        break;
                    case 'INAM':
                        subRecordObj = new INAM(this.tmpBuf);
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
