import { Markdown, Difficulty, Tag, Script } from '@/base';
import { backquote } from '@/utils';

const leetCodeMarkdown: Markdown = {
    exist: !true,
    name: '1276. 不浪费原料的汉堡制作方案',
    url: 'https://leetcode.cn/problems/number-of-burgers-with-no-waste-of-ingredients/',
    difficulty: Difficulty.简单,
    tag: [],
    desc: `请你以 [total_jumbo, total_small]（[巨无霸汉堡总数，小皇堡总数]）的格式返回恰当的制作方案，使得剩下的番茄片 tomatoSlices 和奶酪片 cheeseSlices 的数量都是 0。`,
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
            time: 40,
            memory: 16.8,
            desc: '二元一次方程',
            code: `class Solution:
    def numOfBurgers(self, tomatoSlices: int, cheeseSlices: int) -> List[int]:
        # 4x + 2y = num1
        # x  + y  = num2
        # x = (num1 - 2num2) / 2
        # y = num2 - x
        x = (tomatoSlices - 2 * cheeseSlices) // 2
        y = cheeseSlices - x
        return [x, y] if x >= 0 and y >= 0 and 4 * x + 2 * y == tomatoSlices and x + y == cheeseSlices else []`,
        },
        // {
        //     script: Script.CPP,
        //     time: 432,
        //     memory: 181.94,
        //     desc: '平衡二叉树',
        //     code: ``,
        // },
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
