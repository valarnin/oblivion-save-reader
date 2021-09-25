import { int32 } from "../../../types";
import { ESMBuffer } from "../../../util";
import { Subrecord } from "./Subrecord";

export class XLCM extends Subrecord {
    public readonly modifier: int32;
    constructor(buf: ESMBuffer) {
        super('XLCM', buf, false);
        this.modifier = buf.readInt();
    }
}
