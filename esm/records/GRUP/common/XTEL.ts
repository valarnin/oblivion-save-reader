import { formid, float } from "../../../types";
import { ESMBuffer } from "../../../util";
import { Subrecord } from "./Subrecord";

export class XTEL extends Subrecord {
    public readonly destinationDoor: formid;
    public readonly x: float;
    public readonly y: float;
    public readonly z: float;
    public readonly rx: float;
    public readonly ry: float;
    public readonly rz: float;
    constructor(buf: ESMBuffer) {
        super('XTEL', buf, false);
        this.destinationDoor = buf.readUInt();
        this.x = buf.readFloat();
        this.y = buf.readFloat();
        this.z = buf.readFloat();
        this.rx = buf.readFloat();
        this.ry = buf.readFloat();
        this.rz = buf.readFloat();
    }
}
