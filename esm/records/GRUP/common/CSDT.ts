import { uint32 } from "../../../types";
import { ESMBuffer } from "../../../util";
import { Subrecord } from "./Subrecord";

export class CSDT extends Subrecord {
    public readonly soundtype: uint32;
    constructor(buf: ESMBuffer) {
        super('CSDT', buf, false);
        this.soundtype = buf.readUInt();
    }
}
