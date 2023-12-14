import { Markdown, Difficulty, Tag, Script } from '@/base';
import { backquote } from '@/utils';

const leetCodeMarkdown: Markdown = {
    exist: !true,
    name: '2132. 用邮票贴满网格图',
    url: 'https://leetcode.cn/problems/stamping-the-grid/',
    difficulty: Difficulty.简单,
    tag: [],
    desc: `如果在满足上述要求的前提下，可以放入邮票，请返回 true ，否则返回 false 。`,
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

        {
            script: Script.PY,
            time: 1440,
            memory: 57.3,
            desc: '前缀和统计区间内有无禁区，差分统计空白区是否都存在邮票',
            code: `class Solution:
    def possibleToStamp(self, grid: List[List[int]], stampHeight: int, stampWidth: int) -> bool:
        n, m = len(grid), len(grid[0])
        sums = [[0] * (m + 2) for _ in range(n + 2)]
        arr  = [[0] * (m + 2) for _ in range(n + 2)]
        for i in range(n):
            for j in range(m):
                sums[i + 1][j + 1] = sums[i][j + 1] + sums[i + 1][j] - sums[i][j] + grid[i][j]

        for i in range(n):
            for j in range(m):
                endi = i + stampHeight - 1
                endj = j + stampWidth  - 1
                if grid[i][j] == 0 and endi < n and endj < m and sums[endi + 1][endj + 1] - sums[endi + 1][j] - sums[i][endj + 1] + sums[i][j] == 0:
                    arr[i + 1][j + 1]        += 1
                    arr[i + 1][endj + 2]     -= 1
                    arr[endi + 2][j + 1]     -= 1
                    arr[endi + 2][endj + 2]  += 1
        
        for i in range(1, n + 1):
            for j in range(1, m + 1):
                arr[i][j] += arr[i][j - 1] + arr[i - 1][j] - arr[i - 1][j - 1]
                if grid[i - 1][j - 1] == 0 and arr[i][j] == 0:
                    return False

        return True`,
        },
//         {
//             script: Script.CPP,
//             time: 32,
//             memory: 15.03,
//             desc: '同上',
//             code: `class Solution {
// public:
//     string makeSmallestPalindrome(string s) {
//         for (int i = 0; i < s.size() / 2; i++) {
//             s[i] = s[s.size() - 1 - i] = min(s[i], s[s.size() - 1 - i]);
//         }
//         return s;
//     }
// };`,
//         },
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
