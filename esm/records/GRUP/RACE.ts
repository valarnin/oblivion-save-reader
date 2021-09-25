import { formid, ubyte } from "../../types";
import { ESMBuffer } from "../../util";
import CommonSubrecordFactory from "./common/CommonSubrecordFactory";
import { Subrecord } from "./common/Subrecord";
import { Record } from "./Record";

/*
Expected fields:
EDID
FULL
DESC
DATA
CNAM
DNAM
XNAM
VNAM
PNAM
UNAM
ATTR
NAM0
INDX
MODL
MODB
MODT?
ICON
NAM1
MNAM
FNAM
HNAM
ENAM
FGGS
FGGA
FGTS
SNAM
*/

export class DATA extends Subrecord {
    constructor(buf: ESMBuffer) {
        super('DATA', buf, false);
        buf.advance(this.subrecordDataLength);
    }
}

// 00
export class CNAM extends Subrecord {
    constructor(buf: ESMBuffer) {
        super('CNAM', buf, false);
        buf.advance(this.subrecordDataLength);
    }
}

// 91 A8 18 00 83 DA 01 00
export class DNAM extends Subrecord {
    constructor(buf: ESMBuffer) {
        super('DNAM', buf, false);
        buf.advance(this.subrecordDataLength);
    }
}

// E9 3F 02 00 05 00 00 00
export class XNAM extends Subrecord {
    constructor(buf: ESMBuffer) {
        super('XNAM', buf, false);
        buf.advance(this.subrecordDataLength);
    }
}

// 00 00 00 00 07 09 00 00
export class VNAM extends Subrecord {
    constructor(buf: ESMBuffer) {
        super('VNAM', buf, false);
        buf.advance(this.subrecordDataLength);
    }
}

// 00 00 A0 40
export class PNAM extends Subrecord {
    constructor(buf: ESMBuffer) {
        super('PNAM', buf, false);
        buf.advance(this.subrecordDataLength);
    }
}

// 00 00 40 40
export class UNAM extends Subrecord {
    constructor(buf: ESMBuffer) {
        super('UNAM', buf, false);
        buf.advance(this.subrecordDataLength);
    }
}

// 32 32 32 32 32 32 32 32 32 32 32 32 32 32 32 32
// Base attributes for male/female?
export class ATTR extends Subrecord {
    constructor(buf: ESMBuffer) {
        super('ATTR', buf, false);
        buf.advance(this.subrecordDataLength);
    }
}

// blank record
export class NAM0 extends Subrecord {
    constructor(buf: ESMBuffer) {
        super('NAM0', buf, false);
        buf.advance(this.subrecordDataLength);
    }
}

// 00 00 00 00
export class INDX extends Subrecord {
    constructor(buf: ESMBuffer) {
        super('INDX', buf, false);
        buf.advance(this.subrecordDataLength);
    }
}

// blank record
export class NAM1 extends Subrecord {
    constructor(buf: ESMBuffer) {
        super('NAM1', buf, false);
        buf.advance(this.subrecordDataLength);
    }
}

// blank record
export class MNAM extends Subrecord {
    constructor(buf: ESMBuffer) {
        super('MNAM', buf, false);
        buf.advance(this.subrecordDataLength);
    }
}

// blank record
export class FNAM extends Subrecord {
    constructor(buf: ESMBuffer) {
        super('FNAM', buf, false);
        buf.advance(this.subrecordDataLength);
    }
}

// blank record
export class HNAM extends Subrecord {
    constructor(buf: ESMBuffer) {
        super('HNAM', buf, false);
        buf.advance(this.subrecordDataLength);
    }
}

// blank record
export class ENAM extends Subrecord {
    constructor(buf: ESMBuffer) {
        super('ENAM', buf, false);
        buf.advance(this.subrecordDataLength);
    }
}

// 98 2B
export class SNAM extends Subrecord {
    constructor(buf: ESMBuffer) {
        super('SNAM', buf, false);
        buf.advance(this.subrecordDataLength);
    }
}

export class RACE extends Record {
    constructor(buf: ESMBuffer) {
        super('RACE', buf);
        if (this.tmpBuf) {
            let offset = 0;
            while (offset < this.dataSize) {
                let subRecord: string | undefined = this.tmpBuf.readString(4);
                let subRecordObj: Subrecord | [number, string];
                switch(subRecord) {
                    case 'DATA':
                        subRecordObj = new DATA(this.tmpBuf);
                        break;
                    case 'CNAM':
                        subRecordObj = new CNAM(this.tmpBuf);
                        break;
                    case 'DNAM':
                        subRecordObj = new DNAM(this.tmpBuf);
                        break;
                    case 'XNAM':
                        subRecordObj = new XNAM(this.tmpBuf);
                        break;
                    case 'VNAM':
                        subRecordObj = new VNAM(this.tmpBuf);
                        break;
                    case 'PNAM':
                        subRecordObj = new PNAM(this.tmpBuf);
                        break;
                    case 'UNAM':
                        subRecordObj = new UNAM(this.tmpBuf);
                        break;
                    case 'ATTR':
                        subRecordObj = new ATTR(this.tmpBuf);
                        break;
                    case 'NAM0':
                        subRecordObj = new NAM0(this.tmpBuf);
                        break;
                    case 'INDX':
                        subRecordObj = new INDX(this.tmpBuf);
                        break;
                    case 'NAM1':
                        subRecordObj = new NAM1(this.tmpBuf);
                        break;
                    case 'MNAM':
                        subRecordObj = new MNAM(this.tmpBuf);
                        break;
                    case 'FNAM':
                        subRecordObj = new FNAM(this.tmpBuf);
                        break;
                    case 'HNAM':
                        subRecordObj = new HNAM(this.tmpBuf);
                        break;
                    case 'ENAM':
                        subRecordObj = new ENAM(this.tmpBuf);
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
