import { formid } from "../../../types";
import { ESMBuffer } from "../../../util";
import { Subrecord } from "./Subrecord";

export class QSTI extends Subrecord {
    public readonly questFormid: formid;
    constructor(buf: ESMBuffer) {
        super('QSTI', buf, false);
        this.questFormid = buf.readUInt();
    }
}
