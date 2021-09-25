import { formid } from "../../../types";
import { ESMBuffer } from "../../../util";
import { Subrecord } from "./Subrecord";

export class CSDI extends Subrecord {
    public readonly soundFormid: formid;
    constructor(buf: ESMBuffer) {
        super('CSDI', buf, false);
        this.soundFormid = buf.readUInt();
    }
}
