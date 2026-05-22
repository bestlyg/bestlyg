import { PrefixTrieNode } from './prefix-trie'

export class TextStream {
  current = ''
  trie: PrefixTrieNode
  onTrigger: (cfg: { nodes: PrefixTrieNode[]; current: string }) => string
  static DOC_SOURCE_TAG = 'DOC_SOURCE_TAG'
  static DOC_SOURCE_REG =
    /<MultiAgentDocSource(?: index="(?<index>.*?)")?(?: file_index="(?<file_index>.*?)")?(?: file_id="(?<file_id>.*?)")?(?: file_name="(?<file_name>.*?)")? \/>/g
  constructor(
    cfg: {
      trie?: TextStream['trie']
      onTrigger?: TextStream['onTrigger']
    } = {},
  ) {
    this.trie = cfg.trie ?? new PrefixTrieNode()
    this.onTrigger = cfg.onTrigger ?? ((v) => v.current)
  }

  inputStream({ inputStream }: { inputStream: string }): {
    outputStream: string
  } {
    let outputStream = ''
    for (const input of inputStream) {
      this.current += input
      const lastNodes = this.trie.find(this.current)
      if (lastNodes.length === 0) {
        outputStream += this.current
        this.current = ''
        continue
      }
      if (lastNodes.some((v) => v.end)) {
        outputStream +=
          this.onTrigger({
            nodes: lastNodes,
            current: this.current,
          }) ?? this.current
        this.current = ''
        continue
      }
    }
    return { outputStream }
  }

  dump() {
    const current = this.current
    this.current = ''
    return current
  }

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
    ].flat()
    let p = textStream.trie
    for (const ch of DOC_NODES) {
      if (!p.children.has(ch)) {
        p.children.set(ch, new PrefixTrieNode(ch))
      }
      const nextNode = p.children.get(ch)!
      p = nextNode
    }
    p.end = true
    p.extra.type = TextStream.DOC_SOURCE_TAG
    p.extra.reg = TextStream.DOC_SOURCE_REG
    return this
  }
}
