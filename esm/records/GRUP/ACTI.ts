import { formid } from "../../types";
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
*/

export class SNAM extends Subrecord {
    public readonly sound: formid;
    constructor(buf: ESMBuffer) {
        super('SNAM', buf, false);
        this.sound = buf.readUInt();
    }
}

export class ACTI extends Record {
    constructor(buf: ESMBuffer) {
        super('ACTI', buf);
        if (this.tmpBuf) {
            let offset = 0;
            while (offset < this.dataSize) {
                let subRecord: string | undefined = this.tmpBuf.readString(4);
                let subRecordObj: Subrecord | [number, string];
                switch(subRecord) {
                    case 'SNAM':
                        subRecordObj = new SNAM(this.tmpBuf);
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
