import { bstring, byte, bzstring, double, float, int32, short, sstring, szstring, ubyte, uint32, ushort } from "./types";

export class ESMBuffer {
    private realOffset = 0;
    private bufferOffset = 0;
    constructor(public buffer: ArrayBuffer) { }

    get offset() {
        return this.realOffset + this.bufferOffset;
    }

    advance(offset: number) {
        this.bufferOffset += offset;
        this.trim();
    }

    trim(force = false) {
        if (force || this.bufferOffset > 1024*1024*1) {
            console.log(`Trimming ${this.bufferOffset} bytes from buffer, remaining data ${this.buffer.byteLength-this.bufferOffset}, forced: ${force?'true':'false'}`);
            this.buffer = this.buffer.slice(this.bufferOffset);
            this.realOffset += this.bufferOffset;
            this.bufferOffset = 0;
        }
    }

    readDate() {
        // if (!(this.realOffset + 16 <= endOffset)) debugger;
        // console.assert(this.realOffset + 16 <= endOffset);
        const wordBuf = new Uint16Array(this.buffer.slice(this.bufferOffset, this.bufferOffset += 16));
        const wYear = wordBuf[0];
        const wMonth = wordBuf[1];
        const wDay = wordBuf[3];
        const wHour = wordBuf[4];
        const wMinute = wordBuf[5];
        const wSecond = wordBuf[6];
        const wMilliseconds = wordBuf[7];

        this.trim();

        return new Date(wYear, wMonth, wDay, wHour, wMinute, wSecond, wMilliseconds);
    }

    readUInt64(): bigint {
        // if (!(this.realOffset + 4 <= endOffset)) debugger;
        // console.assert(this.realOffset + 4 <= endOffset);
        const intBuf = new BigUint64Array(this.buffer.slice(this.bufferOffset, this.bufferOffset += 8));

        this.trim();

        return intBuf[0];
    }

    peekUInt64(): bigint {
        // if (!(this.realOffset + 4 <= endOffset)) debugger;
        // console.assert(this.realOffset + 4 <= endOffset);
        const intBuf = new BigUint64Array(this.buffer.slice(this.bufferOffset, this.bufferOffset + 8));

        return intBuf[0];
    }

    readInt64(): bigint {
        // if (!(this.realOffset + 4 <= endOffset)) debugger;
        // console.assert(this.realOffset + 4 <= endOffset);
        const intBuf = new BigInt64Array(this.buffer.slice(this.bufferOffset, this.bufferOffset += 8));

        this.trim();

        return intBuf[0];
    }

    peekInt64(): bigint {
        // if (!(this.realOffset + 4 <= endOffset)) debugger;
        // console.assert(this.realOffset + 4 <= endOffset);
        const intBuf = new BigInt64Array(this.buffer.slice(this.bufferOffset, this.bufferOffset + 8));

        return intBuf[0];
    }

    readUInt(): uint32 {
        // if (!(this.realOffset + 4 <= endOffset)) debugger;
        // console.assert(this.realOffset + 4 <= endOffset);
        const intBuf = new Uint32Array(this.buffer.slice(this.bufferOffset, this.bufferOffset += 4));

        this.trim();

        return intBuf[0];
    }

    peekUInt(): uint32 {
        // if (!(this.realOffset + 2 <= endOffset)) debugger;
        // console.assert(this.realOffset + 2 <= endOffset);
        const shortBuf = new Uint32Array(this.buffer.slice(this.bufferOffset, this.bufferOffset + 4));
        return shortBuf[0];
    }

    readInt(): int32 {
        // if (!(this.realOffset + 4 <= endOffset)) debugger;
        // console.assert(this.realOffset + 4 <= endOffset);
        const intBuf = new Int32Array(this.buffer.slice(this.bufferOffset, this.bufferOffset += 4));

        this.trim();

        return intBuf[0];
    }

    peekInt(): int32 {
        // if (!(this.realOffset + 2 <= endOffset)) debugger;
        // console.assert(this.realOffset + 2 <= endOffset);
        const shortBuf = new Uint16Array(this.buffer.slice(this.bufferOffset, this.bufferOffset + 4));
        return shortBuf[0];
    }

