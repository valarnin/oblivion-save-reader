import { bufToInt, bufToFloat } from "./util";

export default class Global {
    iref = 0;
    value = 0.0;

    constructor(buf: ArrayBuffer, offset: number) {
        this.iref = bufToInt(buf.slice(offset, offset + 4));    offset += 4;
        this.value = bufToFloat(buf.slice(offset, offset + 4)); offset += 4;
    }
}