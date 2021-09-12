import { SaveBuffer } from "./util";

export default class Global {
    iref = 0;
    value = 0.0;

    constructor(buf: SaveBuffer) {
        this.iref = buf.readInt();
        this.value = buf.readFloat();
    }
}