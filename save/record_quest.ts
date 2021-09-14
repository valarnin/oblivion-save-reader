import Record from "./record";
import { SaveBuffer } from "./util";

export class RecordQuest {
    flags?: number;
    stageNum?: number;
    stage: {
        index: number;
        flag: number;
        entryNum: number;
        entries: {
            entryNum: number;
            entryValFloat: number;
            entryValInt: number;
            entryValByteArray: number[];
        }[];
    }[] = [];
    dataNum?: number;
    dataUnknown?: number;
    data: number[][] = [];
    constructor(record: Record, buf: SaveBuffer) {
        const startOffset = buf.offset;
        if (record.flags & 0x4) {
            this.flags = buf.readByte();
        }
        if (record.flags & 0x10000000) {
            this.stageNum = buf.readByte();
            for (let i = 0; i < this.stageNum; ++i) {
                let index = buf.readByte();
                let flag = buf.readByte();
                let entryNum = buf.readByte();
                let entries: {
                    entryNum: number;
                    entryValFloat: number;
                    entryValInt: number;
                    entryValByteArray: number[];
                }[] = [];
                for (let j = 0; j < entryNum; ++j) {
                    let entryFlag = buf.readByte();
                    // Read from a clone of buf for the other two since it's the same data represented 3 ways
                    let tmp = buf.clone();
                    let tmp2 = buf.clone();

                    let entryValFloat = buf.readFloat();

                    let entryValInt = tmp.readInt();
                    let entryValByteArray = tmp2.readByteArray(4);

                    entries.push({
                        entryNum: entryFlag,
                        entryValFloat: entryValFloat,
                        entryValInt: entryValInt,
                        entryValByteArray: entryValByteArray,
                    });
                }
                this.stage.push({
                    index: index,
                    flag: flag,
                    entryNum: entryNum,
                    entries: entries,
                });
            }
        }
        if (record.flags & 0x8000000) {
            this.dataNum = buf.readShort();
            this.dataUnknown = buf.readByte();
            for (let i = 0; i < this.dataNum; ++i) {
                let l = 12;
                if (i + 1 === this.dataNum) {
                    l = (startOffset + record.dataSize) - buf.offset;
                }
                this.data.push(buf.readByteArray(l));
                if (buf.offset > (startOffset + record.dataSize)) {
                    break;
                }
            }
        }
        if (buf.buffer.byteLength !== buf.offset) {
            debugger;
        }
    }
}