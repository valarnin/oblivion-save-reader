import { formid, ushort } from "../../types";
import { ESMBuffer } from "../../util";


export class DELE {
    public readonly subrecordDataLength: ushort;
    public readonly deletedFormIdsLength: number;
    public readonly deletedFormIds: formid[] = [];
    public readonly totalLength: number;
    constructor(buf: ESMBuffer) {
        this.subrecordDataLength = buf.readUShort();
        this.totalLength = 6 + this.subrecordDataLength;
        this.deletedFormIdsLength = this.subrecordDataLength / 4;
        for (let i = 0; i < this.deletedFormIdsLength; ++i) {
            this.deletedFormIds.push(buf.readUInt());
        }
    }
}
