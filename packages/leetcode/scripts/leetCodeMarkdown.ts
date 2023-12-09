import { Markdown, Difficulty, Tag, Script } from '@/base';
import { backquote } from '@/utils';

const leetCodeMarkdown: Markdown = {
    exist:!true,
    name: '2048. 下一个更大的数值平衡数',
    url: 'https://leetcode.cn/problems/next-greater-numerically-balanced-number',
    difficulty: Difficulty.简单,
    tag: [],
    desc: `给你一个整数 n ，请你返回 严格大于 n 的 最小数值平衡数 。`,
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
        //     date: new Date('2020.12.28').getTime(),
        //     script: Script.TS,
        //     time: 120,
        //     memory: 44.6,
        //     desc: 'dp',
        //     code: ``,
        // },

        {
            date:new Date('2022.05.06').getTime(),
            script: Script.CPP,
            time: 4,
            memory: 7.03,
            desc: '打表',
            code: `class Solution {
    public:
        void getNumber(int d, int ind, vector<int>& buff, vector<int>& arr) {
            if (d == 0) {
                vector<int> temp;
                for (auto x : buff) {
                    for (int i = 0; i < x; i++) {
                        temp.push_back(x);
                    }
                }
                do {
                    int num = 0;
                    for (auto x : temp) num = num * 10 + x;
                    arr.push_back(num);
                } while (next_permutation(temp.begin(), temp.end()));
                return;
            }
            for (int i = ind; i <= d; i++) {
                if (d - i > i || i == d) {
                    buff.push_back(i);
                    getNumber(d - i, i + 1, buff, arr);
                    buff.pop_back();
                }
            }
        }
        void getAllNumber(int d, vector<int>& arr) {
            vector<int> buff;
            getNumber(d, 1, buff, arr);
        }
        int nextBeautifulNumber(int n) {
            if (n == 0) return 1;
            int d = floor(log10(n)) + 1;
            vector<int> arr;
            getAllNumber(d, arr);
            getAllNumber(d + 1, arr);
            int ans = INT_MAX;
            for (auto x : arr) {
                if (x > n) ans = min(ans, x);
            }
            return ans;
        }
};`,
        },
        {
            script: Script.PY,
            time: 3380,
            memory: 15.98,
            desc: '枚举',
            code: `class Solution:
    def nextBeautifulNumber(self, n: int) -> int:
        while True:
            n = n + 1
            arr = [0] * 10
            for c in str(n):
                arr[int(c)] += 1
            f = True
            for i in range(10):
                if arr[i] != 0 and arr[i] != i:
                    f = False
                    break
            if f:
                return n`,
        },
        //         {
        //             script: Script.RUST,
        //             time: 0,
        //             memory: 2.17,
        //             desc: '同上',
        //             code: `use std::cell::RefCell;
        // use std::rc::Rc;
        // impl Solution {
        //     pub fn bst_to_gst(mut root: Option<Rc<RefCell<TreeNode>>>) -> Option<Rc<RefCell<TreeNode>>> {
        //         let mut sums = 0;
        //         fn dfs(node: &mut Option<Rc<RefCell<TreeNode>>>, sums: &mut i32) {
        //             if let Some(node) = node {
        //                 let mut node_ref = node.as_ref().borrow_mut();
        //                 dfs(&mut node_ref.right, sums);
        //                 *sums += node_ref.val;
        //                 node_ref.val = *sums;
        //                 dfs(&mut node_ref.left, sums);
        //             }
        //         }
        //         dfs(&mut root, &mut sums);
        //         root
        //     }
        // }`,
        //         },
    ],
};

export default leetCodeMarkdown;
