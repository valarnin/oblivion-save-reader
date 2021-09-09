import Record from "./record";

export class RecordAI {
    neverRun: boolean;

    constructor(record: Record, buf: ArrayBuffer, offset: number) {
        this.neverRun = (record.flags & 0x10000000) === 0x10000000;
    }
}