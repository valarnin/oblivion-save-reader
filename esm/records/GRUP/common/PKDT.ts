import { formid, uint32 } from "../../../types";
import { ESMBuffer } from "../../../util";
import { Subrecord } from "./Subrecord";

export class PKDT extends Subrecord {
    public readonly flags?: uint32;
    public readonly type?: uint32;
    constructor(buf: ESMBuffer) {
        super('PKDT', buf, false);
        if (this.subrecordDataLength > 0) {
            this.flags = buf.readUInt();
            if (this.subrecordDataLength > 4) {
                this.type = buf.readUInt();
            }
        }
    }
}
