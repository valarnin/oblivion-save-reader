import { bufToShort, bufToByte, bufToInt, bufToDouble, bufToFloat, bufToArray, bufTobString, bufTobzString } from "./util";

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
                    if (offset > endOffset) {/* console.log('Invalid object props', propertiesNum, offset, endOffset); */ return [offset, {propertiesNum, properties}];}
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
                    if (offset > endOffset) {/* console.log('Invalid object props', propertiesNum, offset, endOffset); */ return [offset, {propertiesNum, properties}];}
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
                    if (offset > endOffset) {/* console.log('Invalid object props', propertiesNum, offset, endOffset); */ return [offset, {propertiesNum, properties}];}
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
                    if (offset > endOffset) {/* console.log('Invalid object props', propertiesNum, offset, endOffset); */ return [offset, {propertiesNum, properties}];}
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
                    if (offset > endOffset) {/* console.log('Invalid object props', propertiesNum, offset, endOffset); */ return [offset, {propertiesNum, properties}];}
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
                value.convTopic = bufTobString(buf.slice(offset, offset + convTopicLen + 1));
                offset += convTopicLen + 1;
                value.unknown = bufToByte(buf.slice(offset, offset + 1));
                offset += 1;
                value.convNum = bufToByte(buf.slice(offset, offset + 1));
                offset += 1;
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
                    if (offset > endOffset) {/* console.log('Invalid object props', propertiesNum, offset, endOffset); */ return [offset, {propertiesNum, properties}];}
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
};

export default getProps;
