import { uint32 } from "../../../types";
import { ESMBuffer } from "../../../util";
import { Subrecord } from "./Subrecord";

export class XCNT extends Subrecord {
    public readonly count: uint32;
    constructor(buf: ESMBuffer) {
        super('XCNT', buf, false);
        this.count = buf.readUInt();
    }
}
