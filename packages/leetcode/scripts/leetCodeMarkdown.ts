import { Markdown, Difficulty, Tag, Script } from '@/base';
import { backquote } from '@/utils';

const leetCodeMarkdown: Markdown = {
    exist: true,
    name: '88. 合并两个有序数组',
    url: 'https://leetcode.cn/problems/merge-k-sorted-lists/',
    difficulty: Difficulty.简单,
    tag: [],
    desc: `给你一个链表数组，每个链表都已经按升序排列。请你将所有链表合并到一个升序链表中，返回合并后的链表。`,
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
        //     date: new Date('2021.05.13').getTime(),
        //     script: Script.TS,
        //     time: 220,
        //     memory: 48.3,
        //     desc: '归并排序',
        //     code: ``,
        // },
        {
            script: Script.CPP,
            time: 0,
            memory: 8.77,
            desc: '双指针遍历',
            code: `class Solution {
public:
    void merge(vector<int>& nums1, int m, vector<int>& nums2, int n) {
        for (int idx = nums1.size() - 1, i1 = m - 1, i2 = n - 1; idx >= 0; idx--) {
            if (i2 < 0 || i1 >= 0 && nums1[i1] > nums2[i2]) {
                nums1[idx] = nums1[i1--];
            } else {
                nums1[idx] = nums2[i2--];
            }
        }
    }
};`,
        },
        {
            script: Script.PY,
            time: 44,
            memory: 15.68,
            desc: '同上',
            code: `class Solution:
    def merge(self, nums1: List[int], m: int, nums2: List[int], n: int) -> None:
        i1 = m-1
        i2 = n-1
        for idx in range(len(nums1) - 1, -1, -1):
            if i2 < 0 or i1 >= 0 and nums1[i1] > nums2[i2]:
                nums1[idx] = nums1[i1]
                i1 -= 1
            else:
                nums1[idx] = nums2[i2]
                i2 -= 1`,
        },
        {
            script: Script.RUST,
            time: 0,
            memory: 2.09,
            desc: '同上',
            code: `impl Solution {
    pub fn merge(nums1: &mut Vec<i32>, m: i32, nums2: &mut Vec<i32>, n: i32) {
        let m = m as usize;
        let n = n as usize;
        let mut i1 = m - 1;
        let mut i2 = n - 1;
        for idx in (0..nums1.len()).rev() {
            if i2 >= n || i1 < m && nums1[i1] > nums2[i2] {
                nums1[idx] = nums1[i1];
                i1 -= 1;
            } else {
                nums1[idx] = nums2[i2];
                i2 -= 1;
            }
        }
    }
}`,
        },
    ],
};

export default leetCodeMarkdown;
