import { uint32 } from "../../../types";
import { ESMBuffer } from "../../../util";
import { Subrecord } from "./Subrecord";

// This is either flags or parent record of some sort?
export class XPCI extends Subrecord {
    public readonly flags: uint32;
    constructor(buf: ESMBuffer) {
        super('XPCI', buf, false);
        this.flags = buf.readUInt();
    }
}
