import { int32 } from "../../../types";
import { ESMBuffer } from "../../../util";
import { Subrecord } from "./Subrecord";

export class XCLC extends Subrecord {
    public readonly x: int32;
    public readonly y: int32;
    constructor(buf: ESMBuffer) {
        super('XCLC', buf, false);
        this.x = buf.readInt();
        this.y = buf.readInt();
    }
}
