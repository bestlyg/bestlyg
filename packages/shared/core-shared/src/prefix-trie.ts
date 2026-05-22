export class PrefixTrieNode {
  children = new Map<string, PrefixTrieNode>()
  constructor(
    public val = '',
    public end = false,
    public extra: Record<string, any> = {},
  ) {}
  find(str: string, index = 0): PrefixTrieNode[] {
    if (index === str.length) {
      return [this]
    }
    const res: PrefixTrieNode[][] = []
    const ch = str[index]
    for (const child of this.children.values()) {
      if (child.match(ch)) {
        const start = index++
        while (index < str.length) {
          if (child.match(str.substring(start, index + 1))) {
            index++
          } else {
            break
          }
        }
        res.push(child.find(str, index))
      }
    }
    return res.flat()
  }
  match(ch: string) {
    return new RegExp(`^${this.val}$`).test(ch)
  }
}
