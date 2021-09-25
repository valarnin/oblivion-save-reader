import { formid, ubyte, ushort } from "../../types";
import { ESMBuffer } from "../../util";
import CommonSubrecordFactory from "./common/CommonSubrecordFactory";
import { Subrecord } from "./common/Subrecord";
import { Record } from "./Record";

/*
Expected fields:
DATA
QSTI
PNAM
TRDT
NAM1
NAM2
CTDA
TCLT
NAME
SCHR
SCDA
SCTX
SCRO
CTDT
*/

export class DATA extends Subrecord {
    public readonly dialogType: ushort;
    public readonly flags?: ubyte;
    constructor(buf: ESMBuffer) {
        super('DATA', buf, false);
        this.dialogType = buf.readUShort();
        if (this.subrecordDataLength > 2) {
            this.flags = buf.readUByte();
        }
    }
}

export class PNAM extends Subrecord {
    public readonly previousInfoId: formid;
    constructor(buf: ESMBuffer) {
        super('PNAM', buf, false);
        this.previousInfoId = buf.readUInt();
    }
}

export class NAM1 extends Subrecord {
    public readonly responseText: string;
    constructor(buf: ESMBuffer) {
        super('NAM1', buf, true);
        this.responseText = buf.readszString();
    }
}

export class NAM2 extends Subrecord {
    public readonly actorNotes: string;
    constructor(buf: ESMBuffer) {
        super('NAM2', buf, true);
        this.actorNotes = buf.readszString();
    }
}

// UESP doesn't mention this one
export class TPIC extends Subrecord {
    public readonly data: formid;
    constructor(buf: ESMBuffer) {
        super('TPIC', buf, false);
        this.data = buf.readUInt();
    }
}

// UESP doesn't mention this one
export class TCLF extends Subrecord {
    public readonly data: formid;
    constructor(buf: ESMBuffer) {
        super('TCLF', buf, false);
        this.data = buf.readUInt();
    }
}

export class INFO extends Record {
    constructor(buf: ESMBuffer) {
        super('INFO', buf);
        if (this.tmpBuf) {
            let offset = 0;
            while (offset < this.dataSize) {
                let subRecord: string | undefined = this.tmpBuf.readString(4);
                let subRecordObj: Subrecord | [number, string];
                switch(subRecord) {
                    case 'DATA':
                        subRecordObj = new DATA(this.tmpBuf);
                        break;
                    case 'PNAM':
                        subRecordObj = new PNAM(this.tmpBuf);
                        break;
                    case 'NAM1':
                        subRecordObj = new NAM1(this.tmpBuf);
                        break;
                    case 'NAM2':
                        subRecordObj = new NAM2(this.tmpBuf);
                        break;
                    case 'TPIC':
                        subRecordObj = new TPIC(this.tmpBuf);
                        break;
                    case 'TCLF':
                        subRecordObj = new TCLF(this.tmpBuf);
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
