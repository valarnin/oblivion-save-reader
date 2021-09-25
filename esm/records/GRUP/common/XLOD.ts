import { float } from "../../../types";
import { ESMBuffer } from "../../../util";
import { Subrecord } from "./Subrecord";

export class XLOD extends Subrecord {
    public readonly lod1: float;
    public readonly lod2: float;
    public readonly lod3: float;
    constructor(buf: ESMBuffer) {
        super('XLOD', buf, false);
        this.lod1 = buf.readFloat();
        this.lod2 = buf.readFloat();
        this.lod3 = buf.readFloat();
    }
}
