import { formid, uint32 } from "../../../types";
import { ESMBuffer } from "../../../util";
import { Subrecord } from "./Subrecord";

export class XESP extends Subrecord {
    public readonly parentObject: formid;
    public readonly flags: uint32;
    constructor(buf: ESMBuffer) {
        super('XESP', buf, false);
        this.parentObject = buf.readUInt();
        this.flags = buf.readUInt();
    }
}
