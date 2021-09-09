import { bufToString, bufToInt, bufToArray } from "./util";

export default class CreatedData {
    type = '';
    dataSize = 0;
    flags = 0;
    formid = 0;
    version = 0;
    data: number[] = [];

     constructor(buf: ArrayBuffer, offset: number) {
        this.type = bufToString(buf.slice(offset, offset + 4));            offset += 4;
        this.dataSize = bufToInt(buf.slice(offset, offset + 4));           offset += 4;
        this.flags = bufToInt(buf.slice(offset, offset + 4));              offset += 4;
        this.formid = bufToInt(buf.slice(offset, offset + 4));          offset += 4;
        this.version = bufToInt(buf.slice(offset, offset + 4));         offset += 4;
        this.data = bufToArray(buf.slice(offset, offset + this.dataSize)); offset += this.dataSize;
    }
}