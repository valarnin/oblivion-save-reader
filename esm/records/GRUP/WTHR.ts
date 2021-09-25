import { formid, ubyte, uint32 } from "../../types";
import { ESMBuffer } from "../../util";
import CommonSubrecordFactory from "./common/CommonSubrecordFactory";
import { Subrecord } from "./common/Subrecord";
import { Record } from "./Record";

/*
EDID
CNAM
DNAM
NAM0
FNAM
HNAM
DATA
SNAM
*/

export class CNAM extends Subrecord {
    public readonly lowerCloudLayerFile: string;
    constructor(buf: ESMBuffer) {
        super('CNAM', buf, true);
        this.lowerCloudLayerFile = buf.readszString();
    }
}

export class DNAM extends Subrecord {
    public readonly upperCloudLayerFile: string;
    constructor(buf: ESMBuffer) {
        super('DNAM', buf, true);
        this.upperCloudLayerFile = buf.readszString();
    }
}

// 6C 9D 9D 00 6C 9D 9D 00 6C 9D 9D 00 00 03 0D 00 DF B5 75 00 E2 C7 72 00 E7 AA 6D 00 04 10 1C 00 FF CA AA 00 FE FA C0 00 F1 D9 85 00 DB 4E DE 00 33 42 68 00 5E 71 97 00 3E 3E 6C 00 22 32 5E 00 FF A2 55 00 FF F1 DF 00 F7 62 09 00 4B 5E 89 00 68 41 37 00 FF B7 55 00 FF 6B 60 00 00 00 00 00 67 87 A7 00 FF FF FF 00 FF FF FF 00 FF FF FF 00 F8 F5 C9 00 97 DD CD 00 EF AB 61 00 05 10 1F 00 F3 A0 81 00 8C FD E3 00 EE 71 46 00 03 0F 1D 00 FF E1 C4 00 FE FA C0 00 FF A4 77 00 06 0F 1A 00
export class NAM0 extends Subrecord {
        constructor(buf: ESMBuffer) {
        super('NAM0', buf, false);
        buf.advance(this.subrecordDataLength);
    }
}

// 00 00 80 45 00 04 26 48 00 00 80 45 00 E8 FD 47
export class FNAM extends Subrecord {
        constructor(buf: ESMBuffer) {
        super('FNAM', buf, false);
        buf.advance(this.subrecordDataLength);
    }
}

// 33 33 33 3F 00 00 80 40 00 00 00 40 00 00 80 3F 9A 99 99 3F CD CC 8C 3F 00 00 E0 3F 9A 99 99 3E 00 00 80 3F 00 00 00 00 00 00 00 00 66 66 A6 3F 66 66 A6 3F 9A 99 99 3F
export class HNAM extends Subrecord {
        constructor(buf: ESMBuffer) {
        super('HNAM', buf, false);
        buf.advance(this.subrecordDataLength);
    }
}

// 19 2A 13 00 FF FF 00 00 00 00 FF 01 FF FF FF
export class DATA extends Subrecord {
        constructor(buf: ESMBuffer) {
        super('DATA', buf, false);
        buf.advance(this.subrecordDataLength);
    }
}

export class SNAM extends Subrecord {
    public readonly soundFormid: formid;
    public readonly soundType: uint32;
    constructor(buf: ESMBuffer) {
        super('SNAM', buf, false);
        this.soundFormid = buf.readUInt();
        this.soundType = buf.readUInt();
    }
}

export class WTHR extends Record {
    constructor(buf: ESMBuffer) {
        super('WTHR', buf);
        if (this.tmpBuf) {
            let offset = 0;
            while (offset < this.dataSize) {
                let subRecord: string | undefined = this.tmpBuf.readString(4);
                let subRecordObj: Subrecord | [number, string];
                switch(subRecord) {
                    case 'CNAM':
                        subRecordObj = new CNAM(this.tmpBuf);
                        break;
                    case 'DNAM':
                        subRecordObj = new DNAM(this.tmpBuf);
                        break;
                    case 'NAM0':
                        subRecordObj = new NAM0(this.tmpBuf);
                        break;
                    case 'FNAM':
                        subRecordObj = new FNAM(this.tmpBuf);
                        break;
                    case 'HNAM':
                        subRecordObj = new HNAM(this.tmpBuf);
                        break;
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
