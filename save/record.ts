import { bufToInt, bufToByte, bufToShort, bufToArray } from "./util";

export default class Record {
    formId = 0;
    type = 0;
    flags = 0;
    version = 0;
    dataSize = 0;
    data: number[] = [];
    subRecord = undefined;

    constructor(buf: ArrayBuffer, offset: number) {
        this.formId = bufToInt(buf.slice(offset, offset + 4));             offset += 4;
        this.type = bufToByte(buf.slice(offset, offset + 1));              offset += 1;
        this.flags = bufToInt(buf.slice(offset, offset + 4));              offset += 4;
        this.version = bufToByte(buf.slice(offset, offset + 1));           offset += 1;
        this.dataSize = bufToShort(buf.slice(offset, offset + 2));         offset += 2;
        this.data = bufToArray(buf.slice(offset, offset + this.dataSize)); offset += this.dataSize;
    }
}