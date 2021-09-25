import { ESMBuffer } from "../../../util";
import { Subrecord } from "./Subrecord";

export class DESC extends Subrecord {
    public readonly description: string;
    constructor(buf: ESMBuffer) {
        super('DESC', buf, true);
        this.description = buf.readszString();
    }
}
