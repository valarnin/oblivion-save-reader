import { ubyte } from "../../../types";
import { ESMBuffer } from "../../../util";
import { Subrecord } from "./Subrecord";

export type VCLR_Entry = {
    r: ubyte;
    g: ubyte;
    b: ubyte;
};

export class VCLR extends Subrecord {
    public readonly vertexes: VCLR_Entry[][] = [];
    constructor(buf: ESMBuffer) {
        super('VCLR', buf, false);
        // Starts from bottom-left?
        for (let x = 0; x < 33; ++x) {
            const row = [];
            for (let y = 0; y < 33; ++y) {
                row.push({
                    r: buf.readUByte(),
                    g: buf.readUByte(),
                    b: buf.readUByte(),
                });
            }
            this.vertexes.push(row);
        }
    }
}
