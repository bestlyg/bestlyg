import * as Encrypt from '../utils/encrypt';

export default class Crc32 {
    retryTime = 0;
    fileSize: number;
    crc32Array = [];
    /*
    @Des: 构造函数
    */
    constructor(
        public file: File,
        public sliceLength: any,
        public successProcess: any,
        public failProcess: any
    ) {}

    /*
    @Des: 启动计算crc32
    */
    start() {
        this.readFileCrc32(this.file);
    }

    /*
    @Des: 启动运算crc32
    */
    readFileCrc32(file) {
        const blobSize = this.sliceLength;
        const slice = file.slice || file.webkitSlice || file.mozSlice;
        const fileReader = new FileReader();
        let start = 0;
        let end = 0;
        let crc32 = 0;

        const read = () => {
            if (end < file.size) {
                end = Math.min(start + blobSize, file.size);
                // 长视频上传需保证最后一个分片大于5M
                if (file.size > 100 * 1024 * 1024 && file.size - end <= 5 * 1024 * 1024) {
                    end = file.size;
                }
            }
            fileReader.readAsArrayBuffer(slice.call(file, start, end));
            fileReader.onload = e => {
                const buffer = e.target!.result as ArrayBuffer;
                crc32 = Encrypt.crc32(buffer, 0);
                this.crc32Array.push({
                    start,
                    end,
                    crc32: Encrypt.dec2hex(crc32),
                    buffer,
                });
                start = end;
                if (end < file.size) {
                    read();
                } else {
                    this.success(this.crc32Array);
                }
            };
        };
        read();
    }

    /*
    @Des: 成功处理
    */
    success(crc32Array) {
        this.successProcess(crc32Array);
    }

    /*
    @Des: 失败处理
    */
    fail(file, start, end, lastCrc32) {
        if (this.retryTime >= 3) {
            this.failProcess();
        } else {
            this.readFileCrc32(file, start, end, lastCrc32);
            this.retryTime++;
        }
    }
}
