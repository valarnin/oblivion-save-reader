import { ushort, int32, float, ubyte } from "../../types";
import { ESMBuffer } from "../../util";
import CommonSubrecordFactory from "./common/CommonSubrecordFactory";
import { Subrecord } from "./common/Subrecord";
import { Record } from "./Record";

/*
Expected fields:
EDID
FULL
DESC
SCRI
MODL
MODB
MODT
ICON
ANAM
ENAM
DATA
*/

export class DATA extends Subrecord {
    public readonly flags: ubyte;
    public readonly teaches: ubyte;
    public readonly value: int32;
    public readonly weight: float;
    constructor(buf: ESMBuffer) {
        super('DATA', buf, false);
        this.flags = buf.readUByte();
        this.teaches = buf.readUByte();
        this.value = buf.readInt();
        this.weight = buf.readFloat();
    }
}

export class BOOK extends Record {
    constructor(buf: ESMBuffer) {
        super('BOOK', buf);
        if (this.tmpBuf) {
            let offset = 0;
            while (offset < this.dataSize) {
                let subRecord: string | undefined = this.tmpBuf.readString(4);
                let subRecordObj: Subrecord | [number, string];
                switch(subRecord) {
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
