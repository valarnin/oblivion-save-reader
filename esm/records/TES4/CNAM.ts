import { ushort } from "../../types";
import { ESMBuffer } from "../../util";

export class CNAM {
    public readonly subrecordDataLength: ushort;
    public readonly author: string;
    public readonly totalLength: number;
    constructor(buf: ESMBuffer) {
        this.subrecordDataLength = buf.peekUShort();
        this.totalLength = 6 + this.subrecordDataLength;
        this.author = buf.readszString();
    }
}
