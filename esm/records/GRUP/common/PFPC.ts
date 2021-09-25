import { ubyte } from "../../../types";
import { ESMBuffer } from "../../../util";
import { Subrecord } from "./Subrecord";

export class PFPC extends Subrecord {
    public readonly springProduction: ubyte;
    public readonly summerProduction: ubyte;
    public readonly fallProduction: ubyte;
    public readonly winterProduction: ubyte;
    constructor(buf: ESMBuffer) {
        super('PFPC', buf, false);
        this.springProduction = buf.readUByte();
        this.summerProduction = buf.readUByte();
        this.fallProduction = buf.readUByte();
        this.winterProduction = buf.readUByte();
    }
}
