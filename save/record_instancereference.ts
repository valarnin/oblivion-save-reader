import Record from "./record";
import { bufToArray, bufTobString, bufToByte, bufTobzString, bufToDouble, bufToFloat, bufToInt, bufToShort, bufToString } from "./util";

export class RecordInstanceReference {
    cellChanged_cell?: number;
    cellChanged_x?: number;

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
                this.cellChanged_x = bufToFloat(buf.slice(offset, offset + 4));
                offset += 4;
                this.cellChanged_x = bufToFloat(buf.slice(offset, offset + 4));
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
            if (record.flags & 0x8) {
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

let getProps = (offset: number, buf: ArrayBuffer, endOffset: number): [number, {
    propertiesNum: number,
    properties: {
        flag: number;
        // @TODO: More strict typing here?
        value: any;
    }[],
}] => {
    let propertiesNum = bufToShort(buf.slice(offset, offset + 2));
    offset += 2;
    let properties: {
        flag: number;
        // @TODO: More strict typing here?
        value: any;
    }[] = [];
    if (offset > endOffset) {/* console.log('Invalid object props', propertiesNum, offset, endOffset); */ return [offset, {propertiesNum, properties}];}
    for (let k = 0; k < propertiesNum; ++k) {
        let flag = bufToByte(buf.slice(offset, offset + 1));
        offset += 1;
        if (offset > endOffset) {/* console.log('Invalid object props', propertiesNum, offset, endOffset); */ return [offset, {propertiesNum, properties}];}
        let value: any = undefined;
        // This is ugly
        switch(flag) {
            case 0x11:
                value = bufToInt(buf.slice(offset, offset + 4));
                offset += 4;
                break;
            case 0x12:
                value = {};
                value.scriptref = bufToInt(buf.slice(offset, offset + 4));
                offset += 4;
                value.varNum = bufToShort(buf.slice(offset, offset + 2));
                offset += 2;
                value.variables = [];
                for (let l = 0; l < value.varNum; ++l) {
                    let _var: any = {};
                    _var.varIndex = bufToShort(buf.slice(offset, offset + 2));
                    offset += 2;
                    _var.varType = bufToShort(buf.slice(offset, offset + 2));
                    offset += 2;
                    if (_var.varType === 0xF000) {
                        _var.refVar = bufToInt(buf.slice(offset, offset + 4));
                        offset += 4;
                    }
                    if (_var.varType === 0) {
                        _var.refVar = bufToDouble(buf.slice(offset, offset + 8));
                        offset += 8;
                    }
                    value.variables.push(_var);
                }
                value.unknown = bufToByte(buf.slice(offset, offset + 1));
                offset += 1;
                break;
            case 0x1b:
                value = 1;
                break;
            case 0x1c:
                value = 1;
                break;
            case 0x1e:
                value = {};
                value.cell = bufToInt(buf.slice(offset, offset + 4));
                offset += 4;
                value.x = bufToFloat(buf.slice(offset, offset + 4));
                offset += 4;
                value.y = bufToFloat(buf.slice(offset, offset + 4));
                offset += 4;
                value.z = bufToFloat(buf.slice(offset, offset + 4));
                offset += 4;
                value.flags = bufToInt(buf.slice(offset, offset + 4));
                offset += 4;
                break;
            case 0x1f:
                value = {};
                value.package = bufToInt(buf.slice(offset, offset + 4));
                offset += 4;
                value.flags = bufToInt(buf.slice(offset, offset + 4));
                offset += 4;
                value.package2 = bufToInt(buf.slice(offset, offset + 4));
                offset += 4;
                value.unknown = bufToShort(buf.slice(offset, offset + 2));
                offset += 2;
                break;
            case 0x20:
                value = {};
                value.formId = bufToInt(buf.slice(offset, offset + 4));
                offset += 4;
                value.data = bufToArray(buf.slice(offset, offset + 59));
                offset += 59;
                break;
            case 0x21:
                value = {};
                value.dataNum = bufToShort(buf.slice(offset, offset + 2));
                offset += 2;
                value.data = [];
                for (let l = 0; l < value.dataNum; ++l) {
                    let data: any = {};
                    data.iref = bufToInt(buf.slice(offset, offset + 4));
                    offset += 4;
                    data.unknown = bufToByte(buf.slice(offset, offset + 1));
                    offset += 1;
                    value.data.push(data);
                }
                break;
            case 0x22:
                value = bufToInt(buf.slice(offset, offset + 4));
                offset += 4;
                break;
            case 0x23:
                value = {};
                value.dataNum = bufToShort(buf.slice(offset, offset + 2));
                offset += 2;
                value.data = [];
                for (let l = 0; l < value.dataNum; ++l) {
                    value.data.push(bufToInt(buf.slice(offset, offset + 4)));
                    offset += 4;
                }
                break;
            case 0x25:
                value = 1;
                break;
            case 0x27:
                value = bufToInt(buf.slice(offset, offset + 4));
                offset += 4;
                break;
            case 0x28:
                value = bufToInt(buf.slice(offset, offset + 4));
                offset += 4;
                break;
            case 0x29:
                value = bufToInt(buf.slice(offset, offset + 4));
                offset += 4;
                break;
            case 0x2a:
                value = bufToShort(buf.slice(offset, offset + 2));
                offset += 2;
                break;
            case 0x2b:
                value = bufToFloat(buf.slice(offset, offset + 4));
                offset += 4;
                break;
            case 0x2c:
                value = bufToByte(buf.slice(offset, offset + 1));
                offset += 1;
                break;
            case 0x2d:
                value = bufToFloat(buf.slice(offset, offset + 4));
                offset += 4;
                break;
            case 0x2e:
                value = bufToFloat(buf.slice(offset, offset + 4));
                offset += 4;
                break;
            case 0x2f:
                value = bufToByte(buf.slice(offset, offset + 1));
                offset += 1;
                break;
            case 0x31:
                value = {};
                value.lockLevel = bufToByte(buf.slice(offset, offset + 1));
                offset += 1;
                value.key = bufToInt(buf.slice(offset, offset + 4));
                offset += 4;
                value.flag = bufToByte(buf.slice(offset, offset + 1));
                offset += 1;
                break;
            case 0x32:
                value = {};
                value.x = bufToFloat(buf.slice(offset, offset + 4));
                offset += 4;
                value.y = bufToFloat(buf.slice(offset, offset + 4));
                offset += 4;
                value.z = bufToFloat(buf.slice(offset, offset + 4));
                offset += 4;
                value.rX = bufToFloat(buf.slice(offset, offset + 4));
                offset += 4;
                value.rY = bufToFloat(buf.slice(offset, offset + 4));
                offset += 4;
                value.rZ = bufToFloat(buf.slice(offset, offset + 4));
                offset += 4;
                value.destDoor = bufToInt(buf.slice(offset, offset + 4));
                offset += 4;
                break;
            case 0x33:
                value = bufToByte(buf.slice(offset, offset + 1));
                offset += 1;
                break;
            case 0x35:
                // ?????
                //debugger;
                break;
            case 0x36:
                value = bufToArray(buf.slice(offset, offset + 5));
                offset += 5;
                break;
            case 0x37:
                value = bufToFloat(buf.slice(offset, offset + 4));
                offset += 4;
                break;
            case 0x39:
                value = bufToArray(buf.slice(offset, offset + 12));
                offset += 12;
                break;
            case 0x3a:
                value = {};
                value.iref = bufToInt(buf.slice(offset, offset + 4));
                offset += 4;
                value.dataNum = bufToShort(buf.slice(offset, offset + 2));
                offset += 2;
                value.data = [];
                for (let i = 0; i < value.dataNum; ++i) {
                    value.data.push(bufToArray(buf.slice(offset, offset + 61)));
                    offset += 61;
                }
                break;
            case 0x3c:
                value = bufToInt(buf.slice(offset, offset + 4));
                offset += 4;
                break;
            case 0x3d:
                value = bufToFloat(buf.slice(offset, offset + 4));
                offset += 4;
                break;
            case 0x3e:
                value = {};
                value.door = bufToInt(buf.slice(offset, offset + 4));
                offset += 4;
                value.x = bufToFloat(buf.slice(offset, offset + 4));
                offset += 4;
                value.y = bufToFloat(buf.slice(offset, offset + 4));
                offset += 4;
                value.z = bufToFloat(buf.slice(offset, offset + 4));
                offset += 4;
                break;
            case 0x41:
                value = bufToFloat(buf.slice(offset, offset + 4));
                offset += 4;
                break;
            case 0x47:
                value = 1;
                break;
            case 0x48:
                value = bufToInt(buf.slice(offset, offset + 4));
                offset += 4;
                break;
            case 0x4a:
                let len = bufToByte(buf.slice(offset, offset + 1));
                value = bufTobString(buf.slice(offset, offset + len));
                offset += len + 1;
                break;
            case 0x4b:
                value = {};
                value.unknown = bufToInt(buf.slice(offset, offset + 4));
                offset += 4;
                value.dataNum = bufToShort(buf.slice(offset, offset + 2));
                offset += 2;
                value.data = bufToArray(buf.slice(offset, offset + value.dataNum));
                offset += value.dataNum;
                if (k + 1 === propertiesNum) {
                    value.unknown2 = bufToArray(buf.slice(offset, offset + 2));
                    offset += 2;
                } else {
                    value.unknown2 = [];
                }
                break;
            case 0x4e:
                value = {};
                value.dataNum = bufToShort(buf.slice(offset, offset + 2));
                offset += 2;
                value.data = [];
                for (let i = 0; i < value.dataNum; ++i) {
                    value.data.push(bufToArray(buf.slice(offset, offset + 10)));
                    offset += 10;
                }
                break;
            case 0x4f:
                value = bufToArray(buf.slice(offset, offset + 4));
                offset += 4;
                break;
            case 0x50:
                value = 1;
                break;
            case 0x52:
                value = bufToInt(buf.slice(offset, offset + 4));
                offset += 4;
                break;
            case 0x53:
                value = bufToInt(buf.slice(offset, offset + 4));
                offset += 4;
                break;
            case 0x55:
                value = bufToByte(buf.slice(offset, offset + 1));
                offset += 1;
                break;
            case 0x59:
                value = {};
                let convTopicLen = bufToByte(buf.slice(offset, offset + 1));
                value.convTopic = bufTobzString(buf.slice(offset, offset + convTopicLen + 1));
                offset += convTopicLen + 1;
                value.convNum = bufToShort(buf.slice(offset, offset + 2));
                offset += 2;
                value.conv = [];
                for (let l = 0; l < value.convNum; ++l) {
                    let conv: any = {};
                    conv.index = bufToByte(buf.slice(offset, offset + 1));
                    offset += 1;
                    conv.convQuest = bufToInt(buf.slice(offset, offset + 4));
                    offset += 4;
                    conv.convDialog = bufToInt(buf.slice(offset, offset + 4));
                    offset += 4;
                    conv.convInfo = bufToInt(buf.slice(offset, offset + 4));
                    offset += 4;
                    value.conv.push(conv);
                }
                break;
            case 0x5a:
                value = bufToByte(buf.slice(offset, offset + 1));
                offset += 1;
                break;
            case 0x5c:
                value = bufToFloat(buf.slice(offset, offset + 4));
                offset += 4;
                break;
        }
        properties.push({
            flag: flag,
            value: value,
        });
        if (offset > endOffset) {/* console.log('Invalid object props', propertiesNum, offset, endOffset); */ return [offset, {propertiesNum, properties}];}
    }

    return [offset, {
        propertiesNum: propertiesNum,
        properties: properties,
    }];
}
