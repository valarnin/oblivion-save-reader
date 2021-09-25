import { formid } from "../../../types";
import { ESMBuffer } from "../../../util";
import { Subrecord } from "./Subrecord";

export class XMRC extends Subrecord {
    public readonly merchantContainer: formid;
    constructor(buf: ESMBuffer) {
        super('XMRC', buf, false);
        this.merchantContainer = buf.readUInt();
    }
}
