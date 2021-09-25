import { formid } from "../../../types";
import { ESMBuffer } from "../../../util";
import { Subrecord } from "./Subrecord";

export class XTRG extends Subrecord {
    public readonly target: formid;
    constructor(buf: ESMBuffer) {
        super('XTRG', buf, false);
        this.target = buf.readUInt();
    }
}
