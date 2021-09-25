import { formid, uint32 } from "../../../types";
import { ESMBuffer } from "../../../util";
import { Subrecord } from "./Subrecord";

export class PTDT extends Subrecord {
    public readonly type: uint32;
    public readonly target: formid | uint32;
    public readonly count: uint32;
    constructor(buf: ESMBuffer) {
        super('PTDT', buf, false);
        this.type = buf.readUInt();
        this.target = buf.readUInt();
        this.count = buf.readUInt();
    }
}
