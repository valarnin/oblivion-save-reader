import { formid, int32, uint32 } from "../../../types";
import { ESMBuffer } from "../../../util";
import { Subrecord } from "./Subrecord";

export class SCIT extends Subrecord {
    public readonly scriptEffect?: formid;
    public readonly magicSchool?: int32;
    public readonly visualEffectName?: string;
    public readonly flags?: uint32;
    constructor(buf: ESMBuffer) {
        super('SCIT', buf, false);
        if (this.subrecordDataLength >= 4) {
            this.scriptEffect = buf.readUInt();
            if (this.subrecordDataLength >= 8) {
                this.magicSchool = buf.readInt();
                if (this.subrecordDataLength >= 12) {
                    this.visualEffectName = buf.readString(4);
                    if (this.subrecordDataLength >= 16) {
                        this.flags = buf.readUInt();
                    }
                }
            }
        }
    }
}
