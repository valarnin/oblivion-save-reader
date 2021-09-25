import { formid } from "../../../types";
import { ESMBuffer } from "../../../util";
import { Subrecord } from "./Subrecord";

export class QSTR extends Subrecord {
    public readonly questFormid: formid;
    constructor(buf: ESMBuffer) {
        super('QSTR', buf, false);
        this.questFormid = buf.readUInt();
    }
}
