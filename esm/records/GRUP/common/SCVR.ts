import { ESMBuffer } from "../../../util";
import { Subrecord } from "./Subrecord";

export class SCVR extends Subrecord {
    public readonly variableName: string;
    constructor(buf: ESMBuffer) {
        super('SCVR', buf, true);
        this.variableName = buf.readszString();
    }
}
