import { formid } from "../../../types";
import { ESMBuffer } from "../../../util";
import { Subrecord } from "./Subrecord";

export class XRTM extends Subrecord {
    public readonly cellReference: formid;
    constructor(buf: ESMBuffer) {
        super('XRTM', buf, false);
        this.cellReference = buf.readUInt();
    }
}
