import { float, ubyte, uint32, ushort } from "../../../types";
import { ESMBuffer } from "../../../util";
import { Subrecord } from "./Subrecord";

export type PGRI_Entry = {
    node: uint32;
    x: float;
    y: float;
    z: float;
};

export class PGRI extends Subrecord {
    public readonly pathGroupRemoteNodes: PGRI_Entry[] = [];
    public readonly pathGroupRemoteNodeCount: number;
    constructor(buf: ESMBuffer) {
        super('PGRI', buf, false);
        this.pathGroupRemoteNodeCount = this.subrecordDataLength / 16;
        for (let i = 0; i < this.pathGroupRemoteNodeCount; ++i) {
            this.pathGroupRemoteNodes.push({
                node: buf.readUInt(),
                x: buf.readFloat(),
                y: buf.readFloat(),
                z: buf.readFloat(),
            });
        }
    }
}
