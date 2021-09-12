export class SaveBuffer {
    constructor(
        public buffer: ArrayBuffer,
        private realOffset: number,
    ) { }

    get offset() {
        return this.realOffset;
    }

    advance(num: number) {
        this.realOffset += num;
    }

    clone() {
        return new SaveBuffer(this.buffer, this.offset);
    }

    readDate(endOffset?: number) {
        console.assert(endOffset === undefined || this.offset + 16 <= endOffset);
        const wordBuf = new Uint16Array(this.buffer.slice(this.offset, this.realOffset += 16));
        const wYear = wordBuf[0];
        const wMonth = wordBuf[1];
        const wDay = wordBuf[3];
        const wHour = wordBuf[4];
        const wMinute = wordBuf[5];
        const wSecond = wordBuf[6];
        const wMilliseconds = wordBuf[7];

        return new Date(wYear, wMonth, wDay, wHour, wMinute, wSecond, wMilliseconds);
    }

    readInt(endOffset?: number) {
        console.assert(endOffset === undefined || this.offset + 4 <= endOffset);
        const intBuf = new Uint32Array(this.buffer.slice(this.offset, this.realOffset += 4));
        return intBuf[0];
    }

    readShort(endOffset?: number) {
        console.assert(endOffset === undefined || this.offset + 2 <= endOffset);
        const shortBuf = new Uint16Array(this.buffer.slice(this.offset, this.realOffset += 2));
        return shortBuf[0];
    }

    readByte(endOffset?: number) {
        console.assert(endOffset === undefined || this.offset + 1 <= endOffset);
        const byteBuf = new Uint8Array(this.buffer.slice(this.offset, this.realOffset += 1));
        return byteBuf[0];
    }

    readFloat(endOffset?: number) {
        console.assert(endOffset === undefined || this.offset + 4 <= endOffset);
        const floatBuf = new Float32Array(this.buffer.slice(this.offset, this.realOffset += 4));
        return floatBuf[0];
    }

    readDouble(endOffset?: number) {
        console.assert(endOffset === undefined || this.offset + 8 <= endOffset);
        const doubleBuf = new Float64Array(this.buffer.slice(this.offset, this.realOffset += 8));
        return doubleBuf[0];
    }

    readbzString(endOffset?: number) {
        const str = this.readbString(endOffset);

        // Remove the null byte at the end of the string
        return str.slice(0, -1);
    }

    readbString(endOffset?: number) {
        console.assert(endOffset === undefined || this.offset + 1 <= endOffset);
        const strLen = this.readByte(endOffset);

        console.assert(endOffset === undefined || this.offset + strLen <= endOffset);
        const str = this.readString(strLen, endOffset);

        return str;
    }

    readString(len: number, endOffset?: number) {
        console.assert(endOffset === undefined || this.offset + len <= endOffset);
        return String.fromCharCode(...new Uint8Array(this.buffer.slice(this.offset, this.realOffset += len)));
    }

    readByteArray(len: number, endOffset?: number) {
        console.assert(endOffset === undefined || this.offset + len <= endOffset);
        return [...new Uint8Array(this.buffer.slice(this.offset, this.realOffset += len))];
    }

    readShortArray(len: number, endOffset?: number) {
        console.assert(endOffset === undefined || this.offset + (len * 2) <= endOffset);
        return [...new Uint16Array(this.buffer.slice(this.offset, this.realOffset += (len * 2)))];
    }

    readIntArray(len: number, endOffset?: number) {
        console.assert(endOffset === undefined || this.offset + (len * 4) <= endOffset);
        return [...new Uint32Array(this.buffer.slice(this.offset, this.realOffset += (len * 4)))];
    }

    readFloatArray(len: number, endOffset?: number) {
        console.assert(endOffset === undefined || this.offset + (len * 4) <= endOffset);
        return [...new Float32Array(this.buffer.slice(this.offset, this.realOffset += (len * 4)))];
    }

    readDoubleArray(len: number, endOffset?: number) {
        console.assert(endOffset === undefined || this.offset + (len * 8) <= endOffset);
        return [...new Float64Array(this.buffer.slice(this.offset, this.realOffset += (len * 8)))];
    }

    readbStringArray(len: number, endOffset?: number) {
        let ret: string[] = [];
        for (let i = 0; i < len; ++i) {
            ret.push(this.readbString(endOffset));
        }
        return ret;
    }

    readbzStringArray(len: number, endOffset?: number) {
        let ret: string[] = [];
        for (let i = 0; i < len; ++i) {
            ret.push(this.readbzString(endOffset));
        }
        return ret;
    }

};
