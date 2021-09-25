import { float } from "../../../types";
import { ESMBuffer } from "../../../util";
import { Subrecord } from "./Subrecord";

export class XCLW extends Subrecord {
    public readonly height: float;
    constructor(buf: ESMBuffer) {
        super('XCLW', buf, false);
        this.height = buf.readFloat();
    }
}
