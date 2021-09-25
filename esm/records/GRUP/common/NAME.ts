import { formid } from "../../../types";
import { ESMBuffer } from "../../../util";
import { Subrecord } from "./Subrecord";

export class NAME extends Subrecord {
    public readonly formId: formid;
    constructor(buf: ESMBuffer) {
        super('NAME', buf, false);
        this.formId = buf.readUInt();
    }
}
