import getProps from "./properties";
import Record from "./record";
import { SaveBuffer } from "./util";

export class RecordInstanceReference {
    cellChanged_cell?: number;
    cellChanged_x?: number;
    cellChanged_y?: number;
    cellChanged_z?: number;

    created_flags?: number;
    created_baseItem?: number;
    created_cell?: number;
    created_x?: number;
    created_y?: number;
    created_z?: number;
    created_rX?: number;
    created_rY?: number;
    created_rZ?: number;

    moved_cell?: number;
    moved_x?: number;
    moved_y?: number;
    moved_z?: number;
    moved_rX?: number;
    moved_rY?: number;
    moved_rZ?: number;

    havokMoved_cell?: number;
    havokMoved_x?: number;
    havokMoved_y?: number;
    havokMoved_z?: number;
    havokMoved_rX?: number;
    havokMoved_rY?: number;
    havokMoved_rZ?: number;

    oblivionCell?: number;

    actorFlag?: number;

    flags?: number;
    inventory_itemNum?: number;
    inventory_items: {
        iref: number,
        stackedItemsNum: number,
        changedEntriesNum: number,
        changedEntries: {
            propertiesNum: number;
            properties: {
                flag: number;
                // @TODO: More strict typing here?
                value: any;
            }[];
        }[];
    }[] = [];
    havokMoved_dataLen?: number;
    havokMoved_data: number[] = [];
    scale?: number;
    enabled?: boolean;
    propertiesNum?: number;
    properties: {
        flag: number;
        // @TODO: More strict typing here?
        value: any;
    }[] = [];

    constructor(record: Record, buf: SaveBuffer) {
        try {
            const startOffset = buf.offset;
            if (record.flags & 0x80000000) {
                this.cellChanged_cell = buf.readInt();
                this.cellChanged_x = buf.readFloat();
                this.cellChanged_y = buf.readFloat();
                this.cellChanged_z = buf.readFloat();
            }
            if (buf.offset - startOffset > record.dataSize) {/* console.log('Invalid object', record, this); */ return;}
            if (record.flags & 0x2) {
                this.created_flags = buf.readInt();
                this.created_baseItem = buf.readInt();
                this.created_cell = buf.readInt();
                this.created_x = buf.readFloat();
                this.created_y = buf.readFloat();
                this.created_z = buf.readFloat();
                this.created_rX = buf.readFloat();
                this.created_rY = buf.readFloat();
                this.created_rZ = buf.readFloat();
            }
            if (buf.offset - startOffset > record.dataSize) {/* console.log('Invalid object', record, this); */ return;}
            if (record.flags & 0x4) {
                this.moved_cell = buf.readInt();
                if (this.moved_cell === 0 && record.dataSize <= 5) {
                    this.actorFlag = buf.readByte();
                    return;
                }
                this.moved_x = buf.readFloat();
                this.moved_y = buf.readFloat();
                this.moved_z = buf.readFloat();
                this.moved_rX = buf.readFloat();
                this.moved_rY = buf.readFloat();
                this.moved_rZ = buf.readFloat();
            }
            if (buf.offset - startOffset > record.dataSize) {/* console.log('Invalid object', record, this); */ return;}
            if (record.flags & 0x8 && !(record.flags & 0x2 || record.flags & 0x4)) {
                this.havokMoved_cell = buf.readInt();
                this.havokMoved_x = buf.readFloat();
                this.havokMoved_y = buf.readFloat();
                this.havokMoved_z = buf.readFloat();
                this.havokMoved_rX = buf.readFloat();
                this.havokMoved_rY = buf.readFloat();
                this.havokMoved_rZ = buf.readFloat();
            }
            if (buf.offset - startOffset > record.dataSize) {/* console.log('Invalid object', record, this); */ return;}
            if (record.flags & 0x800000) {
                this.oblivionCell = buf.readInt();
            }
            if (buf.offset - startOffset > record.dataSize) {/* console.log('Invalid object', record, this); */ return;}
            if (record.flags & 0x1) {
                this.flags = buf.readInt();
            }
            if (buf.offset - startOffset > record.dataSize) {/* console.log('Invalid object', record, this); */ return;}
            if (record.flags & 0x8000000) {
                this.inventory_itemNum = buf.readShort();
                for (let i = 0; i < this.inventory_itemNum; ++i) {
                    if (buf.offset - startOffset > record.dataSize) {/* console.log('Invalid object', record, this); */ return;}
                    let iref = buf.readInt();
                    let stackedItemsNum = buf.readInt();
                    let changedEntriesNum = buf.readInt();
                    let changedEntries: {
                        propertiesNum: number;
                        properties: {
                            flag: number;
                            // @TODO: More strict typing here?
                            value: any;
                        }[];
                    }[] = [];
                    for (let j = 0; j < changedEntriesNum; ++j) {
                        if (buf.offset - startOffset > record.dataSize) {/* console.log('Invalid object', record, this); */ return;}
                        let props = getProps(buf, startOffset + record.dataSize);
                        changedEntries.push({
                            propertiesNum: props[0],
                            properties: props[1],
                        });
                    }
                    this.inventory_items.push({
                        iref: iref,
                        stackedItemsNum: stackedItemsNum,
                        changedEntriesNum: changedEntriesNum,
                        changedEntries: changedEntries,
                    });
                }
            }
            if (buf.offset - startOffset > record.dataSize) {/* console.log('Invalid object', record, this); */ return;}
            [this.propertiesNum, this.properties] = getProps(buf, startOffset + record.dataSize);
            if (buf.offset - startOffset > record.dataSize) {/* console.log('Invalid object', record, this); */ return;}
            if (record.flags & 0x8) {
                this.havokMoved_dataLen = buf.readShort();
                this.havokMoved_data = buf.readByteArray(this.havokMoved_dataLen);
            }
            if (buf.offset - startOffset > record.dataSize) {/* console.log('Invalid object', record, this); */ return;}
            if (record.flags & 0x10) {
                this.scale = buf.readFloat();
            }
            if (buf.offset - startOffset > record.dataSize) {/* console.log('Invalid object', record, this); */ return;}
            this.enabled = (record.flags & 0x40000000) === 0x40000000;
            if (buf.offset - startOffset > record.dataSize) {/* console.log('Invalid object', record, this); */ return;}
        } catch (e) {
            console.log(e);
        }
    }
}
