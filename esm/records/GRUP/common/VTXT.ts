import { float, formid, int32, ubyte, ushort } from "../../../types";
import { ESMBuffer } from "../../../util";
import { Subrecord } from "./Subrecord";

export type VTXT_Entry = {
    position: ushort;
    unknown1: ubyte;
    unknown2: ubyte;
    opacity: float;
};

export class VTXT extends Subrecord {
    public readonly vertexTextures: VTXT_Entry[] = [];
    public readonly vertexTextureCount: number;
    constructor(buf: ESMBuffer) {
        super('VTXT', buf, false);
        this.vertexTextureCount = this.subrecordDataLength / 8;
        for (let i = 0; i < this.vertexTextureCount; ++i) {
            this.vertexTextures.push({
                position: buf.readUShort(),
                unknown1: buf.readUByte(),
                unknown2: buf.readUByte(),
                opacity: buf.readFloat(),
            });
        }
    }
}
