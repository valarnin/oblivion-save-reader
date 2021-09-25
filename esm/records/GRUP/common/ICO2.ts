import { ESMBuffer } from "../../../util";
import { Subrecord } from "./Subrecord";

export class ICO2 extends Subrecord {
    public readonly iconFilename: string;
    constructor(buf: ESMBuffer) {
        super('ICO2', buf, true);
        this.iconFilename = buf.readszString();
    }
}
