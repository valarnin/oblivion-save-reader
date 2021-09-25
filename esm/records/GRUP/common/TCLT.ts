import { formid } from "../../../types";
import { ESMBuffer } from "../../../util";
import { Subrecord } from "./Subrecord";

export class TCLT extends Subrecord {
    public readonly choice: formid;
    constructor(buf: ESMBuffer) {
        super('TCLT', buf, false);
        this.choice = buf.readUInt();
    }
}
