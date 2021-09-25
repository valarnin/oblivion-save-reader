import { ESMBuffer } from "../../../util";
import { Subrecord } from "./Subrecord";

export class EDID extends Subrecord {
    public readonly editorId: string;
    constructor(buf: ESMBuffer) {
        super('EDID', buf, true);
        this.editorId = buf.readszString();
    }
}
