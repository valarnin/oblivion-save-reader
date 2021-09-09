import { bufToInt } from "./util";

export default class Region {
    iref = 0;
    unknown6 = 0;

    constructor(buf: ArrayBuffer, offset: number) {
        this.iref = bufToInt(buf.slice(offset, offset + 4));     offset += 4;
        this.unknown6 = bufToInt(buf.slice(offset, offset + 4)); offset += 4;
    }
}