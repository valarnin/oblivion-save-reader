import { formid, short } from "../../types";
import { ESMBuffer } from "../../util";
import CommonSubrecordFactory from "./common/CommonSubrecordFactory";
import { Subrecord } from "./common/Subrecord";
import { Record } from "./Record";

/*
Expected fields:
EDID
ICON
DESC
LNAM
*/

export class LNAM extends Subrecord {
    public readonly cellWorldFormid: formid;
    public readonly worldFormid: formid;
    public readonly x: short;
    public readonly y: short;
    constructor(buf: ESMBuffer) {
        super('LNAM', buf, false);
        this.cellWorldFormid = buf.readUInt();
        this.worldFormid = buf.readUInt();
        this.x = buf.readShort();
        this.y = buf.readShort();
    }
}

export class LSCR extends Record {
    constructor(buf: ESMBuffer) {
        super('LSCR', buf);
        if (this.tmpBuf) {
            let offset = 0;
            while (offset < this.dataSize) {
                let subRecord: string | undefined = this.tmpBuf.readString(4);
                let subRecordObj: Subrecord | [number, string];
                switch(subRecord) {
                    case 'LNAM':
                        subRecordObj = new LNAM(this.tmpBuf);
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
