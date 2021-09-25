import { formid, int32, ubyte, uint32 } from "../../../types";
import { ESMBuffer } from "../../../util";
import { Subrecord } from "./Subrecord";

export class BMDT extends Subrecord {
    public readonly flags: uint32;
    constructor(buf: ESMBuffer) {
        super('BMDT', buf, false);
        this.flags = buf.readUInt();
    }
}
