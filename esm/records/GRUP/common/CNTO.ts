import { formid, int32, ubyte, uint32 } from "../../../types";
import { ESMBuffer } from "../../../util";
import { Subrecord } from "./Subrecord";

export class CNTO extends Subrecord {
    public readonly formid: formid;
    public readonly count: int32;
    constructor(buf: ESMBuffer) {
        super('CNTO', buf, false);
        this.formid = buf.readUInt();
        this.count = buf.readInt();
    }
}
