import { SaveBuffer } from "./util";

export default class CreatedData {
    type = '';
    dataSize = 0;
    flags = 0;
    formid = 0;
    version = 0;
    data: number[] = [];

     constructor(buf: SaveBuffer) {
        this.type = buf.readString(4);
        this.dataSize = buf.readInt();
        this.flags = buf.readInt();
        this.formid = buf.readInt();
        this.version = buf.readInt();
        this.data = buf.readByteArray(this.dataSize);
    }
}