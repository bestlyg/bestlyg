import { Markdown, Difficulty, Tag, Script } from '@/base';
import { backquote } from '@/utils';

const leetCodeMarkdown: Markdown = {
    exist: true,
    name: '24. 两两交换链表中的节点',
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
            time: 4,
            memory: 7.26,
            desc: 'dfs',
            code: `class Solution {
public:
    typedef pair<ListNode*, ListNode*> pll;
    ListNode* swapPairs(ListNode* head) {
        return swap(head, 1, 2).first;
    }
    pll swap(ListNode* node, int cnt, int max_cnt) {
        if (!node) {
            return make_pair(nullptr, nullptr);
        } else if (cnt == max_cnt) {
            node->next = swap(node->next, 1, max_cnt).first;
            return make_pair(node, node);
        } else if (!node->next) {
            return make_pair(node, node);
        } else {
            auto res = swap(node->next, cnt + 1, max_cnt);
            node->next = res.second->next;
            res.second->next = node;
            return res;
        }
    }
};`,
        },
        {
            script: Script.PY,
            time: 40,
            memory: 15.62,
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
        // {
        //     script: Script.RUST,
        //     time: 0,
        //     memory: 2.06,
        //     desc: '同上',
        //     code: ``,
        // },
    ],
};

export default leetCodeMarkdown;
