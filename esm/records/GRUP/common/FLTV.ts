import { float } from "../../../types";
import { ESMBuffer } from "../../../util";
import { Subrecord } from "./Subrecord";

export class FLTV extends Subrecord {
    public readonly value: float;
    constructor(buf: ESMBuffer) {
        super('FLTV', buf, false);
        this.value = buf.readFloat();
    }
}
