import Record from "./record";

export class RecordDialog {
    topicSaidOnce: boolean;

    constructor(record: Record, buf: ArrayBuffer, offset: number) {
        this.topicSaidOnce = (record.flags & 0x10000000) === 0x10000000;
    }
}