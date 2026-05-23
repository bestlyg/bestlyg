/** 安全解析 JSON 字符串；解析失败时返回 null 而不是抛错。 */
export function jsonTryParse<T>(data: string): T | null {
    try {
        return JSON.parse(data);
    } catch {
        return null;
    }
}
