import { ESMBuffer } from "../../util";
import CommonSubrecordFactory from "./common/CommonSubrecordFactory";
import { Subrecord } from "./common/Subrecord";
import { Record } from "./Record";

/*
Expected fields:
EDID
FNAM
SNDD
SNDX
*/

export class FNAM extends Subrecord {
    public readonly fileName: string;
    constructor(buf: ESMBuffer) {
        super('FNAM', buf, true);
        this.fileName = buf.readszString();
    }
}

export class SOUN extends Record {
    constructor(buf: ESMBuffer) {
        super('SOUN', buf);
        if (this.tmpBuf) {
            let offset = 0;
            while (offset < this.dataSize) {
                let subRecord: string | undefined = this.tmpBuf.readString(4);
                let subRecordObj: Subrecord | [number, string];
                switch(subRecord) {
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
