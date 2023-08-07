import { Markdown, Difficulty, Tag, Script } from '@/base';
import { backquote } from '@/utils';

const leetCodeMarkdown: Markdown = {
    exist: true,
    name: '344. 反转字符串',
    url: 'https://leetcode.cn/problems/unique-paths-iii',
    difficulty: Difficulty.简单,
    tag: [],
    desc: `返回在四个方向（上、下、左、右）上行走时，从起始方格到结束方格的不同路径的数目。`,
    solutions: [
        // {
        //     date: new Date('2020/10/06').getTime(),
        //     script: Script.JS,
        //     time: 224,
        //     memory: 54.2,
        //     desc: 'dfs',
        //     code: ``,
        // },
        {
            script: Script.CPP,
            time: 20,
            memory: 22.15,
            desc: '遍历',
            code: `class Solution {
public:
    void reverseString(vector<char>& s) {
        int l = 0, r = s.size() - 1;
        while (l < r) swap(s[l++], s[r--]);
    }
};`,
        },
        {
            script: Script.PY,
            time: 60,
            memory: 20.86,
            desc: '同上',
            code: `def swap(node: Optional[ListNode], cnt: int, max_cnt: int) -> (Optional[ListNode], Optional[ListNode]):
    if not node:
        return (None, None)
    elif cnt == max_cnt:
        node.next = swap(node.next, 1, max_cnt)[0]
        return (node, node)
    elif not node.next:
        return (node, node)
    else:
        res = swap(node.next, cnt + 1, max_cnt)
        node.next = res[1].next
        res[1].next = node
        return res

    class Solution:
        def swapPairs(self, head: Optional[ListNode]) -> Optional[ListNode]:
            return swap(head, 1, 2)[0]`,
        },
        {
            script: Script.RUST,
            time: 16,
            memory: 5.26,
            desc: '同上',
            code: `impl Solution {
    pub fn reverse_string(s: &mut Vec<char>) {
        let mut l = 0;
        let mut r = s.len() - 1;
        while l < r {
            let (cl, cr) = (s[l], s[r]);
            s[l] = cr;
            s[r] = cl;
            l += 1;
            r -= 1;
        }
    }
}`,
        },
    ],
};

export default leetCodeMarkdown;
