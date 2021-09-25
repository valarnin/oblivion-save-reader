import { ubyte } from "../../types";
import { ESMBuffer } from "../../util";
import CommonSubrecordFactory from "./common/CommonSubrecordFactory";
import { Subrecord } from "./common/Subrecord";
import { Record } from "./Record";

/*
Expected fields:
EDID
TNAM
ANAM
FNAM
MNAM
SNAM
DATA
GNAM
*/

export class TNAM extends Subrecord {
    constructor(buf: ESMBuffer) {
        super('TNAM', buf, false);
        buf.advance(this.subrecordDataLength);
    }
}

export class ANAM extends Subrecord {
    constructor(buf: ESMBuffer) {
        super('ANAM', buf, false);
        buf.advance(this.subrecordDataLength);
    }
}

export class FNAM extends Subrecord {
    constructor(buf: ESMBuffer) {
        super('FNAM', buf, false);
        buf.advance(this.subrecordDataLength);
    }
}

export class MNAM extends Subrecord {
    constructor(buf: ESMBuffer) {
        super('MNAM', buf, false);
        buf.advance(this.subrecordDataLength);
    }
}

export class SNAM extends Subrecord {
    constructor(buf: ESMBuffer) {
        super('SNAM', buf, false);
        buf.advance(this.subrecordDataLength);
    }
}

export class DATA extends Subrecord {
    constructor(buf: ESMBuffer) {
        super('DATA', buf, false);
        buf.advance(this.subrecordDataLength);
    }
}

export class GNAM extends Subrecord {
    constructor(buf: ESMBuffer) {
        super('GNAM', buf, false);
        buf.advance(this.subrecordDataLength);
    }
}

export class WATR extends Record {
    constructor(buf: ESMBuffer) {
        super('WATR', buf);
        if (this.tmpBuf) {
            let offset = 0;
            while (offset < this.dataSize) {
                let subRecord: string | undefined = this.tmpBuf.readString(4);
                let subRecordObj: Subrecord | [number, string];
                switch(subRecord) {
                    case 'TNAM':
                        subRecordObj = new TNAM(this.tmpBuf);
                        break;
                    case 'ANAM':
                        subRecordObj = new ANAM(this.tmpBuf);
                        break;
                    case 'FNAM':
                        subRecordObj = new FNAM(this.tmpBuf);
                        break;
                    case 'MNAM':
                        subRecordObj = new MNAM(this.tmpBuf);
                        break;
                    case 'SNAM':
                        subRecordObj = new SNAM(this.tmpBuf);
                        break;
                    case 'DATA':
                        subRecordObj = new DATA(this.tmpBuf);
                        break;
                    case 'GNAM':
                        subRecordObj = new GNAM(this.tmpBuf);
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
