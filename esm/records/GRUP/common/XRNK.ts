import { formid } from "../../../types";
import { ESMBuffer } from "../../../util";
import { Subrecord } from "./Subrecord";

export class XRNK extends Subrecord {
    public readonly rank: formid;
    constructor(buf: ESMBuffer) {
        super('XRNK', buf, false);
        this.rank = buf.readUInt();
    }
}
