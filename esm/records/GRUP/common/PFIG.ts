import { formid } from "../../../types";
import { ESMBuffer } from "../../../util";
import { Subrecord } from "./Subrecord";

export class PFIG extends Subrecord {
    public readonly ingredient: formid;
    constructor(buf: ESMBuffer) {
        super('PFIG', buf, false);
        this.ingredient = buf.readUInt();
    }
}
