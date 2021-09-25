import { szstring } from "../../../types";
import { ESMBuffer } from "../../../util";
import { Subrecord } from "./Subrecord";

export class KFFZ extends Subrecord {
    public readonly optionalAnimationFilenames: string[];
    constructor(buf: ESMBuffer) {
        super('KFFZ', buf, false);
        // One extra null byte at the end of this subrecord
        this.optionalAnimationFilenames = buf.readString(this.subrecordDataLength).replace(/\0+$/, '').split('\0');
    }
}
