import { formid } from "../../../types";
import { ESMBuffer } from "../../../util";
import { Subrecord } from "./Subrecord";

export class ZNAM extends Subrecord {
    public readonly combatStyle: formid;
    constructor(buf: ESMBuffer) {
        super('ZNAM', buf, false);
        this.combatStyle = buf.readUInt();
    }
}
