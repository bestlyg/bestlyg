import { Markdown, Difficulty, Tag, Script } from '@/base';
import { backquote } from '@/utils';

const leetCodeMarkdown: Markdown = {
    exist: true,
    name: '449. 序列化和反序列化二叉搜索树',
    url: 'https://leetcode.cn/problems/eliminate-maximum-number-of-monsters',
    difficulty: Difficulty.简单,
    tag: [],
    desc: `返回在你输掉游戏前可以消灭的怪物的 最大 数量。`,
    solutions: [
        // {
        //     date: new Date('2020.04.26').getTime(),
        //     script: Script.JS,
        //     time: 384,
        //     memory: 44.78,
        //     desc: '归并排序',
        //     code: ``,
        // },
        // {
        //     date: new Date('2021.05.13').getTime(),
        //     script: Script.TS,
        //     time: 220,
        //     memory: 48.3,
        //     desc: '归并排序',
        //     code: ``,
        // },
        // {
        //     script: Script.CPP,
        //     time: 104,
        //     memory: 86.8,
        //     desc: '排序',
        //     code: ``,
        // },
        {
            script: Script.PY,
            time: 248,
            memory: 19.74,
            desc: '同上',
            code: `class Codec:

    def serialize(self, node: Optional[TreeNode]) -> str:
        """Encodes a tree to a single string.
        """
        if not node:
            return "N"
        return f"{node.val},({self.serialize(node.left)}),({self.serialize(node.right)})"

    def deserialize(self, s: str) -> Optional[TreeNode]:
        """Decodes your encoded data to tree.
        """
        if s == "N":
            return None
        s1 = s2 = s3 = ''
        split_idx = -1
        level = 0
        for i in range(len(s)):
            if s[i] == '(':
                level += 1
            elif s[i] == ')':
                level -= 1
            elif s[i] == ',' and level == 0:
                if split_idx == -1:
                    s1 = s[:i]
                    split_idx = i + 1
                else:
                    s2 = s[split_idx + 1:i - 1]
                    s3 = s[i + 2:-1]
        return TreeNode(int(s1), self.deserialize(s2), self.deserialize(s3))

`,
        },
        // {
        //     script: Script.RUST,
        //     time: 32,
        //     memory: 4.1,
        //     desc: '同上',
        //     code: ``,
        // },
    ],
};

export default leetCodeMarkdown;
