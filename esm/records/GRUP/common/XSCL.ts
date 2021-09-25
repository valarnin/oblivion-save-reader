import { float } from "../../../types";
import { ESMBuffer } from "../../../util";
import { Subrecord } from "./Subrecord";

export class XSCL extends Subrecord {
    public readonly scale: float;
    constructor(buf: ESMBuffer) {
        super('XSCL', buf, false);
        this.scale = buf.readFloat();
    }
}
