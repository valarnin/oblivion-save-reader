import { float } from "../../../types";
import { ESMBuffer } from "../../../util";
import { Subrecord } from "./Subrecord";

export class MODB extends Subrecord {
    public readonly boundRadius: float;
    constructor(buf: ESMBuffer) {
        super('MODB', buf, false);
        this.boundRadius = buf.readFloat();
    }
}
