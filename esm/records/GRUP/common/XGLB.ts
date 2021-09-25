import { formid } from "../../../types";
import { ESMBuffer } from "../../../util";
import { Subrecord } from "./Subrecord";

export class XGLB extends Subrecord {
    public readonly global: formid;
    constructor(buf: ESMBuffer) {
        super('XGLB', buf, false);
        this.global = buf.readUInt();
    }
}
