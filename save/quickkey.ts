import { SaveBuffer } from "./util";

export default class QuickKey {
    flag = 0;
    iref = 0;

    constructor(buf: SaveBuffer) {
        this.flag = buf.readByte();
        if (this.flag & 1) {
            this.iref = buf.readInt();
        }
    }
}