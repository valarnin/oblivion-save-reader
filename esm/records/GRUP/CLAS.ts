import { ubyte, uint32 } from "../../types";
import { ESMBuffer } from "../../util";
import CommonSubrecordFactory from "./common/CommonSubrecordFactory";
import { Subrecord } from "./common/Subrecord";
import { Record } from "./Record";

/*
Expected fields:
EDID
FULL
DESC
ICON
DATA
*/

export class DATA extends Subrecord {
    public readonly primaryAttribute1: uint32;
    public readonly primaryAttribute2: uint32;
    public readonly specialization: uint32;
    public readonly majorSkill1: uint32;
    public readonly majorSkill2: uint32;
    public readonly majorSkill3: uint32;
    public readonly majorSkill4: uint32;
    public readonly majorSkill5: uint32;
    public readonly majorSkill6: uint32;
    public readonly majorSkill7: uint32;
    public readonly flags?: uint32;
    public readonly services?: uint32;
    public readonly skillTrained?: ubyte;
    public readonly maxTrainingLevel?: ubyte;
    public readonly unused?: ubyte[];
    constructor(buf: ESMBuffer) {
        super('DATA', buf, false);
        this.primaryAttribute1 = buf.readUInt();
        this.primaryAttribute2 = buf.readUInt();
        this.specialization = buf.readUInt();
        this.majorSkill1 = buf.readUInt();
        this.majorSkill2 = buf.readUInt();
        this.majorSkill3 = buf.readUInt();
        this.majorSkill4 = buf.readUInt();
        this.majorSkill5 = buf.readUInt();
        this.majorSkill6 = buf.readUInt();
        this.majorSkill7 = buf.readUInt();
        if (this.subrecordDataLength > 40) {
            this.flags = buf.readUInt();
            if (this.subrecordDataLength > 44) {
                this.services = buf.readUInt();
                if (this.subrecordDataLength > 48) {
                    this.skillTrained = buf.readUByte();
                    this.maxTrainingLevel = buf.readUByte();
                    this.unused = buf.readUByteArray(2);
                }
            }
        }
    }
}

export class CLAS extends Record {
    constructor(buf: ESMBuffer) {
        super('CLAS', buf);
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
