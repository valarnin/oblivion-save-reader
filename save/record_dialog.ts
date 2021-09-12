import Record from "./record";
import { SaveBuffer } from "./util";

export class RecordDialog {
    topicSaidOnce: boolean;

    constructor(record: Record, buf: SaveBuffer) {
        this.topicSaidOnce = (record.flags & 0x10000000) === 0x10000000;
    }
}