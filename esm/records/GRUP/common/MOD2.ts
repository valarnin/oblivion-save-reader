import { ESMBuffer } from "../../../util";
import { Subrecord } from "./Subrecord";

export class MOD2 extends Subrecord {
    public readonly modelFilename: string;
    constructor(buf: ESMBuffer) {
        super('MOD2', buf, true);
        this.modelFilename = buf.readszString();
    }
}
