import { float, ubyte } from "../../../types";
import { ESMBuffer } from "../../../util";
import { Subrecord } from "./Subrecord";

export type PGRP_Entry = {
    x: float;
    y: float;
    z: float;
    flags: ubyte;
    filler: ubyte[];
};

export class PGRP extends Subrecord {
    public readonly pathGroups: PGRP_Entry[] = [];
    public readonly pathGroupCount: number;
    constructor(buf: ESMBuffer) {
        super('PGRP', buf, false);
        this.pathGroupCount = this.subrecordDataLength / 16;
        for (let i = 0; i < this.pathGroupCount; ++i) {
            this.pathGroups.push({
                x: buf.readFloat(),
                y: buf.readFloat(),
                z: buf.readFloat(),
                flags: buf.readUByte(),
                filler: buf.readUByteArray(3),
            });
        }
    }
}
