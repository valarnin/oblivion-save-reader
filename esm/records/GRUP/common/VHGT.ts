import { float, formid, int32, ubyte } from "../../../types";
import { ESMBuffer } from "../../../util";
import { Subrecord } from "./Subrecord";

export class VHGT extends Subrecord {
    public readonly offset: float;
    public readonly heightmap: ubyte[][] = [];
    public readonly unknown: ubyte[];
    constructor(buf: ESMBuffer) {
        super('VHGT', buf, false);
        this.offset = buf.readFloat();
        // Starts from bottom-left?
        for (let x = 0; x < 33; ++x) {
            const row = [];
            for (let y = 0; y < 33; ++y) {
                row.push(buf.readUByte());
            }
            this.heightmap.push(row);
        }
        this.unknown = buf.readUByteArray(3);
    }
}
