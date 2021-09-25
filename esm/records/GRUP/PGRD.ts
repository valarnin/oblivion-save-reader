import { short } from "../../types";
import { ESMBuffer } from "../../util";
import CommonSubrecordFactory from "./common/CommonSubrecordFactory";
import { Subrecord } from "./common/Subrecord";
import { Record } from "./Record";

/*
Expected fields:
DATA
PGRP
PGAG
PGRR
PGRI
PGRL
*/

export class DATA extends Subrecord {
    public readonly nodeCount: short;
    constructor(buf: ESMBuffer) {
        super('DATA', buf, false);
        this.nodeCount = buf.readShort();
    }
}

export class PGRD extends Record {
    constructor(buf: ESMBuffer) {
        super('PGRD', buf);
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
