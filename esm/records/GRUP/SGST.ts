import { ubyte, uint32, float } from "../../types";
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
ICON
SCRI
DATA
EFID
EFIT
SCIT
*/

export class DATA extends Subrecord {
    readonly uses: ubyte;
    readonly value: uint32;
    readonly weight: float;
    constructor(buf: ESMBuffer) {
        super('DATA', buf, false);
        this.uses = buf.readUByte();
        this.value = buf.readUInt();
        this.weight = buf.readFloat();
    }
}

export class SGST extends Record {
    constructor(buf: ESMBuffer) {
        super('SGST', buf);
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
