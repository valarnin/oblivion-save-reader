import { formid } from "../../../types";
import { ESMBuffer } from "../../../util";
import { Subrecord } from "./Subrecord";

export class ENAM extends Subrecord {
    public readonly enchantment: formid;
    constructor(buf: ESMBuffer) {
        super('ENAM', buf, false);
        this.enchantment = buf.readUInt();
    }
}
