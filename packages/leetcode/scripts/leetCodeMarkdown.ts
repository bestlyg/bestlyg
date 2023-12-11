import { Markdown, Difficulty, Tag, Script } from '@/base';
import { backquote } from '@/utils';

const leetCodeMarkdown: Markdown = {
    exist: !true,
    name: '1631. 最小体力消耗路径',
    url: 'https://leetcode.cn/problems/path-with-minimum-effort/',
    difficulty: Difficulty.简单,
    tag: [],
    desc: `一条路径耗费的 体力值 是路径上相邻格子之间 高度差绝对值 的 最大值 决定的。请你返回从左上角走到右下角的最小 体力消耗值 。`,
    solutions: [
        // {
        //     date: new Date('2020.04.26').getTime(),
        //     script: Script.JS,
        //     time: 384,
        //     memory: 44.78,
        //     desc: '归并排序',
        //     code: ``,
        // },
        {
            date: new Date('2021.01.29').getTime(),
            script: Script.TS,
            time: 352,
            memory: 46.7,
            desc: '二分',
            code: `var minimumEffortPath = function(heights) {
const dirs = [[-1, 0], [1, 0], [0, -1], [0, 1]];

const m = heights.length, n = heights[0].length;
let left = 0, right = 999999, ans = 0;
while (left <= right) {
    const mid = Math.floor((left + right) / 2);
    const queue = [[0, 0]];
    const seen = new Array(m * n).fill(0);
    seen[0] = 1;
    while (queue.length) {
        const [x, y] = queue.shift();
        for (let i = 0; i < 4; i++) {
            const nx = x + dirs[i][0];
            const ny = y + dirs[i][1];
            if (nx >= 0 && nx < m && ny >= 0 && ny < n && !seen[nx * n + ny] && Math.abs(heights[x][y] - heights[nx][ny]) <= mid) {
                queue.push([nx, ny]);
                seen[nx * n + ny] = 1;
            }
        }
    }
    if (seen[m * n - 1]) {
        ans = mid;
        right = mid - 1;
    } else {
        left = mid + 1;
    }
}
return ans;
};`,
        },

        // {
        //     script: Script.CPP,
        //     time: 4,
        //     memory: 7.03,
        //     desc: '打表',
        //     code: ``,
        // },
        {
            script: Script.PY,
            time: 36,
            memory: 16.67,
            desc: '二分',
            code: `dirs = [(0, 1), (1, 0), (0, -1), (-1, 0)]
class Solution:
    def minimumEffortPath(self, heights: List[List[int]]) -> int:
        n, m = len(heights), len(heights[0])
        def check(val: int) -> bool:
            q = deque([(0, 0)])
            used = [[False] * m for _ in range(n)]
            used[0][0] = True
            while q:
                i, j = q.popleft()
                if i == n - 1 and j == m - 1: return True
                for dir in dirs:
                    ni = i + dir[0]
                    nj = j + dir[1]
                    if 0 <= ni < n and 0 <= nj < m and not used[ni][nj] and abs(heights[ni][nj] - heights[i][j]) <= val:
                        q.append((ni, nj))
                        used[ni][nj] = True
            return False

        l, r = 0, 10 ** 6
        while l < r:
            mid = (l + r) // 2
            if check(mid): r = mid
            else: l = mid + 1
        return l`,
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
