import { formid } from "../../../types";
import { ESMBuffer } from "../../../util";
import { Subrecord } from "./Subrecord";

export class XOWN extends Subrecord {
    public readonly owner: formid;
    constructor(buf: ESMBuffer) {
        super('XOWN', buf, false);
        this.owner = buf.readUInt();
    }
}
