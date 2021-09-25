import { ubyte } from "../../types";
import { ESMBuffer } from "../../util";
import CommonSubrecordFactory from "./common/CommonSubrecordFactory";
import { Subrecord } from "./common/Subrecord";
import { Record } from "./Record";

/*
Expected fields:
EDID
WLST
FNAM
GNAM
MODL
MODB
TNAM
*/

export class TNAM extends Subrecord {
    constructor(buf: ESMBuffer) {
        super('TNAM', buf, false);
        buf.advance(this.subrecordDataLength);
    }
}

export class FNAM extends Subrecord {
    public readonly sunFilename: string;
    constructor(buf: ESMBuffer) {
        super('FNAM', buf, true);
        this.sunFilename = buf.readszString();
    }
}

export class CLMT extends Record {
    constructor(buf: ESMBuffer) {
        super('CLMT', buf);
        if (this.tmpBuf) {
            let offset = 0;
            while (offset < this.dataSize) {
                let subRecord: string | undefined = this.tmpBuf.readString(4);
                let subRecordObj: Subrecord | [number, string];
                switch(subRecord) {
                    case 'TNAM':
                        subRecordObj = new TNAM(this.tmpBuf);
                        break;
                    case 'FNAM':
                        subRecordObj = new FNAM(this.tmpBuf);
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
