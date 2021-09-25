import { formid, ubyte, uint32 } from "../../../types";
import { ESMBuffer } from "../../../util";
import { Subrecord } from "./Subrecord";

export class PSDT extends Subrecord {
    public readonly month: ubyte;
    public readonly day: uint32;
    public readonly date: ubyte;
    public readonly time: ubyte;
    public readonly duration: uint32;
    constructor(buf: ESMBuffer) {
        super('PSDT', buf, false);
        this.month = buf.readUByte();
        this.day = buf.readUByte();
        this.date = buf.readUByte();
        this.time = buf.readUByte();
        this.duration = buf.readUInt();
    }
}
