import { int32, float } from "../../types";
import { ESMBuffer } from "../../util";
import CommonSubrecordFactory from "./common/CommonSubrecordFactory";
import { EDID } from "./common/EDID";
import { Subrecord } from "./common/Subrecord";
import { Record } from "./Record";

/*
Expected fields:
EDID
DATA
*/

export class DATA extends Subrecord {
    public readonly data: int32 | float | string;
    constructor(edid: EDID, buf: ESMBuffer) {
        const flag = edid.editorId.slice(0, 1);
        super('DATA', buf, flag === 's');
        switch(flag) {
            case 's':
                this.data = buf.readszString();
                break;
            case 'i':
                this.data = buf.readInt();
                break;
            case 'f':
                this.data = buf.readFloat();
                break;
            default:
                throw new Error(`Invalid prefix for GMST EDID ${edid.editorId}`);
                break;
        }
    }
}

export class GMST extends Record {
    constructor(buf: ESMBuffer) {
        super('GMST', buf);
        if (this.tmpBuf) {
            let offset = 0;
            while (offset < this.dataSize) {
                let subRecord: string | undefined = this.tmpBuf.readString(4);
                let subRecordObj: Subrecord | [number, string];
                switch(subRecord) {
                    case 'DATA':
                        {
                            const edid = this.subRecords.find(sr=>sr instanceof Subrecord && sr.label==='EDID');
                            if (!edid) throw new Error('GMST subrecord out of order');
                            subRecordObj = new DATA(edid as EDID, this.tmpBuf);
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
