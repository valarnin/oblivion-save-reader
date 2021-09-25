import { float } from "../../types";
import { ESMBuffer } from "../../util";
import CommonSubrecordFactory from "./common/CommonSubrecordFactory";
import { Subrecord } from "./common/Subrecord";
import { Record } from "./Record";

/*
Expected fields:
EDID
NAME
XRGD
XESP
XOWN
XGLB
XRNK
XSCL
DATA
*/

export class DATA extends Subrecord {
    readonly x: float;
    readonly y: float;
    readonly z: float;
    readonly rx: float;
    readonly ry: float;
    readonly rz: float;
    constructor(buf: ESMBuffer) {
        super('DATA', buf, false);
        this.x = buf.readFloat();
        this.y = buf.readFloat();
        this.z = buf.readFloat();
        this.rx = buf.readFloat();
        this.ry = buf.readFloat();
        this.rz = buf.readFloat();
    }
}

export class ACRE extends Record {
    constructor(buf: ESMBuffer) {
        super('ACRE', buf);
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
