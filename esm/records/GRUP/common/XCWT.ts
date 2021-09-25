import { formid } from "../../../types";
import { ESMBuffer } from "../../../util";
import { Subrecord } from "./Subrecord";

export class XCWT extends Subrecord {
    public readonly water: formid;
    constructor(buf: ESMBuffer) {
        super('XCWT', buf, false);
        this.water = buf.readUInt();
    }
}
