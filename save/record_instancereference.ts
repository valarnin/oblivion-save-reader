import { InventoryItem } from "./inventoryitem";
import getProps, { Property, PropertyCollection } from "./properties";
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
    inventory_items: InventoryItem[] = [];
    havokMoved_dataLen?: number;
    havokMoved_data: number[] = [];
    scale?: number;
    enabled?: boolean;
    propertiesNum?: number;
    properties: Property[] = [];

    constructor(record: Record, buf: SaveBuffer) {
        const startOffset = buf.offset;
        const maxOffset = startOffset + record.dataSize;
        try {
            const startOffset = buf.offset;
            if (record.flags & 0x80000000) {
                this.cellChanged_cell = buf.readInt(maxOffset);
                this.cellChanged_x = buf.readFloat(maxOffset);
                this.cellChanged_y = buf.readFloat(maxOffset);
                this.cellChanged_z = buf.readFloat(maxOffset);
            }
            if (record.flags & 0x2) {
                this.created_flags = buf.readInt(maxOffset);
                this.created_baseItem = buf.readInt(maxOffset);
                this.created_cell = buf.readInt(maxOffset);
                this.created_x = buf.readFloat(maxOffset);
                this.created_y = buf.readFloat(maxOffset);
                this.created_z = buf.readFloat(maxOffset);
                this.created_rX = buf.readFloat(maxOffset);
                this.created_rY = buf.readFloat(maxOffset);
                this.created_rZ = buf.readFloat(maxOffset);
            }
            if (record.flags & 0x4) {
                this.moved_cell = buf.readInt(maxOffset);
                if (this.moved_cell === 0 && record.dataSize <= 5) {
                    this.actorFlag = buf.readByte(maxOffset);
                    return;
                }
                this.moved_x = buf.readFloat(maxOffset);
                this.moved_y = buf.readFloat(maxOffset);
                this.moved_z = buf.readFloat(maxOffset);
                this.moved_rX = buf.readFloat(maxOffset);
                this.moved_rY = buf.readFloat(maxOffset);
                this.moved_rZ = buf.readFloat(maxOffset);
            }
            if (record.flags & 0x8 && !(record.flags & 0x2 || record.flags & 0x4)) {
                this.havokMoved_cell = buf.readInt(maxOffset);
                this.havokMoved_x = buf.readFloat(maxOffset);
                this.havokMoved_y = buf.readFloat(maxOffset);
                this.havokMoved_z = buf.readFloat(maxOffset);
                this.havokMoved_rX = buf.readFloat(maxOffset);
                this.havokMoved_rY = buf.readFloat(maxOffset);
                this.havokMoved_rZ = buf.readFloat(maxOffset);
            }
            if (record.flags & 0x800000 && !(record.flags & 0x2 || record.flags & 0x4 || record.flags & 0x8)) {
                this.oblivionCell = buf.readInt(maxOffset);
            }
            if (record.flags & 0x1) {
                this.flags = buf.readInt(maxOffset);
            }
            if (record.flags & 0x8000000) {
                this.inventory_itemNum = buf.readShort(maxOffset);
                for (let i = 0; i < this.inventory_itemNum; ++i) {
                    if (buf.offset - startOffset > record.dataSize) {/* console.log('Invalid object', record, this); */ return;}
                    let iref = buf.readInt(maxOffset);
                    let stackedItemsNum = buf.readInt(maxOffset);
                    let changedEntriesNum = buf.readInt(maxOffset);
                    let changedEntries: PropertyCollection[] = [];
                    for (let j = 0; j < changedEntriesNum; ++j) {
                        if (buf.offset - startOffset > record.dataSize) {/* console.log('Invalid object', record, this); */ return;}
                        changedEntries.push(getProps(buf, startOffset + record.dataSize));
                    }
                    this.inventory_items.push({
                        iref: iref,
                        stackedItemsNum: stackedItemsNum,
                        changedEntriesNum: changedEntriesNum,
                        changedEntries: changedEntries,
                    });
                }
            }
            if (record.flags & 0x173004e0) {
                if (buf.offset - startOffset > record.dataSize) {/* console.log('Invalid object', record, this); */ return;}
                let props = getProps(buf, startOffset + record.dataSize);
                this.propertiesNum = props.propertiesNum;
                this.properties = props.properties;
            }
            if (record.flags & 0x8 && !(record.flags & 0x2 || record.flags & 0x4)) {
                this.havokMoved_dataLen = buf.readShort(maxOffset);
                this.havokMoved_data = buf.readByteArray(this.havokMoved_dataLen, maxOffset);
            }
            if (record.flags & 0x10) {
                this.scale = buf.readFloat(maxOffset);
            }
            this.enabled = (record.flags & 0x40000000) === 0x40000000;
        } catch (e) {
            console.log(e);
        }
        if (buf.buffer.byteLength !== buf.offset) {
            // Too many issues decoding these still
            //debugger;
        }
    }
}
