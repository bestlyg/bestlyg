import { customAlphabet } from 'nanoid';
import dayjs from 'dayjs';

/** 生成前端请求链路 ID，格式为 frontend_yyyyMMddHHmmss_5位数字。 */
export function createTraceId() {
    const alphabet = '0123456789';
    const generate = customAlphabet(alphabet, 5);
    return `frontend_${dayjs(new Date()).format('YYYYMMDDHHmmss')}_${generate()}`;
}
