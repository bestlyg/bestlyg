/** 检查 switch case 分支是否对所有 union type 或 enum 的值做了穷举，用在 default 分支中 */
export function assertExhaustive(val: never, message: string = 'Exhaustive check failed'): never {
    const error = new Error(message);
    console.error('assertExhaustive error', val, error);
    throw new Error(`${message}: ${JSON.stringify(val)}`);
}
