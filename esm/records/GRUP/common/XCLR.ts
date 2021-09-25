import { formid } from "../../../types";
import { ESMBuffer } from "../../../util";
import { Subrecord } from "./Subrecord";

export class XCLR extends Subrecord {
    public readonly regions: formid[] = [];
    public readonly regionsLength: number;
    constructor(buf: ESMBuffer) {
        super('XCLR', buf, false);
        this.regionsLength = this.subrecordDataLength / 4;
        for (let i = 0; i < this.regionsLength; ++i) {
            this.regions.push(buf.readUInt());
        }
    }
}
