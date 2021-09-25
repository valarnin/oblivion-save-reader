import { float, formid, ubyte, uint32, ushort } from "../../types";
import { ESMBuffer } from "../../util";
import CommonSubrecordFactory from "./common/CommonSubrecordFactory";
import { Subrecord } from "./common/Subrecord";
import { Record } from "./Record";

/*
Expected fields:
EDID
FULL
WNAM
SNAM
ICON
CNAM
NAM2
DATA
NAM0
NAM9
*/

// UESP doesn't mention this one at all, found in DLCVileLair.esp
export class MNAM extends Subrecord {
    
    constructor(buf: ESMBuffer) {
        super('MNAM', buf, false);
        buf.advance(this.subrecordDataLength);
    }
}

export class WNAM extends Subrecord {
    public readonly parentWorldspace: formid;
    constructor(buf: ESMBuffer) {
        super('WNAM', buf, false);
        this.parentWorldspace = buf.readUInt();
    }
}

export class SNAM extends Subrecord {
    public readonly sound: uint32;
    constructor(buf: ESMBuffer) {
        super('SNAM', buf, false);
        this.sound = buf.readUInt();
    }
}

export class CNAM extends Subrecord {
    public readonly climate: formid;
    constructor(buf: ESMBuffer) {
        super('CNAM', buf, false);
        this.climate = buf.readUInt();
    }
}

export class NAM2 extends Subrecord {
    public readonly water: formid;
    constructor(buf: ESMBuffer) {
        super('NAM2', buf, false);
        this.water = buf.readUInt();
    }
}

export class DATA extends Subrecord {
    public readonly flags: ubyte;
    constructor(buf: ESMBuffer) {
        super('DATA', buf, false);
        this.flags = buf.readUByte();
    }
}
// UESP wrong about NAM0 and NAM9, they're two floats each
export class NAM0 extends Subrecord {
    public readonly x: float;
    public readonly y: float;
    constructor(buf: ESMBuffer) {
        super('NAM0', buf, false);
        this.x = buf.readFloat();
        this.y = buf.readFloat();
    }
}

export class NAM9 extends Subrecord {
    public readonly x: float;
    public readonly y: float;
    constructor(buf: ESMBuffer) {
        super('NAM9', buf, false);
        this.x = buf.readFloat();
        this.y = buf.readFloat();
    }
}

// This is ugly...
export class XXXX extends Subrecord {
    public readonly nextSize: uint32;
    constructor(buf: ESMBuffer) {
        super('XXXX', buf, false);
        this.nextSize = buf.readUInt();
    }
}

export class OFST_Subrecord {
    offset: uint32;
    type: string;
    unknown: uint32;
    constructor(buf: ESMBuffer) {
        this.offset = buf.readUInt();
        this.type = buf.readString(4);
        this.unknown = buf.readUInt();
    }
}

// Doesn't seem to match up with TES4.OFST record, treat as unknown
export class OFST extends Subrecord {
    public readonly subrecordDataLength: ushort;
    public readonly totalLength: number;
    constructor(buf: ESMBuffer, realDataLength?: number) {
        super('OFST', buf, true);
        this.subrecordDataLength = buf.readUShort();
        if (realDataLength !== undefined) {
            this.subrecordDataLength = realDataLength;
        }
        this.totalLength = 6 + this.subrecordDataLength;
        buf.advance(this.subrecordDataLength);
    }
}

export class WRLD extends Record {
    constructor(buf: ESMBuffer) {
        super('WRLD', buf);
        if (this.tmpBuf) {
            let offset = 0;
            while (offset < this.dataSize) {
                let subRecord: string | undefined = this.tmpBuf.readString(4);
                let subRecordObj: Subrecord | [number, string];
                switch(subRecord) {
                    case 'WNAM':
                        subRecordObj = new WNAM(this.tmpBuf);
                        break;
                    case 'SNAM':
                        subRecordObj = new SNAM(this.tmpBuf);
                        break;
                    case 'CNAM':
                        subRecordObj = new CNAM(this.tmpBuf);
                        break;
                    case 'NAM2':
                        subRecordObj = new NAM2(this.tmpBuf);
                        break;
                    case 'DATA':
                        subRecordObj = new DATA(this.tmpBuf);
                        break;
                    case 'NAM0':
                        subRecordObj = new NAM0(this.tmpBuf);
                        break;
                    case 'NAM9':
                        subRecordObj = new NAM9(this.tmpBuf);
                        break;
                    case 'MNAM':
                        subRecordObj = new MNAM(this.tmpBuf);
                        break;
                    case 'XXXX':
                        subRecordObj = new XXXX(this.tmpBuf);
                        break;
                    case 'OFST':
                        const lastRecord = this.subRecords.slice(-1)?.[0];
                        if (lastRecord instanceof Subrecord && lastRecord && lastRecord.label === 'XXXX') {
                            subRecordObj = new OFST(this.tmpBuf, (lastRecord as XXXX).nextSize);
                        } else {
                            subRecordObj = new OFST(this.tmpBuf);
                        }
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
