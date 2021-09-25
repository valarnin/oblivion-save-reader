import { ubyte } from "../../../types";
import { ESMBuffer } from "../../../util";
import { Subrecord } from "./Subrecord";

export class XCMT extends Subrecord {
    public readonly musicType: ubyte;
    constructor(buf: ESMBuffer) {
        super('XCMT', buf, false);
        this.musicType = buf.readUByte();
    }
}
