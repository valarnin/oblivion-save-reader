import { uint32 } from "../../../types";
import { ESMBuffer } from "../../../util";
import { Subrecord } from "./Subrecord";

export class SCRV extends Subrecord {
    public readonly index: uint32;
    constructor(buf: ESMBuffer) {
        super('SCRV', buf, false);
        this.index = buf.readUInt();
    }
}
