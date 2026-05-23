/** 支持正则片段匹配的前缀树节点，用于流式文本触发器。 */
export class PrefixTrieNode {
    children = new Map<string, PrefixTrieNode>();
    constructor(
        public val = '',
        public end = false,
        public extra: Record<string, any> = {},
    ) {}

    /** 从当前节点开始匹配字符串，返回能走到的终止节点集合。 */
    find(str: string, index = 0): PrefixTrieNode[] {
        if (index === str.length) {
            return [this];
        }
        const res: PrefixTrieNode[][] = [];
        const ch = str[index];
        for (const child of this.children.values()) {
            if (child.match(ch)) {
                const start = index++;
                while (index < str.length) {
                    if (child.match(str.substring(start, index + 1))) {
                        index++;
                    } else {
                        break;
                    }
                }
                res.push(child.find(str, index));
            }
        }
        return res.flat();
    }

    /** 判断当前节点的 val 正则是否匹配输入片段。 */
    match(ch: string) {
        return new RegExp(`^${this.val}$`).test(ch);
    }
}