    readUShort(): ushort {
        // if (!(this.realOffset + 2 <= endOffset)) debugger;
        // console.assert(this.realOffset + 2 <= endOffset);
        const shortBuf = new Uint16Array(this.buffer.slice(this.bufferOffset, this.bufferOffset += 2));

        this.trim();

        return shortBuf[0];
    }

    peekUShort(): ushort {
        // if (!(this.realOffset + 2 <= endOffset)) debugger;
        // console.assert(this.realOffset + 2 <= endOffset);
        const shortBuf = new Uint16Array(this.buffer.slice(this.bufferOffset, this.bufferOffset + 2));
        return shortBuf[0];
    }

    readShort(): short {
        // if (!(this.realOffset + 2 <= endOffset)) debugger;
        // console.assert(this.realOffset + 2 <= endOffset);
        const shortBuf = new Int16Array(this.buffer.slice(this.bufferOffset, this.bufferOffset += 2));

        this.trim();

        return shortBuf[0];
    }

    peekShort(): short {
        // if (!(this.realOffset + 2 <= endOffset)) debugger;
        // console.assert(this.realOffset + 2 <= endOffset);
        const shortBuf = new Int16Array(this.buffer.slice(this.bufferOffset, this.bufferOffset + 2));
        return shortBuf[0];
    }

    readUByte(): ubyte {
        // if (!(this.realOffset + 1 <= endOffset)) debugger;
        // console.assert(this.realOffset + 1 <= endOffset);
        const byteBuf = new Uint8Array(this.buffer.slice(this.bufferOffset, this.bufferOffset += 1));

        this.trim();

        return byteBuf[0];
    }

    peekUByte(): ubyte {
        // if (!(this.realOffset + 1 <= endOffset)) debugger;
        // console.assert(this.realOffset + 1 <= endOffset);
        const byteBuf = new Uint8Array(this.buffer.slice(this.bufferOffset, this.bufferOffset + 1));
        return byteBuf[0];
    }

    readByte(): byte {
        // if (!(this.realOffset + 1 <= endOffset)) debugger;
        // console.assert(this.realOffset + 1 <= endOffset);
        const byteBuf = new Int8Array(this.buffer.slice(this.bufferOffset, this.bufferOffset += 1));

        this.trim();

        return byteBuf[0];
    }

    peekByte(): byte {
        // if (!(this.realOffset + 1 <= endOffset)) debugger;
        // console.assert(this.realOffset + 1 <= endOffset);
        const byteBuf = new Int8Array(this.buffer.slice(this.bufferOffset, this.bufferOffset + 1));
        return byteBuf[0];
    }

    readFloat(): float {
        // if (!(this.realOffset + 4 <= endOffset)) debugger;
        // console.assert(this.realOffset + 4 <= endOffset);
        const floatBuf = new Float32Array(this.buffer.slice(this.bufferOffset, this.bufferOffset += 4));

        this.trim();

        return floatBuf[0];
    }

    peekFloat(): float {
        // if (!(this.realOffset + 4 <= endOffset)) debugger;
        // console.assert(this.realOffset + 4 <= endOffset);
        const floatBuf = new Float32Array(this.buffer.slice(this.bufferOffset, this.bufferOffset + 4));
        return floatBuf[0];
    }

    readDouble(): double {
        // if (!(this.realOffset + 8 <= endOffset)) debugger;
        // console.assert(this.realOffset + 8 <= endOffset);
        const doubleBuf = new Float64Array(this.buffer.slice(this.bufferOffset, this.bufferOffset += 8));

        this.trim();

        return doubleBuf[0];
    }

    peekDouble(): double {
        // if (!(this.realOffset + 8 <= endOffset)) debugger;
        // console.assert(this.realOffset + 8 <= endOffset);
        const doubleBuf = new Float64Array(this.buffer.slice(this.bufferOffset, this.bufferOffset + 8));
        return doubleBuf[0];
    }

    readbzString(): bzstring {
        const str = this.readbString();

        // Remove the null byte at the end of the string
        return str.slice(0, -1);
    }

    peekbzString(): bzstring {
        const str = this.peekbString();

        // Remove the null byte at the end of the string
        return str.slice(0, -1);
    }

