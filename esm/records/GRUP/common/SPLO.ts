import { formid } from "../../../types";
import { ESMBuffer } from "../../../util";
import { Subrecord } from "./Subrecord";

export class SPLO extends Subrecord {
    public readonly spell: formid;
    constructor(buf: ESMBuffer) {
        super('SPLO', buf, false);
        this.spell = buf.readUInt();
    }
}
