import { ESMBuffer } from "../../../util";
import { Subrecord } from "./Subrecord";

export class ICON extends Subrecord {
    public readonly iconFilename: string;
    constructor(buf: ESMBuffer) {
        super('ICON', buf, true);
        this.iconFilename = buf.readszString();
    }
}
