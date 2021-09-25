import { formid } from "../../../types";
import { ESMBuffer } from "../../../util";
import { Subrecord } from "./Subrecord";

export class WNAM extends Subrecord {
    public readonly containingWorld: formid;
    constructor(buf: ESMBuffer) {
        super('WNAM', buf, false);
        this.containingWorld = buf.readUInt();
    }
}
