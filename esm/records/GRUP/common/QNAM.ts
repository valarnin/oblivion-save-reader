import { formid } from "../../../types";
import { ESMBuffer } from "../../../util";
import { Subrecord } from "./Subrecord";

export class QNAM extends Subrecord {
    public readonly closeSound: formid;
    constructor(buf: ESMBuffer) {
        super('QNAM', buf, false);
        this.closeSound = buf.readUInt();
    }
}
