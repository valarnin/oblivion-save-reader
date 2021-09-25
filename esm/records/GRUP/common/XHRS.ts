import { formid } from "../../../types";
import { ESMBuffer } from "../../../util";
import { Subrecord } from "./Subrecord";

export class XHRS extends Subrecord {
    public readonly horse: formid;
    constructor(buf: ESMBuffer) {
        super('XHRS', buf, false);
        this.horse = buf.readUInt();
    }
}
