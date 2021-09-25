import { formid, int32, ubyte, uint32 } from "../../../types";
import { ESMBuffer } from "../../../util";
import { Subrecord } from "./Subrecord";

export class EFIT extends Subrecord {
    public readonly effectId: string;
    public readonly effectMagnitude: int32;
    public readonly effectArea: int32;
    public readonly effectDuration: int32;
    public readonly effectType: int32;
    public readonly actorValueIndex: int32;
    constructor(buf: ESMBuffer) {
        super('EFIT', buf, false);
        this.effectId = buf.readString(4);
        this.effectMagnitude = buf.readInt();
        this.effectArea = buf.readInt();
        this.effectDuration = buf.readInt();
        this.effectType = buf.readInt();
        this.actorValueIndex = buf.readInt();
    }
}
