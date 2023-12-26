import { Markdown, Difficulty, Tag, Script } from '@/base';
import { backquote } from '@/utils';

const leetCodeMarkdown: Markdown = {
    exist: !true,
    name: '1349. 参加考试的最大学生数',
    url: 'https://leetcode.cn/problems/maximum-students-taking-exam',
    difficulty: Difficulty.简单,
    tag: [],
    desc: `请你计算并返回该考场可以容纳的同时参加考试且无法作弊的 最大 学生人数。`,
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
        //         time: 40,
        //         memory: 16.8,
        //         desc: '二元一次方程',
        //         code: `class Solution:
        // def numOfBurgers(self, tomatoSlices: int, cheeseSlices: int) -> List[int]:
        //     # 4x + 2y = num1
        //     # x  + y  = num2
        //     # x = (num1 - 2num2) / 2
        //     # y = num2 - x
        //     x = (tomatoSlices - 2 * cheeseSlices) // 2
        //     y = cheeseSlices - x
        //     return [x, y] if x >= 0 and y >= 0 and 4 * x + 2 * y == tomatoSlices and x + y == cheeseSlices else []`,
        //     },
        // {
        //     script: Script.CPP,
        //     time: 432,
        //     memory: 181.94,
        //     desc: '平衡二叉树',
        //     code: ``,
        // },
        {
            script: Script.RUST,
            time: 4,
            memory: 2.05,
            desc: '状态压缩，动态规划每一层的所有状态',
            code: `use std::collections::HashMap;
fn is1(num: usize, offset: usize) -> bool {
    return (num & (1 << offset)) != 0;
}
fn check1(seats: &Vec<Vec<char>>, row: usize, used: usize) -> bool {
    let mut prev = false;
    for col in 0..seats[0].len() {
        if is1(used, col) {
            if prev || seats[row][col] == '#' {
                return false;
            }
            prev = true;
        } else {
            prev = false;
        }
    }
    true
}
fn check2(seats: &Vec<Vec<char>>, used: usize, pre_used: usize) -> bool {
    for col in 0..seats[0].len() {
        if is1(used, col)
            && (col - 1 >= 0 && is1(pre_used, col - 1)
                || col + 1 < seats[0].len() && is1(pre_used, col + 1))
        {
            return false;
        }
    }
    true
}
fn dfs(
    seats: &Vec<Vec<char>>,
    cache: &mut HashMap<usize, HashMap<usize, i32>>,
    pre_used: usize,
    row: usize,
) -> i32 {
    if row < seats.len() {
        if let Some(Some(res)) = cache.get(&row).map(|item| item.get(&pre_used)) {
            *res
        } else {
            let res = (0..(1 << seats[0].len()))
                .map(|used| {
                    if check1(seats, row, used) && check2(seats, used, pre_used) {
                        used.count_ones() as i32 + dfs(seats, cache, used, row + 1)
                    } else {
                        0
                    }
                })
                .max()
                .unwrap();
            cache.entry(row).or_default().entry(pre_used).or_insert(res);
            res
        }
    } else {
        0
    }
}
impl Solution {
    pub fn max_students(seats: Vec<Vec<char>>) -> i32 {
        let mut cache = HashMap::new();
        (0..(1 << seats[0].len()))
            .map(|used| {
                if check1(&seats, 0, used) {
                    used.count_ones() as i32 + dfs(&seats, &mut cache, used, 1)
                } else {
                    0
                }
            })
            .max()
            .unwrap()
    }
}`,
        },
    ],
};

export default leetCodeMarkdown;
