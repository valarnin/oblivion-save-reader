import GRUP from "./records/GRUP";
import TES4 from "./records/TES4";
import { ESMBuffer } from "./util";

export default class ESM {
    public header?: TES4;
    public groups: GRUP[] = [];
    private buf?: ESMBuffer;
    constructor(arrayBuf: ArrayBuffer) {
        this.buf = new ESMBuffer(arrayBuf);
    }
    public init(include?: string[]): ESM {
        if (!this.buf) {
            return this;
        }
        this.header = new TES4(this.buf);
        this.buf.trim(true);
        let i = 0;
        while (this.buf.buffer.byteLength > 4) {
            try {
                this.groups.push(new GRUP(this.buf.readString(4), this.buf, include));
                this.buf.trim(true);
            } catch (e) {
                console.log(e);
                break
            }
        }
        delete this.buf;
        return this;
    }
}