    readszString(): szstring {
        const str = this.readsString();

        // Remove the null byte at the end of the string
        return str.slice(0, -1);
    }

    peekszString(): szstring {
        const str = this.peeksString();

        // Remove the null byte at the end of the string
        return str.slice(0, -1);
    }

    readbString(): bstring {
        // if (!(this.realOffset + 1 <= endOffset)) debugger;
        // console.assert(this.realOffset + 1 <= endOffset);
        const strLen = this.readUByte();

        // if (!(this.realOffset + strLen <= endOffset)) debugger;
        // console.assert(this.realOffset + strLen <= endOffset);
        const str = this.readString(strLen);

        return str;
    }

    peekbString(): bstring {
        // if (!(this.realOffset + 1 <= endOffset)) debugger;
        // console.assert(this.realOffset + 1 <= endOffset);
        const strLen = this.peekByte();

        // if (!(this.realOffset + strLen <= endOffset)) debugger;
        // console.assert(this.realOffset + strLen <= endOffset);
        const str = this.peekString(strLen);

        return str;
    }

    readsString(): sstring {
        // if (!(this.realOffset + 1 <= endOffset)) debugger;
        // console.assert(this.realOffset + 1 <= endOffset);
        const strLen = this.readUShort();

        // if (!(this.realOffset + strLen <= endOffset)) debugger;
        // console.assert(this.realOffset + strLen <= endOffset);
        const str = this.readString(strLen);

        return str;
    }

    peeksString(): sstring {
        // if (!(this.realOffset + 1 <= endOffset)) debugger;
        // console.assert(this.realOffset + 1 <= endOffset);
        const strLen = this.peekShort();

        // if (!(this.realOffset + strLen <= endOffset)) debugger;
        // console.assert(this.realOffset + strLen <= endOffset);
        const str = this.peekString(strLen+2);

        return str.slice(2);
    }

    readString(len: number): string {
        // if (!(this.realOffset + len <= endOffset)) debugger;
        // console.assert(this.realOffset + len <= endOffset);
        let ret: string[] = [];
        while (len > 0) {
            ret.push(String.fromCharCode(...new Uint8Array(this.buffer.slice(this.bufferOffset, this.bufferOffset += Math.min(1000, len)))));
            len -= 1000;
        }

        this.trim();

        return ret.join('');
    }

    peekString(len: number): string {
        // if (!(this.realOffset + len <= endOffset)) debugger;
        // console.assert(this.realOffset + len <= endOffset);
        return String.fromCharCode(...new Uint8Array(this.buffer.slice(this.bufferOffset, this.bufferOffset + len)));
    }

    readByteArray(len: number): byte[] {
        // if (!(this.realOffset + len <= endOffset)) debugger;
        // console.assert(this.realOffset + len <= endOffset);
        const ret = [...new Int8Array(this.buffer.slice(this.bufferOffset, this.bufferOffset += len))];

        this.trim();

        return ret;
    }

    peekByteArray(len: number): byte[] {
        // if (!(this.realOffset + len <= endOffset)) debugger;
        // console.assert(this.realOffset + len <= endOffset);
        return [...new Int8Array(this.buffer.slice(this.bufferOffset, this.bufferOffset + len))];
    }

    readUByteArray(len: number): ubyte[] {
        // if (!(this.realOffset + len <= endOffset)) debugger;
        // console.assert(this.realOffset + len <= endOffset);
        const ret = [...new Uint8Array(this.buffer.slice(this.bufferOffset, this.bufferOffset += len))];
        
        this.trim();

        return ret;        
    }

    peekUByteArray(len: number): ubyte[] {
        // if (!(this.realOffset + len <= endOffset)) debugger;
        // console.assert(this.realOffset + len <= endOffset);
        return [...new Uint8Array(this.buffer.slice(this.bufferOffset, this.bufferOffset + len))];
    }

    readShortArray(len: number): short[] {
        // if (!(this.realOffset + (len * 2) <= endOffset)) debugger;
        // console.assert(this.realOffset + (len * 2) <= endOffset);
        const ret = [...new Int16Array(this.buffer.slice(this.bufferOffset, this.bufferOffset += (len * 2)))];

        this.trim();

        return ret;
    }

