import { ubyte } from "../../types";
import { ESMBuffer } from "../../util";
import CommonSubrecordFactory from "./common/CommonSubrecordFactory";
import { Subrecord } from "./common/Subrecord";
import { Record } from "./Record";

/*
Expected fields:
EDID
CSTD
CSAD
*/

// CSAD not mentioned by UESP, found on DLCBattlehornCastle.esp
export class CSAD extends Subrecord {
    constructor(buf: ESMBuffer) {
        super('CSAD', buf, false);
        buf.advance(this.subrecordDataLength);
    }
}


export class CSTY extends Record {
    constructor(buf: ESMBuffer) {
        super('CSTY', buf);
        if (this.tmpBuf) {
            let offset = 0;
            while (offset < this.dataSize) {
                let subRecord: string | undefined = this.tmpBuf.readString(4);
                let subRecordObj: Subrecord | [number, string];
                switch(subRecord) {
                    case 'CSAD':
                        subRecordObj = new CSAD(this.tmpBuf);
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
