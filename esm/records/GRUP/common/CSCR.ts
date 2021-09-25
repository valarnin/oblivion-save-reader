import { formid } from "../../../types";
import { ESMBuffer } from "../../../util";
import { Subrecord } from "./Subrecord";

export class CSCR extends Subrecord {
    public readonly parent: formid;
    constructor(buf: ESMBuffer) {
        super('CSCR', buf, false);
        this.parent = buf.readUInt();
    }
}
