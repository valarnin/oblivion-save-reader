import { formid, ubyte } from "../../types";
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
SNAM
ANAM
BNAM
FNAM
TNAM
*/

export class SNAM extends Subrecord {
    public readonly openSound: formid;
    constructor(buf: ESMBuffer) {
        super('SNAM', buf, false);
        this.openSound = buf.readUInt();
    }
}

export class ANAM extends Subrecord {
    public readonly closeSound: formid;
    constructor(buf: ESMBuffer) {
        super('ANAM', buf, false);
        this.closeSound = buf.readUInt();
    }
}

export class BNAM extends Subrecord {
    public readonly loopSound: formid;
    constructor(buf: ESMBuffer) {
        super('BNAM', buf, false);
        this.loopSound = buf.readUInt();
    }
}

export class FNAM extends Subrecord {
    public readonly flags: ubyte;
    constructor(buf: ESMBuffer) {
        super('FNAM', buf, false);
        this.flags = buf.readUByte();
    }
}

export class TNAM extends Subrecord {
    public readonly randomTeleportDestination: formid;
    constructor(buf: ESMBuffer) {
        super('TNAM', buf, false);
        this.randomTeleportDestination = buf.readUInt();
    }
}

export class DOOR extends Record {
    constructor(buf: ESMBuffer) {
        super('DOOR', buf);
        if (this.tmpBuf) {
            let offset = 0;
            while (offset < this.dataSize) {
                let subRecord: string | undefined = this.tmpBuf.readString(4);
                let subRecordObj: Subrecord | [number, string];
                switch(subRecord) {
                    case 'SNAM':
                        subRecordObj = new SNAM(this.tmpBuf);
                        break;
                    case 'ANAM':
                        subRecordObj = new ANAM(this.tmpBuf);
                        break;
                    case 'BNAM':
                        subRecordObj = new BNAM(this.tmpBuf);
                        break;
                    case 'FNAM':
                        subRecordObj = new FNAM(this.tmpBuf);
                        break;
                    case 'TNAM':
                        subRecordObj = new TNAM(this.tmpBuf);
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
