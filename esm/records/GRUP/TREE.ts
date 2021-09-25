import { float, uint32 } from "../../types";
import { ESMBuffer } from "../../util";
import CommonSubrecordFactory from "./common/CommonSubrecordFactory";
import { Subrecord } from "./common/Subrecord";
import { Record } from "./Record";

/*
Expected fields:
EDID
MODL
MODB
MODT
ICON
SNAM
CNAM
BNAM
*/

export class SNAM extends Subrecord {
    public readonly speedtreeSeeds: uint32[];
    public readonly speedtreeSeedCount: number;
    constructor(buf: ESMBuffer) {
        super('SNAM', buf, false);
        this.speedtreeSeedCount = this.subrecordDataLength / 4;
        this.speedtreeSeeds = buf.readUIntArray(this.speedtreeSeedCount);
    }
}

export class CNAM extends Subrecord {
    public readonly leafCurvature: float;
    public readonly minLeafAngle: float;
    public readonly maxLeafAngle: float;
    public readonly branchDimmingValue: float;
    public readonly leafDimmingValue: float;
    public readonly shadowRadius: uint32;
    public readonly rockSpeed: float;
    public readonly rustleSpeed: float;
    constructor(buf: ESMBuffer) {
        super('CNAM', buf, false);
        this.leafCurvature = buf.readFloat();
        this.minLeafAngle = buf.readFloat();
        this.maxLeafAngle = buf.readFloat();
        this.branchDimmingValue = buf.readFloat();
        this.leafDimmingValue = buf.readFloat();
        this.shadowRadius = buf.readUInt();
        this.rockSpeed = buf.readFloat();
        this.rustleSpeed = buf.readFloat();
    }
}

export class BNAM extends Subrecord {
    public readonly billboardWidth: float;
    public readonly billboardHeight: float;
    constructor(buf: ESMBuffer) {
        super('BNAM', buf, false);
        this.billboardWidth = buf.readFloat();
        this.billboardHeight = buf.readFloat();
    }
}

export class TREE extends Record {
    constructor(buf: ESMBuffer) {
        super('TREE', buf);
        if (this.tmpBuf) {
            let offset = 0;
            while (offset < this.dataSize) {
                let subRecord: string | undefined = this.tmpBuf.readString(4);
                let subRecordObj: Subrecord | [number, string];
                switch(subRecord) {
                    case 'SNAM':
                        subRecordObj = new SNAM(this.tmpBuf);
                        break;
                    case 'CNAM':
                        subRecordObj = new CNAM(this.tmpBuf);
                        break;
                    case 'BNAM':
                        subRecordObj = new BNAM(this.tmpBuf);
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
