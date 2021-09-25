import { float, ubyte, ushort } from "../../types";
import { ESMBuffer } from "../../util";
import CommonSubrecordFactory from "./common/CommonSubrecordFactory";
import { Subrecord } from "./common/Subrecord";
import { Record } from "./Record";

/*
Expected fields:
NAME
EDID
XMRK
FNAM
XOWN
XRNK
XGLB
XSCL
XTEL
XTRG
XSED
XLOD
XPCI
XLOC
XESP
XLCM
XRTM
XACT
XCNT
FULL
TNAM
ONAM
DATA
*/

export class FNAM extends Subrecord {
    public readonly mapFlags: ubyte;
    constructor(buf: ESMBuffer) {
        super('FNAM', buf, false);
        this.mapFlags = buf.readUByte();
    }
}

export class TNAM extends Subrecord {
    public readonly markerData: ushort;
    constructor(buf: ESMBuffer) {
        super('TNAM', buf, false);
        this.markerData = buf.readUShort();
    }
}

export class ONAM extends Subrecord {
    constructor(buf: ESMBuffer) {
        super('ONAM', buf, false);
    }
}

export class DATA extends Subrecord {
    readonly x: float;
    readonly y: float;
    readonly z: float;
    readonly rx: float;
    readonly ry: float;
    readonly rz: float;
    constructor(buf: ESMBuffer) {
        super('DATA', buf, false);
        this.x = buf.readFloat();
        this.y = buf.readFloat();
        this.z = buf.readFloat();
        this.rx = buf.readFloat();
        this.ry = buf.readFloat();
        this.rz = buf.readFloat();
    }
}

export class REFR extends Record {
    constructor(buf: ESMBuffer) {
        super('REFR', buf);
        if (this.tmpBuf) {
            let offset = 0;
            while (offset < this.dataSize) {
                let subRecord: string | undefined = this.tmpBuf.readString(4);
                let subRecordObj: Subrecord | [number, string];
                switch(subRecord) {
                    case 'FNAM':
                        subRecordObj = new FNAM(this.tmpBuf);
                        break;
                    case 'TNAM':
                        subRecordObj = new TNAM(this.tmpBuf);
                        break;
                    case 'ONAM':
                        subRecordObj = new ONAM(this.tmpBuf);
                        break;
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
