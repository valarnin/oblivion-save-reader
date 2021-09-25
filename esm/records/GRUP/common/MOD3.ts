import { ESMBuffer } from "../../../util";
import { Subrecord } from "./Subrecord";

export class MOD3 extends Subrecord {
    public readonly modelFilename: string;
    constructor(buf: ESMBuffer) {
        super('MOD3', buf, true);
        this.modelFilename = buf.readszString();
    }
}