    peekShortArray(len: number): short[] {
        // if (!(this.realOffset + (len * 2) <= endOffset)) debugger;
        // console.assert(this.realOffset + (len * 2) <= endOffset);
        return [...new Int16Array(this.buffer.slice(this.bufferOffset, this.bufferOffset + (len * 2)))];
    }

    readUShortArray(len: number): ushort[] {
        // if (!(this.realOffset + (len * 2) <= endOffset)) debugger;
        // console.assert(this.realOffset + (len * 2) <= endOffset);
        const ret = [...new Uint16Array(this.buffer.slice(this.bufferOffset, this.bufferOffset += (len * 2)))];

        this.trim();

        return ret;
    }

    peekUShortArray(len: number): ushort[] {
        // if (!(this.realOffset + (len * 2) <= endOffset)) debugger;
        // console.assert(this.realOffset + (len * 2) <= endOffset);
        return [...new Uint16Array(this.buffer.slice(this.bufferOffset, this.bufferOffset + (len * 2)))];
    }

    readIntArray(len: number): int32[] {
        // if (!(this.realOffset + (len * 4) <= endOffset)) debugger;
        // console.assert(this.realOffset + (len * 4) <= endOffset);
        const ret = [...new Int32Array(this.buffer.slice(this.bufferOffset, this.bufferOffset += (len * 4)))];

        this.trim();

        return ret;
    }

    peekIntArray(len: number): int32[] {
        // if (!(this.realOffset + (len * 4) <= endOffset)) debugger;
        // console.assert(this.realOffset + (len * 4) <= endOffset);
        return [...new Int32Array(this.buffer.slice(this.bufferOffset, this.bufferOffset + (len * 4)))];
    }

    readUIntArray(len: number): uint32[] {
        // if (!(this.realOffset + (len * 4) <= endOffset)) debugger;
        // console.assert(this.realOffset + (len * 4) <= endOffset);
        const ret = [...new Uint32Array(this.buffer.slice(this.bufferOffset, this.bufferOffset += (len * 4)))];
        
        this.trim();

        return ret;
    }

    peekUIntArray(len: number): uint32[] {
        // if (!(this.realOffset + (len * 4) <= endOffset)) debugger;
        // console.assert(this.realOffset + (len * 4) <= endOffset);
        return [...new Uint32Array(this.buffer.slice(this.bufferOffset, this.bufferOffset + (len * 4)))];
    }

    readFloatArray(len: number): float[] {
        // if (!(this.realOffset + (len * 4) <= endOffset)) debugger;
        // console.assert(this.realOffset + (len * 4) <= endOffset);
        const ret = [...new Float32Array(this.buffer.slice(this.bufferOffset, this.bufferOffset += (len * 4)))];

        this.trim();

        return ret;
    }

    peekFloatArray(len: number): float[] {
        // if (!(this.realOffset + (len * 4) <= endOffset)) debugger;
        // console.assert(this.realOffset + (len * 4) <= endOffset);
        return [...new Float32Array(this.buffer.slice(this.bufferOffset, this.bufferOffset + (len * 4)))];
    }

    readDoubleArray(len: number): double[] {
        // if (!(this.realOffset + (len * 8) <= endOffset)) debugger;
        // console.assert(this.realOffset + (len * 8) <= endOffset);
        const ret = [...new Float64Array(this.buffer.slice(this.bufferOffset, this.bufferOffset += (len * 8)))];

        this.trim();

        return ret;
    }

    peekDoubleArray(len: number): double[] {
        // if (!(this.realOffset + (len * 8) <= endOffset)) debugger;
        // console.assert(this.realOffset + (len * 8) <= endOffset);
        return [...new Float64Array(this.buffer.slice(this.bufferOffset, this.bufferOffset += (len * 8)))];
    }

    readbStringArray(len: number): bstring[] {
        let ret: string[] = [];
        for (let i = 0; i < len; ++i) {
            ret.push(this.readbString());
        }
        return ret;
    }

    readbzStringArray(len: number): bzstring[] {
        let ret: string[] = [];
        for (let i = 0; i < len; ++i) {
            ret.push(this.readbzString());
        }
        return ret;
    }

};
