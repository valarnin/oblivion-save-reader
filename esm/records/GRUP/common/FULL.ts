import { ESMBuffer } from "../../../util";
import { Subrecord } from "./Subrecord";

export class FULL extends Subrecord {
    public readonly itemName: string;
    constructor(buf: ESMBuffer) {
        super('FULL', buf, true);
        this.itemName = buf.readszString();
    }
}
