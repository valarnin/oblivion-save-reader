import { float, uint32 } from "../../types";
import { ESMBuffer } from "../../util";
import CommonSubrecordFactory from "./common/CommonSubrecordFactory";
import { Subrecord } from "./common/Subrecord";
import { Record } from "./Record";

/*
Expected fields:
EDID
INDX
DESC
ICON
DATA
ANAM
JNAM
ENAM
MNAM
*/

// UESP is wrong, notes length is 14 when it's 0x14 = 20 bytes
export class DATA extends Subrecord {
    public readonly actions: uint32;
    public readonly attribute: uint32;
    public readonly specialization: uint32;
    public readonly useValue1: float;
    public readonly useValue2: float;
    constructor(buf: ESMBuffer) {
        super('DATA', buf, false);
        this.actions = buf.readUInt();
        this.attribute = buf.readUInt();
        this.specialization = buf.readUInt();
        this.useValue1 = buf.readFloat();
        this.useValue2 = buf.readFloat();
    }
}

export class ANAM extends Subrecord {
    public readonly apprenticeText: string;
    constructor(buf: ESMBuffer) {
        super('ANAM', buf, true);
        this.apprenticeText = buf.readszString();
    }
}

export class JNAM extends Subrecord {
    public readonly journeymanText: string;
    constructor(buf: ESMBuffer) {
        super('JNAM', buf, true);
        this.journeymanText = buf.readszString();
    }
}

export class ENAM extends Subrecord {
    public readonly expertText: string;
    constructor(buf: ESMBuffer) {
        super('ENAM', buf, true);
        this.expertText = buf.readszString();
    }
}

export class MNAM extends Subrecord {
    public readonly masterText: string;
    constructor(buf: ESMBuffer) {
        super('MNAM', buf, true);
        this.masterText = buf.readszString();
    }
}

export class INDX extends Subrecord {
    public readonly skillIndex: uint32;
    constructor(buf: ESMBuffer) {
        super('INDX', buf, false);
        this.skillIndex = buf.readUInt();
    }
}

export class SKIL extends Record {
    constructor(buf: ESMBuffer) {
        super('SKIL', buf);
        if (this.tmpBuf) {
            let offset = 0;
            while (offset < this.dataSize) {
                let subRecord: string | undefined = this.tmpBuf.readString(4);
                let subRecordObj: Subrecord | [number, string];
                switch(subRecord) {
                    case 'DATA':
                        subRecordObj = new DATA(this.tmpBuf);
                        break;
                    case 'ANAM':
                        subRecordObj = new ANAM(this.tmpBuf);
                        break;
                    case 'JNAM':
                        subRecordObj = new JNAM(this.tmpBuf);
                        break;
                    case 'ENAM':
                        subRecordObj = new ENAM(this.tmpBuf);
                        break;
                    case 'MNAM':
                        subRecordObj = new MNAM(this.tmpBuf);
                        break;
                    case 'INDX':
                        subRecordObj = new INDX(this.tmpBuf);
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
