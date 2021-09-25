import { ubyte } from "../../../types";
import { ESMBuffer } from "../../../util";
import { Subrecord } from "./Subrecord";

export class HCLR extends Subrecord {
    public readonly r: ubyte;
    public readonly g: ubyte;
    public readonly b: ubyte;
    public readonly a: ubyte;
    constructor(buf: ESMBuffer) {
        super('HCLR', buf, false);
        this.r = buf.readUByte();
        this.g = buf.readUByte();
        this.b = buf.readUByte();
        this.a = buf.readUByte();
    }
}
