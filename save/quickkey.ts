import { bufToByte, bufToInt } from "./util";

export default class QuickKey {
    flag = 0;
    iref = 0;

    constructor(buf: ArrayBuffer, offset: number) {
        this.flag = bufToByte(buf.slice(offset, offset + 1)); offset += 1;
        if (this.flag & 1) {
            this.iref = bufToInt(buf.slice(offset, offset + 4));  offset += 4;
        }
    }
}