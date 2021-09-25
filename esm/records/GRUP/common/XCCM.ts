import { formid } from "../../../types";
import { ESMBuffer } from "../../../util";
import { Subrecord } from "./Subrecord";

export class XCCM extends Subrecord {
    public readonly climate: formid;
    constructor(buf: ESMBuffer) {
        super('XCCM', buf, false);
        this.climate = buf.readUInt();
    }
}
