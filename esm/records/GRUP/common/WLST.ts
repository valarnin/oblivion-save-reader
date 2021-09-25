import { formid, int32 } from "../../../types";
import { ESMBuffer } from "../../../util";
import { Subrecord } from "./Subrecord";

export type WLST_Entry = {
    formId: formid;
    chance: int32;
};

export class WLST extends Subrecord {
    public readonly weatherList: WLST_Entry[] = [];
    public readonly weatherListCount: number;
    constructor(buf: ESMBuffer) {
        super('WLST', buf, false);
        this.weatherListCount = this.subrecordDataLength / 8;
        for (let i = 0; i < this.weatherListCount; ++i) {
            this.weatherList.push({
                formId: buf.readUInt(),
                chance: buf.readUInt(),
            });
        }
    }
}
