import { ubyte, formid } from "../../types";
import { ESMBuffer } from "../../util";
import CommonSubrecordFactory from "./common/CommonSubrecordFactory";
import { Subrecord } from "./common/Subrecord";
import { Record } from "./Record";

/*
Expected fields:
EDID
ICON
HNAM
SNAM
GNAM
*/

export class HNAM extends Subrecord {
    public readonly type: ubyte;
    public readonly friction: ubyte;
    public readonly restitution: ubyte;
    constructor(buf: ESMBuffer) {
        super('HNAM', buf, false);
        this.type = buf.readUByte();
        this.friction = buf.readUByte();
        this.restitution = buf.readUByte();
    }
}

export class SNAM extends Subrecord {
    public readonly exponent: ubyte;
    constructor(buf: ESMBuffer) {
        super('SNAM', buf, false);
        this.exponent = buf.readUByte();
    }
}

export class GNAM extends Subrecord {
    public readonly formid: formid;
    constructor(buf: ESMBuffer) {
        super('GNAM', buf, false);
        this.formid = buf.readUInt();
    }
}

export class LTEX extends Record {
    constructor(buf: ESMBuffer) {
        super('LTEX', buf);
        if (this.tmpBuf) {
            let offset = 0;
            while (offset < this.dataSize) {
                let subRecord: string | undefined = this.tmpBuf.readString(4);
                let subRecordObj: Subrecord | [number, string];
                switch(subRecord) {
                    case 'HNAM':
                        subRecordObj = new HNAM(this.tmpBuf);
                        break;
                    case 'SNAM':
                        subRecordObj = new SNAM(this.tmpBuf);
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
