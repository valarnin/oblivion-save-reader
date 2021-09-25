import { formid } from "../../types";
import { ESMBuffer } from "../../util";
import CommonSubrecordFactory from "./common/CommonSubrecordFactory";
import { Subrecord } from "./common/Subrecord";
import { Record } from "./Record";

/*
Expected fields:
EDID
LVLD
LVLF
SCRI
TNAM
LVLO
*/

export class TNAM extends Subrecord {
    public readonly formid: formid;
    constructor(buf: ESMBuffer) {
        super('TNAM', buf, false);
        this.formid = buf.readUInt();
    }
}

export class LVLC extends Record {
    constructor(buf: ESMBuffer) {
        super('LVLC', buf);
        if (this.tmpBuf) {
            let offset = 0;
            while (offset < this.dataSize) {
                let subRecord: string | undefined = this.tmpBuf.readString(4);
                let subRecordObj: Subrecord | [number, string];
                switch(subRecord) {
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
