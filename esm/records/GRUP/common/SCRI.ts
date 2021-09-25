import { formid } from "../../../types";
import { ESMBuffer } from "../../../util";
import { Subrecord } from "./Subrecord";

export class SCRI extends Subrecord {
    public readonly script: formid;
    constructor(buf: ESMBuffer) {
        super('SCRI', buf, false);
        this.script = buf.readUInt();
    }
}
