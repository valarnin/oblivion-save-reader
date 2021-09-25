import { formid, uint32 } from "../../../types";
import { ESMBuffer } from "../../../util";
import { Subrecord } from "./Subrecord";

export class XMRK extends Subrecord {
    constructor(buf: ESMBuffer) {
        super('XMRK', buf, false);
    }
}
