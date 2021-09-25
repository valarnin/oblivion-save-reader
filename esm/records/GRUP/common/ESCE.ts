import { ESMBuffer } from "../../../util";
import { Subrecord } from "./Subrecord";

export class ESCE extends Subrecord {
    public readonly counterEffects: string[] = [];
    public readonly counterEffectCount: number;
    constructor(buf: ESMBuffer) {
        super('ESCE', buf, false);
        this.counterEffectCount = this.subrecordDataLength / 4;
        for (let i = 0; i < this.counterEffectCount; ++i) {
            this.counterEffects.push(buf.readString(4));
        }
    }
}
