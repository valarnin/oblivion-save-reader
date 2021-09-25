import { float, formid, ubyte, uint32, ushort } from "../../../types";
import { ESMBuffer } from "../../../util";
import { Subrecord } from "./Subrecord";

export class PGRL extends Subrecord {
    public readonly object: formid;
    public readonly nodeCount: number;
    public readonly nodes: uint32[];
    constructor(buf: ESMBuffer) {
        super('PGRL', buf, false);
        this.object = buf.readUInt();
        this.nodeCount = (this.subrecordDataLength / 4) - 1;
        this.nodes = buf.readUIntArray(this.nodeCount);
    }
}
