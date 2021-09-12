import { SaveBuffer } from "./util";

export default class Region {
    iref = 0;
    unknown6 = 0;

    constructor(buf: SaveBuffer) {
        this.iref = buf.readInt();
        this.unknown6 = buf.readInt();
    }
}