import { ESMBuffer } from "../../../util";
import { Subrecord } from "./Subrecord";

export class MOD4 extends Subrecord {
    public readonly modelFilename: string;
    constructor(buf: ESMBuffer) {
        super('MOD4', buf, true);
        this.modelFilename = buf.readszString();
    }
}
