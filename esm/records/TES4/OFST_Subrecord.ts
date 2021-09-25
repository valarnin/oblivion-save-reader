import { uint32 } from "../../types";
import { ESMBuffer } from "../../util";


export class OFST_Subrecord {
    offset: uint32;
    type: string;
    unknown: uint32;
    constructor(buf: ESMBuffer) {
        this.offset = buf.readUInt();
        this.type = buf.readString(4);
        this.unknown = buf.readUInt();
    }
}
