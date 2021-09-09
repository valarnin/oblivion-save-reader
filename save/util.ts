export function bufToString(buf: ArrayBuffer) {
    return String.fromCharCode(...new Uint8Array(buf));
}

export function bufToDate(buf: ArrayBuffer) {
    console.assert(buf.byteLength === 16, new Uint8Array(buf)); if (buf.byteLength !== 16) {throw new Error();}
    const wordBuf = new Uint16Array(buf);
    const wYear = wordBuf[0];
    const wMonth = wordBuf[1];
    const wDay = wordBuf[3];
    const wHour = wordBuf[4];
    const wMinute = wordBuf[5];
    const wSecond = wordBuf[6];
    const wMilliseconds = wordBuf[7];

    return new Date(wYear, wMonth, wDay, wHour, wMinute, wSecond, wMilliseconds);
}

export function bufToInt(buf: ArrayBuffer) {
    console.assert(buf.byteLength === 4, new Uint8Array(buf)); if (buf.byteLength !== 4) throw new Error();
    const intBuf = new Uint32Array(buf);
    return intBuf[0];
}

export function bufToShort(buf: ArrayBuffer) {
    console.assert(buf.byteLength === 2, new Uint8Array(buf)); if (buf.byteLength !== 2) {throw new Error();}
    const shortBuf = new Uint16Array(buf);
    return shortBuf[0];
}

export function bufToByte(buf: ArrayBuffer) {
    console.assert(buf.byteLength === 1, new Uint8Array(buf)); if (buf.byteLength !== 1) throw new Error();
    const byteBuf = new Uint8Array(buf);
    return byteBuf[0];
}

export function bufToFloat(buf: ArrayBuffer) {
    console.assert(buf.byteLength === 4, new Uint8Array(buf)); if (buf.byteLength !== 4) {throw new Error();}
    const shortBuf = new Float32Array(buf);
    return shortBuf[0];
}

export function bufToDouble(buf: ArrayBuffer) {
    console.assert(buf.byteLength === 8, new Uint8Array(buf)); if (buf.byteLength !== 8) {throw new Error();}
    const shortBuf = new Float64Array(buf);
    return shortBuf[0];
}

export function bufTobzString(buf: ArrayBuffer) {
    return bufToString(buf.slice(1, bufToByte(buf.slice(0, 1)))).split('\0')[0];
}

export function bufTobString(buf: ArrayBuffer) {
    return bufToString(buf.slice(1, bufToByte(buf.slice(0, 1)) + 1));
}

export function bufToBase64(buf: ArrayBuffer) {
    // Have to chunk this to 100,000 bytes at a time or else browser will complain about too many args
    const array = new Uint8Array(buf);
    const ret = [];
    for (let i = 0; i < buf.byteLength; i += 100000) {
        ret.push(String.fromCharCode(...array.slice(i, 100000)));
    }
    return btoa(ret.join(''));
}

export function bufToArray(buf: ArrayBuffer) {
    return [...new Uint8Array(buf)];
}