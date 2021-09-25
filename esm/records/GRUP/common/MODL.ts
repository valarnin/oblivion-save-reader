import { ESMBuffer } from "../../../util";
import { Subrecord } from "./Subrecord";

export class MODL extends Subrecord {
    public readonly modelFilename: string;
    constructor(buf: ESMBuffer) {
        super('MODL', buf, true);
        this.modelFilename = buf.readszString();
    }
}
