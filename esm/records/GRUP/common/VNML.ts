import { formid, int32, ubyte } from "../../../types";
import { ESMBuffer } from "../../../util";
import { Subrecord } from "./Subrecord";

export type VNML_Entry = {
    x: ubyte;
    y: ubyte;
    z: ubyte;
};

export class VNML extends Subrecord {
    public readonly vertexes: VNML_Entry[][] = [];
    constructor(buf: ESMBuffer) {
        super('VNML', buf, false);
        // Starts from bottom-left?
        for (let x = 0; x < 33; ++x) {
            const row = [];
            for (let y = 0; y < 33; ++y) {
                row.push({
                    x: buf.readUByte(),
                    y: buf.readUByte(),
                    z: buf.readUByte(),
                });
            }
            this.vertexes.push(row);
        }
    }
}
