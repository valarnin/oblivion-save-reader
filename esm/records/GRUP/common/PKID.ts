import { formid } from "../../../types";
import { ESMBuffer } from "../../../util";
import { Subrecord } from "./Subrecord";

export class PKID extends Subrecord {
    public readonly aiPackage: formid;
    constructor(buf: ESMBuffer) {
        super('PKID', buf, false);
        this.aiPackage = buf.readUInt();
    }
}
