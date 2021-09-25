import { formid } from "../../../types";
import { ESMBuffer } from "../../../util";
import { Subrecord } from "./Subrecord";

export class SCRO extends Subrecord {
    public readonly globalVariable: formid;
    constructor(buf: ESMBuffer) {
        super('SCRO', buf, false);
        this.globalVariable = buf.readUInt();
    }
}
