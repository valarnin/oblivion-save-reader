import { ESMBuffer } from "../../../util";
import { Subrecord } from "./Subrecord";

export class GNAM extends Subrecord {
    public readonly sunGlareFilename: string;
    constructor(buf: ESMBuffer) {
        super('GNAM', buf, true);
        this.sunGlareFilename = buf.readszString();
    }
}
