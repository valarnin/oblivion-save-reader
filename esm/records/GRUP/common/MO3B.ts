import { float } from "../../../types";
import { ESMBuffer } from "../../../util";
import { Subrecord } from "./Subrecord";

export class MO3B extends Subrecord {
    public readonly boundRadius: float;
    constructor(buf: ESMBuffer) {
        super('MO3B', buf, false);
        this.boundRadius = buf.readFloat();
    }
}
