import { ubyte, int32, float } from "../../types";
import { ESMBuffer } from "../../util";
import CommonSubrecordFactory from "./common/CommonSubrecordFactory";
import { Subrecord } from "./common/Subrecord";
import { Record } from "./Record";

/*
Expected fields:
EDID
FULL
SCRI
MODL
MODB
MODT
ICON
DATA
*/

export class DATA extends Subrecord {
    public readonly type: ubyte;
    public readonly value: int32;
    public readonly weight: float;
    public readonly quality: float;
    constructor(buf: ESMBuffer) {
        super('DATA', buf, false);
        this.type = buf.readUByte();
        this.value = buf.readInt();
        this.weight = buf.readFloat();
        this.quality = buf.readFloat();
    }
}

export class APPA extends Record {
    constructor(buf: ESMBuffer) {
        super('APPA', buf);
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
