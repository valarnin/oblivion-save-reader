import { float, formid, int32, uint32 } from "../../types";
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
SCRI
ICON
DATA
FNAM
SNAM
*/

export class FNAM extends Subrecord {
    public readonly fadeValue: float;
    constructor(buf: ESMBuffer) {
        super('FNAM', buf, false);
        this.fadeValue = buf.readFloat();
    }
}

export class SNAM extends Subrecord {
    public readonly sound: formid;
    constructor(buf: ESMBuffer) {
        super('SNAM', buf, false);
        this.sound = buf.readUInt();
    }
}

export class DATA extends Subrecord {
    public readonly time: uint32;
    public readonly radius: uint32;
    public readonly lightColor: uint32;
    public readonly flags: uint32;
    public readonly falloffExponent?: float;
    public readonly fov?: float;
    public readonly value: int32;
    public readonly weight: float;
    constructor(buf: ESMBuffer) {
        super('DATA', buf, false);
        this.time = buf.readUInt();
        this.radius = buf.readUInt();
        this.lightColor = buf.readUInt();
        this.flags = buf.readUInt();
        if (this.subrecordDataLength === 32) {
            this.falloffExponent = buf.readFloat();
            this.fov = buf.readFloat();
        }
        this.value = buf.readUInt();
        this.weight = buf.readFloat();
    }
}

export class LIGH extends Record {
    constructor(buf: ESMBuffer) {
        super('LIGH', buf);
        if (this.tmpBuf) {
            let offset = 0;
            while (offset < this.dataSize) {
                let subRecord: string | undefined = this.tmpBuf.readString(4);
                let subRecordObj: Subrecord | [number, string];
                switch(subRecord) {
                    case 'FNAM':
                        subRecordObj = new FNAM(this.tmpBuf);
                        break;
                    case 'SNAM':
                        subRecordObj = new SNAM(this.tmpBuf);
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
