import { float } from "../../../types";
import { ESMBuffer } from "../../../util";
import { Subrecord } from "./Subrecord";

export class MO2B extends Subrecord {
    public readonly boundRadius: float;
    constructor(buf: ESMBuffer) {
        super('MO2B', buf, false);
        this.boundRadius = buf.readFloat();
    }
}
