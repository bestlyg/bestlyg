import { crc32, dec2hex } from '../utils/encrypt';

self.onmessage = (msg: { data: [ArrayBuffer, number, number] }) => {
    const {
        data: [ab, index, crc32StartTime],
    } = msg;
    const crc32Value = crc32(ab, 0);
    postMessage([ab, dec2hex(crc32Value), index, crc32StartTime], '*', [ab]);
};
