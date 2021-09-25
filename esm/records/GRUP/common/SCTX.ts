import { ESMBuffer } from "../../../util";
import { Subrecord } from "./Subrecord";

export class SCTX extends Subrecord {
    public readonly resultScriptSource: string;
    constructor(buf: ESMBuffer) {
        super('SCTX', buf, true);
        this.resultScriptSource = buf.readszString();
    }
}
