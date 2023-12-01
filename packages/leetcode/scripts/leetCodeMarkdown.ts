import { Markdown, Difficulty, Tag, Script } from '@/base';
import { backquote } from '@/utils';

const leetCodeMarkdown: Markdown = {
    exist: !true,
    name: '2661. 找出叠涂元素',
    url: 'https://leetcode.cn/problems/first-completely-painted-row-or-column',
    difficulty: Difficulty.简单,
    tag: [],
    desc: `请你找出 arr 中在 mat 的某一行或某一列上都被涂色且下标最小的元素，并返回其下标 i 。`,
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
        // {
        //     date: new Date('2022.06.20').getTime(),
        //     script: Script.CPP,
        //     time: 200,
        //     memory: 66.95,
        //     desc: '有序集合',
        //     code: ``,
        // },
        {
            script: Script.PY,
            time: 192,
            memory: 49.78,
            desc: '哈希计数',
            code: `class Solution:
    def firstCompleteIndex(self, arr: List[int], mat: List[List[int]]) -> int:
        n = len(mat)
        m = len(mat[0])
        map = {mat[i][j]: (i, j) for i in range(n) for j in range(m)}
        rows = [0] * n
        cols = [0] * m
        for idx, num in enumerate(arr):
            i, j = map[num]
            rows[i] += 1
            cols[j] += 1
            if rows[i] == m or cols[j] == n: return idx`,
        },
        {
            script: Script.RUST,
            time: 40,
            memory: 11.39,
            desc: '同上',
            code: `impl Solution {
    pub fn first_complete_index(arr: Vec<i32>, mat: Vec<Vec<i32>>) -> i32 {
        let n = mat.len();
        let m = mat[0].len();
        let mut map = std::collections::HashMap::<i32, (usize, usize)>::new();
        for i in 0..n {
            for j in 0..m {
                map.insert(mat[i][j], (i, j));
            }
        }
        let mut rows = vec![0; n];
        let mut cols = vec![0; m];
        for (idx, num) in arr.into_iter().enumerate() {
            let (i, j) = map.get(&num).unwrap();
            rows[*i] += 1;
            cols[*j] += 1;
            if rows[*i] == m || cols[*j] == n {
                return idx as i32;
            }
        }
        0
    }
}`,
        },
    ],
};

export default leetCodeMarkdown;
