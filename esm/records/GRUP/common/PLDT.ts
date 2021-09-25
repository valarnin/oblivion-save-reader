import { formid, uint32 } from "../../../types";
import { ESMBuffer } from "../../../util";
import { Subrecord } from "./Subrecord";

export class PLDT extends Subrecord {
    public readonly type: uint32;
    public readonly location: formid | uint32;
    public readonly radius: uint32;
    constructor(buf: ESMBuffer) {
        super('PLDT', buf, false);
        this.type = buf.readUInt();
        this.location = buf.readUInt();
        this.radius = buf.readUInt();
    }
}
