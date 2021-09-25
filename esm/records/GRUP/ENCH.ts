import { uint32 } from "../../types";
import { ESMBuffer } from "../../util";
import CommonSubrecordFactory from "./common/CommonSubrecordFactory";
import { Subrecord } from "./common/Subrecord";
import { Record } from "./Record";

/*
Expected fields:
EDID
FULL
ENIT
EFID
EFIT
SCIT
FULL
*/

export class ENIT extends Subrecord {
    public readonly type: uint32;
    public readonly chargeAmount: uint32;
    public readonly enchantCost: uint32;
    public readonly flags: uint32;
    constructor(buf: ESMBuffer) {
        super('ENIT', buf, false);
        this.type = buf.readUInt();
        this.chargeAmount = buf.readUInt();
        this.enchantCost = buf.readUInt();
        this.flags = buf.readUInt();
    }
}

export class ENCH extends Record {
    constructor(buf: ESMBuffer) {
        super('ENCH', buf);
        if (this.tmpBuf) {
            let offset = 0;
            while (offset < this.dataSize) {
                let subRecord: string | undefined = this.tmpBuf.readString(4);
                let subRecordObj: Subrecord | [number, string];
                switch(subRecord) {
                    case 'ENIT':
                        subRecordObj = new ENIT(this.tmpBuf);
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
