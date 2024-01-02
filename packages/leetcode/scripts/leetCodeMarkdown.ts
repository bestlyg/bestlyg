import { Markdown, Difficulty, Tag, Script } from '@/base';
import { backquote } from '@/utils';

const leetCodeMarkdown: Markdown = {
    exist: true,
    name: '466. 统计重复个数',
    url: 'https://leetcode.cn/problems/buy-two-chocolates',
    difficulty: Difficulty.简单,
    tag: [],
    desc: `请你返回在购买两块巧克力后，最多能剩下多少钱。`,
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

        // {
        //     script: Script.PY,
        //     time: 1200,
        //     memory: 20.89,
        //     desc: '模拟',
        //     code: ``,
        // },
        //         {
        //             script: Script.CPP,
        //             time: 44,
        //             memory: 70.5,
        //             desc: '同上',
        //             code: `class Solution {
        // public:
        //     int getScore(vector<int>& player) {
        //         int cur = 0, sum = 0;
        //         for (auto &v: player) {
        //             sum += v + v * ((cur & 0b11) != 0);
        //             cur = cur << 1 | (v == 10);
        //         }
        //         return sum;
        //     }
        //     int isWinner(vector<int>& player1, vector<int>& player2) {
        //         int s1 = getScore(player1), s2 = getScore(player2);
        //         return s1 > s2 ? 1 : s2 > s1 ? 2 : 0;
        //     }
        // };`,
        //         },
        {
            script: Script.RUST,
            time: 260,
            memory: 10.65,
            desc: '同上',
            code: `fn str_to_vec(s: &String) -> Vec<char> {
    s.chars().collect()
}
impl Solution {
    pub fn get_max_repetitions(s1: String, n1: i32, s2: String, n2: i32) -> i32 {
        let (n1, n2) = (n1 as usize, n2 as usize);
        let s1 = str_to_vec(&s1);
        let s2 = str_to_vec(&s2);
        let (len1, len2) = (s1.len(), s2.len());
        let (mut k, mut idx, mut cnt) = (0, 0, 0);
        let mut arr = vec![0];
        while k < n1 {
            for i in 0..len1 {
                if s2[idx] == s1[i] {
                    idx = (idx + 1) % len2;
                    if idx == 0 {
                        cnt += 1;
                    }
                }
            }
            k += 1;
            arr.push(cnt);
            if idx == 0 {
                break;
            }
        }
        ((cnt * (n1 / k) + arr[n1 % k]) / n2) as i32
    }
}`,
        },
    ],
};

export default leetCodeMarkdown;
