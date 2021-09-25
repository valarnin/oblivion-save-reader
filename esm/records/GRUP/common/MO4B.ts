import { float } from "../../../types";
import { ESMBuffer } from "../../../util";
import { Subrecord } from "./Subrecord";

export class MO4B extends Subrecord {
    public readonly boundRadius: float;
    constructor(buf: ESMBuffer) {
        super('MO4B', buf, false);
        this.boundRadius = buf.readFloat();
    }
}
