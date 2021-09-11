import getProps from "./properties";
import Record from "./record";
import { bufToArray, bufTobString, bufToByte, bufTobzString, bufToDouble, bufToFloat, bufToInt, bufToShort, bufToString } from "./util";

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

    constructor(record: Record, buf: ArrayBuffer, offset: number) {
        try {
            const startOffset = offset;
            if (record.flags & 0x80000000) {
                this.cellChanged_cell = bufToInt(buf.slice(offset, offset + 4));
                offset += 4;
                this.cellChanged_x = bufToFloat(buf.slice(offset, offset + 4));
                offset += 4;
                this.cellChanged_y = bufToFloat(buf.slice(offset, offset + 4));
                offset += 4;
                this.cellChanged_z = bufToFloat(buf.slice(offset, offset + 4));
                offset += 4;
            }
            if (offset - startOffset > record.dataSize) {/* console.log('Invalid object', record, this); */ return;}
            if (record.flags & 0x2) {
                this.created_flags = bufToInt(buf.slice(offset, offset + 4));
                offset += 4;
                this.created_baseItem = bufToInt(buf.slice(offset, offset + 4));
                offset += 4;
                this.created_cell = bufToInt(buf.slice(offset, offset + 4));
                offset += 4;
                this.created_x = bufToFloat(buf.slice(offset, offset + 4));
                offset += 4;
                this.created_y = bufToFloat(buf.slice(offset, offset + 4));
                offset += 4;
                this.created_z = bufToFloat(buf.slice(offset, offset + 4));
                offset += 4;
                this.created_rX = bufToFloat(buf.slice(offset, offset + 4));
                offset += 4;
                this.created_rY = bufToFloat(buf.slice(offset, offset + 4));
                offset += 4;
                this.created_rZ = bufToFloat(buf.slice(offset, offset + 4));
                offset += 4;
            }
            if (offset - startOffset > record.dataSize) {/* console.log('Invalid object', record, this); */ return;}
            if (record.flags & 0x4) {
                this.moved_cell = bufToInt(buf.slice(offset, offset + 4));
                offset += 4;
                if (this.moved_cell === 0 && record.dataSize <= 5) {
                    this.actorFlag = bufToByte(buf.slice(offset, offset + 1));
                    offset += 1;
                    return;
                }
                this.moved_x = bufToFloat(buf.slice(offset, offset + 4));
                offset += 4;
                this.moved_y = bufToFloat(buf.slice(offset, offset + 4));
                offset += 4;
                this.moved_z = bufToFloat(buf.slice(offset, offset + 4));
                offset += 4;
                this.moved_rX = bufToFloat(buf.slice(offset, offset + 4));
                offset += 4;
                this.moved_rY = bufToFloat(buf.slice(offset, offset + 4));
                offset += 4;
                this.moved_rZ = bufToFloat(buf.slice(offset, offset + 4));
                offset += 4;
            }
            if (offset - startOffset > record.dataSize) {/* console.log('Invalid object', record, this); */ return;}
            if (record.flags & 0x8 && !(record.flags & 0x2 || record.flags & 0x4)) {
                this.havokMoved_cell = bufToInt(buf.slice(offset, offset + 4));
                offset += 4;
                this.havokMoved_x = bufToFloat(buf.slice(offset, offset + 4));
                offset += 4;
                this.havokMoved_y = bufToFloat(buf.slice(offset, offset + 4));
                offset += 4;
                this.havokMoved_z = bufToFloat(buf.slice(offset, offset + 4));
                offset += 4;
                this.havokMoved_rX = bufToFloat(buf.slice(offset, offset + 4));
                offset += 4;
                this.havokMoved_rY = bufToFloat(buf.slice(offset, offset + 4));
                offset += 4;
                this.havokMoved_rZ = bufToFloat(buf.slice(offset, offset + 4));
                offset += 4;
            }
            if (offset - startOffset > record.dataSize) {/* console.log('Invalid object', record, this); */ return;}
            if (record.flags & 0x800000) {
                this.oblivionCell = bufToInt(buf.slice(offset, offset + 4));
                offset += 4;
            }
            if (offset - startOffset > record.dataSize) {/* console.log('Invalid object', record, this); */ return;}
            if (record.flags & 0x1) {
                this.flags = bufToInt(buf.slice(offset, offset + 4));
                offset += 4;
            }
            if (offset - startOffset > record.dataSize) {/* console.log('Invalid object', record, this); */ return;}
            if (record.flags & 0x8000000) {
                this.inventory_itemNum = bufToShort(buf.slice(offset, offset + 2));
                offset += 2;
                for (let i = 0; i < this.inventory_itemNum; ++i) {
                    if (offset - startOffset > record.dataSize) {/* console.log('Invalid object', record, this); */ return;}
                    let iref = bufToInt(buf.slice(offset, offset + 4));
                    offset += 4;
                    let stackedItemsNum = bufToInt(buf.slice(offset, offset + 4));
                    offset += 4;
                    let changedEntriesNum = bufToInt(buf.slice(offset, offset + 4));
                    offset += 4;
                    let changedEntries: {
                        propertiesNum: number;
                        properties: {
                            flag: number;
                            // @TODO: More strict typing here?
                            value: any;
                        }[];
                    }[] = [];
                    for (let j = 0; j < changedEntriesNum; ++j) {
                        if (offset - startOffset > record.dataSize) {/* console.log('Invalid object', record, this); */ return;}
                        let [newOffset, properties] = getProps(offset, buf, startOffset + record.dataSize);
                        offset = newOffset;
                        changedEntries.push(properties);
                    }
                    this.inventory_items.push({
                        iref: iref,
                        stackedItemsNum: stackedItemsNum,
                        changedEntriesNum: changedEntriesNum,
                        changedEntries: changedEntries,
                    });
                }
            }
            if (offset - startOffset > record.dataSize) {/* console.log('Invalid object', record, this); */ return;}
            let [newOffset, properties] = getProps(offset, buf, startOffset + record.dataSize);
            offset = newOffset;
            this.propertiesNum = properties.propertiesNum;
            this.properties = properties.properties;
            if (offset - startOffset > record.dataSize) {/* console.log('Invalid object', record, this); */ return;}
            if (record.flags & 0x8) {
                this.havokMoved_dataLen = bufToShort(buf.slice(offset, offset + 2));
                offset += 2;
                this.havokMoved_data = bufToArray(buf.slice(offset, offset + this.havokMoved_dataLen));
                offset += this.havokMoved_dataLen;
            }
            if (offset - startOffset > record.dataSize) {/* console.log('Invalid object', record, this); */ return;}
            if (record.flags & 0x10) {
                this.scale = bufToFloat(buf.slice(offset, offset + 4));
                offset += 4;
            }
            if (offset - startOffset > record.dataSize) {/* console.log('Invalid object', record, this); */ return;}
            this.enabled = (record.flags & 0x40000000) === 0x40000000;
            if (offset - startOffset > record.dataSize) {/* console.log('Invalid object', record, this); */ return;}
        } catch (e) {
            console.log(e);
        }
    }
}
