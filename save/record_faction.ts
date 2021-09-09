import Record from "./record";
import { bufToByte, bufToInt, bufToShort } from "./util";

type Reaction = {
    unknown1: number;
    unknown2: number;
};

export class RecordFaction {
    reactionsNum?: number;
    reactions: Reaction[] = [];
    flags?: number;
    constructor(record: Record, buf: ArrayBuffer, offset: number) {
        if (record.flags & 0x8) {
            this.reactionsNum = bufToShort(buf.slice(offset, offset + 2));
            offset += 2;
            for (let i = 0; i < this.reactionsNum; ++i) {
                let u1 = bufToInt(buf.slice(offset, offset + 4));
                offset += 4;
                let u2 = bufToInt(buf.slice(offset, offset + 4));
                offset += 4;
                this.reactions.push({
                    unknown1: u1,
                    unknown2: u2,
                });
            }
        }
        if (record.flags & 0x4) {
            this.flags = bufToByte(buf.slice(offset, offset + 1));
            offset += 1;
        }
    }
}