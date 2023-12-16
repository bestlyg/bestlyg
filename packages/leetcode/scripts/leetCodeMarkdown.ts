import { Markdown, Difficulty, Tag, Script } from '@/base';
import { backquote } from '@/utils';

const leetCodeMarkdown: Markdown = {
    exist: !true,
    name: '2276. 统计区间中的整数数目',
    url: 'https://leetcode.cn/problems/count-integers-in-intervals',
    difficulty: Difficulty.简单,
    tag: [],
    desc: `给你区间的 空 集，请你设计并实现满足要求的数据结构：新增：添加一个区间到这个区间集合中。统计：计算出现在 至少一个 区间中的整数个数。`,
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
        //     date: new Date('2021.01.29').getTime(),
        //     script: Script.TS,
        //     time: 352,
        //     memory: 46.7,
        //     desc: '二分',
        //     code: ``,
        // },

    //     {
    //         script: Script.PY,
    //         time: 1776,
    //         memory: 22.2,
    //         desc: 'bfs',
    //         code: `class Solution:
    // def reverseOddLevels(self, root: Optional[TreeNode]) -> Optional[TreeNode]:
    //     if not root: return None
    //     q = [root]
    //     size = 1
    //     level = 0
    //     while q:
    //         node = q.pop(0)
    //         if node.left: q.append(node.left)
    //         if node.right: q.append(node.right)
    //         size -= 1
    //         if size == 0:
    //             size = len(q)
    //             level += 1
    //             if level % 2 != 0:
    //                 for i in range(len(q) // 2):
    //                     q[i].val, q[len(q) - 1 - i].val = q[len(q) - 1 - i].val, q[i].val
    //     return root`,
    //     },
        {
            script: Script.CPP,
            time: 432,
            memory: 181.94,
            desc: '平衡二叉树',
            code: `class CountIntervals {
public:
    map<int, int> tree;
    int sum;
    CountIntervals(): sum(0) {
        tree[0] = 0;
        tree[INT_MAX] = INT_MAX;
    }
    int count() {
        return sum;
    }
    void add(int left, int right) {
        auto it = tree.lower_bound(left);
        auto prev = it;
        prev--;
        if (prev->second >= left) {
            left = min(left, prev->first);
            right = max(right, prev->second);
            sum -= prev->second - prev->first + 1;
            it = tree.erase(prev);
        }
        while (right >= it->first) {
            right = max(right, it->second);
            sum -= it->second - it->first + 1;
            it = tree.erase(it);
        }
        tree[left] = right;
        sum += right - left + 1;
    }
};`,
        },
//         {
//             script: Script.RUST,
//             time: 8,
//             memory: 2.35,
//             desc: '同上',
//             code: `impl Solution {
//     pub fn make_smallest_palindrome(s: String) -> String {
//         let mut arr = s.chars().map(|c| c as u8).collect::<Vec<u8>>();
//         let n = arr.len();
//         for i in 0..n / 2 {
//             arr[i] = arr[i].min(arr[n - 1 - i]);
//             arr[n - 1 - i] = arr[i];
//         }
//         String::from_utf8(arr).unwrap()
//     }
// }`,
//         },
    ],
};

export default leetCodeMarkdown;
