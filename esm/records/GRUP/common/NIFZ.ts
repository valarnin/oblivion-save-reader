import { formid, int32, szstring } from "../../../types";
import { ESMBuffer } from "../../../util";
import { Subrecord } from "./Subrecord";

export class NIFZ extends Subrecord {
    public readonly nifFilenames: szstring[] = [];
    constructor(buf: ESMBuffer) {
        super('NIFZ', buf, false);
        // One extra null byte at the end of this subrecord
        this.nifFilenames = buf.readString(this.subrecordDataLength).replace(/\0+$/, '').split('\0');
    }
}
