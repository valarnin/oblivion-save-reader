import { ESMBuffer } from "../../../util";
import { Subrecord } from "./Subrecord";

export class EFID extends Subrecord {
    public readonly effectId: string;
    constructor(buf: ESMBuffer) {
        super('EFID', buf, false);
        this.effectId = buf.readString(4);
    }
}
