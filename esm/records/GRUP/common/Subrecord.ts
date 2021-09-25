import { ushort } from "../../../types";
import { ESMBuffer } from "../../../util";


export class Subrecord {
    public readonly subrecordDataLength: ushort;
    public readonly totalLength: number;
    public readonly offset: number;
    constructor(public readonly label: string, buf: ESMBuffer, peek: boolean) {
        this.offset = buf.offset - 4;
        this.subrecordDataLength = peek ? buf.peekUShort() : buf.readUShort();
        this.totalLength = 6 + this.subrecordDataLength;
    }
}
