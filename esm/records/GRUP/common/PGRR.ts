import { float, ubyte, ushort } from "../../../types";
import { ESMBuffer } from "../../../util";
import { Subrecord } from "./Subrecord";

export type PGRR_Entry = {
    start: ushort;
    end: ushort;
};

export class PGRR extends Subrecord {
    public readonly pathGroupConnectors: PGRR_Entry[] = [];
    public readonly pathGroupConnectorCount: number;
    public readonly extraNode?: number;
    constructor(buf: ESMBuffer) {
        super('PGRR', buf, false);
        this.pathGroupConnectorCount = this.subrecordDataLength / 4;
        let extra = false;
        if (this.subrecordDataLength % 4 !== 0) {
            extra = true;
            this.pathGroupConnectorCount = Math.floor(this.pathGroupConnectorCount);
        }
        for (let i = 0; i < this.pathGroupConnectorCount; ++i) {
            this.pathGroupConnectors.push({
                start: buf.readUShort(),
                end: buf.readUShort(),
            });
        }
        if (extra) {
            this.extraNode = buf.readUShort();
        }
    }
}
