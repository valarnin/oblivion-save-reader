import { bufToInt, bufToShort } from "./util";

export default class DeathCount {
    actor = 0;
    deathCount = 0;

    constructor(buf: ArrayBuffer, offset: number) {
        this.actor = bufToInt(buf.slice(offset, offset + 4));        offset += 4;
        this.deathCount = bufToShort(buf.slice(offset, offset + 2)); offset += 2;
    }
}