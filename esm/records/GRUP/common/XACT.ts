import { uint32 } from "../../../types";
import { ESMBuffer } from "../../../util";
import { Subrecord } from "./Subrecord";

export class XACT extends Subrecord {
    public readonly unknown: uint32;
    constructor(buf: ESMBuffer) {
        super('XACT', buf, false);
        this.unknown = buf.readUInt();
    }
}
