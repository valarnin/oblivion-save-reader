import Record from "./record";
import { SaveBuffer } from "./util";

type Reaction = {
    unknown1: number;
    unknown2: number;
};

export class RecordFaction {
    reactionsNum?: number;
    reactions: Reaction[] = [];
    flags?: number;
    constructor(record: Record, buf: SaveBuffer) {
        if (record.flags & 0x8) {
            this.reactionsNum = buf.readShort();
            for (let i = 0; i < this.reactionsNum; ++i) {
                let u1 = buf.readInt();
                let u2 = buf.readInt();
                this.reactions.push({
                    unknown1: u1,
                    unknown2: u2,
                });
            }
        }
        if (record.flags & 0x4) {
            this.flags = buf.readByte();
        }
        if (buf.buffer.byteLength !== buf.offset) {
            debugger;
        }
    }
}