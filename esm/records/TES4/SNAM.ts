import { ushort } from "../../types";
import { ESMBuffer } from "../../util";

export class SNAM {
    public readonly subrecordDataLength: ushort;
    public readonly description: string;
    public readonly totalLength: number;
    constructor(buf: ESMBuffer) {
        this.subrecordDataLength = buf.peekUShort();
        this.totalLength = 6 + this.subrecordDataLength;
        this.description = buf.readszString();
    }
}
