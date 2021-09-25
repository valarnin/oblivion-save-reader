import { float, formid, int32, ubyte, ushort } from "../../../types";
import { ESMBuffer } from "../../../util";
import { Subrecord } from "./Subrecord";

export class VTEX extends Subrecord {
    public readonly formids: formid[];
    public readonly formidCount: number;
    constructor(buf: ESMBuffer) {
        super('VTEX', buf, false);
        this.formidCount = this.subrecordDataLength / 4;
        this.formids = buf.readUIntArray(this.formidCount);
    }
}
