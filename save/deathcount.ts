import { SaveBuffer } from "./util";

export default class DeathCount {
    actor = 0;
    deathCount = 0;

    constructor(buf: SaveBuffer) {
        this.actor = buf.readInt();
        this.deathCount = buf.readShort();
    }
}