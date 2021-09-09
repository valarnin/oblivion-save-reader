import Record from "./record";
import { bufToArray, bufToByte, bufToFloat, bufToInt, bufToShort } from "./util";

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
    constructor(record: Record, buf: ArrayBuffer, offset: number) {
        const startOffset = offset;
        if (record.flags & 0x4) {
            this.flags = bufToByte(buf.slice(offset, offset + 1));
            offset += 1;
        }
        if (record.flags & 0x10000000) {
            this.stageNum = bufToByte(buf.slice(offset, offset + 1));
            offset += 1;
            for (let i = 0; i < this.stageNum; ++i) {
                let index = bufToByte(buf.slice(offset, offset + 1));
                offset += 1;
                let flag = bufToByte(buf.slice(offset, offset + 1));
                offset += 1;
                let entryNum = bufToByte(buf.slice(offset, offset + 1));
                offset += 1;
                let entries: {
                    entryNum: number;
                    entryValFloat: number;
                    entryValInt: number;
                    entryValByteArray: number[];
                }[] = [];
                for (let j = 0; j < entryNum; ++j) {
                    let entryFlag = bufToByte(buf.slice(offset, offset + 1));
                    offset += 1;
                    let entryValFloat = bufToFloat(buf.slice(offset, offset + 4));
                    let entryValInt = bufToInt(buf.slice(offset, offset + 4));
                    let entryValByteArray = bufToArray(buf.slice(offset, offset + 4));
                    offset += 4;
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
            this.dataNum = bufToShort(buf.slice(offset, offset + 2));
            offset += 2;
            this.dataUnknown = bufToByte(buf.slice(offset, offset + 1));
            offset += 1;
            for (let i = 0; i < this.dataNum; ++i) {
                this.data.push(bufToArray(buf.slice(offset, offset + 12)));
                offset += 12;
                if (offset > (startOffset + record.dataSize)) {
                    debugger;
                }
            }
        }
    }
}