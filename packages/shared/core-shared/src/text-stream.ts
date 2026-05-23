import { PrefixTrieNode } from './prefix-trie';

/** 按字符消费文本流，并在匹配到前缀树规则时触发替换逻辑。 */
export class TextStream {
    current = '';
    trie: PrefixTrieNode;
    onTrigger: (cfg: { nodes: PrefixTrieNode[]; current: string }) => string;
    static DOC_SOURCE_TAG = 'DOC_SOURCE_TAG';
    static DOC_SOURCE_REG =
        /<MultiAgentDocSource(?: index="(?<index>.*?)")?(?: file_index="(?<file_index>.*?)")?(?: file_id="(?<file_id>.*?)")?(?: file_name="(?<file_name>.*?)")? \/>/g;
    constructor(
        cfg: {
            trie?: TextStream['trie'];
            onTrigger?: TextStream['onTrigger'];
        } = {},
    ) {
        this.trie = cfg.trie ?? new PrefixTrieNode();
        this.onTrigger = cfg.onTrigger ?? ((v) => v.current);
    }

    /** 输入一段增量文本，返回本次可以安全输出的文本。 */
    inputStream({ inputStream }: { inputStream: string }): {
        outputStream: string;
    } {
        let outputStream = '';
        for (const input of inputStream) {
            this.current += input;
            const lastNodes = this.trie.find(this.current);
            if (lastNodes.length === 0) {
                outputStream += this.current;
                this.current = '';
                continue;
            }
            if (lastNodes.some((v) => v.end)) {
                outputStream +=
                    this.onTrigger({
                        nodes: lastNodes,
                        current: this.current,
                    }) ?? this.current;
                this.current = '';
                continue;
            }
        }
        return { outputStream };
    }

    /** 输出并清空尚未匹配完成的缓存文本。 */
    dump() {
        const current = this.current;
        this.current = '';
        return current;
    }

    /** 加载 MultiAgentDocSource 标签识别规则，用于流式处理文档来源占位符。 */
    static loadDocSourcePolicy(textStream: TextStream) {
        const DOC_NODES = [
            ...`<MultiAgentDocSource index="`.split(''),
            '[^"]+',
            ...`" file_index="`.split(''),
            '[^"]+',
            ...`" file_id="`.split(''),
            '[^"]+',
            ...`" file_name="`.split(''),
            '[^"]+',
            `" />`.split(''),
        ].flat();
        let p = textStream.trie;
        for (const ch of DOC_NODES) {
            if (!p.children.has(ch)) {
                p.children.set(ch, new PrefixTrieNode(ch));
            }
            const nextNode = p.children.get(ch)!;
            p = nextNode;
        }
        p.end = true;
        p.extra.type = TextStream.DOC_SOURCE_TAG;
        p.extra.reg = TextStream.DOC_SOURCE_REG;
        return this;
    }
}
