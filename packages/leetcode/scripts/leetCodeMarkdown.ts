import { Markdown, Difficulty, Tag, Script } from '@/base';
import { backquote } from '@/utils';

const leetCodeMarkdown: Markdown = {
    exist:! true,
    name: '18. 四数之和',
    url: 'https://leetcode.cn/problems/4sum/',
    difficulty: Difficulty.简单,
    tag: [],
    desc: `给你一个由 n 个整数组成的数组 nums ，和一个目标值 target 。请你找出并返回满足下述全部条件且不重复的四元组 [nums[a], nums[b], nums[c], nums[d]] 。`,
    solutions: [
                {
                    script: Script.JS,
                    time: 92,
                    memory: 39.7,
                    desc: '双指针',
                    code: `/**
* @param {number[]} nums
* @param {number} target
* @return {number[][]}
*/
var fourSum = function(nums, target) {
    const quadruplets = [];
    if (nums.length < 4) {
        return quadruplets;
    }
    nums.sort((x, y) => x - y);
    const length = nums.length;
    for (let i = 0; i < length - 3; i++) {
        if (i > 0 && nums[i] === nums[i - 1]) {
            continue;
        }
        if (nums[i] + nums[i + 1] + nums[i + 2] + nums[i + 3] > target) {
            break;
        }
        if (nums[i] + nums[length - 3] + nums[length - 2] + nums[length - 1] < target) {
            continue;
        }
        for (let j = i + 1; j < length - 2; j++) {
            if (j > i + 1 && nums[j] === nums[j - 1]) {
                continue;
            }
            if (nums[i] + nums[j] + nums[j + 1] + nums[j + 2] > target) {
                break;
            }
            if (nums[i] + nums[j] + nums[length - 2] + nums[length - 1] < target) {
                continue;
            }
            let left = j + 1, right = length - 1;
            while (left < right) {
                const sum = nums[i] + nums[j] + nums[left] + nums[right];
                if (sum === target) {
                    quadruplets.push([nums[i], nums[j], nums[left], nums[right]]);
                    while (left < right && nums[left] === nums[left + 1]) {
                        left++;
                    }
                    left++;
                    while (left < right && nums[right] === nums[right - 1]) {
                        right--;
                    }
                    right--;
                } else if (sum < target) {
                    left++;
                } else {
                    right--;
                }
            }
        }
    }
    return quadruplets;
};`,
        },
        {
            script: Script.CPP,
            time: 44,
            memory: 12.8,
            desc: '双指针',
            code: `class Solution {
public:
    vector<vector<int>> fourSum(vector<int>& nums, int target) {
        int n = nums.size();
        vector<vector<int>> res;
        sort(nums.begin(), nums.end());
        for (int i = 0; i + 3 < n && (nums[i] <= target || nums[i] < 0); i++) {
            if (i > 0 && nums[i] == nums[i - 1]) continue;
            for (int j = i + 1; j + 2 < n && (nums[i] + nums[j] <= target || nums[j] < 0); j++) {
                if (j > i + 1 && nums[j] == nums[j - 1]) continue;
                long long num = nums[i] + nums[j];
                int l = j + 1, r = n - 1;
                while (l < r) {
                    if (num + nums[l] + nums[r] > target) r--;
                    else if (num + nums[l] + nums[r] < target)  l++;
                    else {
                        res.push_back({ nums[i], nums[j], nums[l], nums[r] });
                        while (l + 1 < r && nums[l + 1] == nums[l]) l++;
                        while (r - 1 > l && nums[r - 1] == nums[r]) r--;
                        l++;
                        r--;
                    }
                }
            }
        }
        return res;
    }
};`,
        },
        {
            script: Script.PY,
            time: 500,
            memory: 16.1,
            desc: '同上',
            code: `class Solution:
    def fourSum(self, nums: List[int], target: int) -> List[List[int]]:
        n = len(nums)
        res = []
        nums.sort()
        i = 0
        while i + 3 < n and (nums[i] <= target or nums[i] < 0):
            if i > 0 and nums[i] == nums[i - 1]:
                i += 1
                continue
            j = i + 1
            while j + 2 < n and (nums[i] + nums[j] <= target or nums[j] < 0):
                if j > i + 1 and nums[j] == nums[j-1]:
                    j += 1
                    continue
                num = nums[i] + nums[j]
                l = j + 1
                r = n-1
                while l < r:
                    if num + nums[l] + nums[r] > target:
                        r -= 1
                    elif num + nums[l] + nums[r] < target:
                        l += 1
                    else:
                        res.append([nums[i], nums[j], nums[l], nums[r]])
                        while l + 1 < r and nums[l + 1] == nums[l]:
                            l += 1
                        while r - 1 > l and nums[r - 1] == nums[r]:
                            r -= 1
                        l += 1
                        r -= 1
                j += 1
            i += 1
        return res`,
        },
        {
            script: Script.RUST,
            time: 4,
            memory: 2,
            desc: '同上',
            code: `impl Solution {
    pub fn four_sum(mut nums: Vec<i32>, target: i32) -> Vec<Vec<i32>> {
        let n = nums.len();
        let mut res = vec![];
        nums.sort();
        let mut i = 0;
        while i + 3 < n && (nums[i] <= target || nums[i] < 0) {
            if i > 0 && nums[i] == nums[i - 1] {
                i += 1;
                continue;
            }
            let mut j = i + 1;
            while j + 2 < n && (nums[i] + nums[j] <= target || nums[j] < 0) {
                if j > i + 1 && nums[j] == nums[j - 1] {
                    j += 1;
                    continue;
                }
                let num = (nums[i] + nums[j]) as i64;
                let mut l = j + 1;
                let mut r = n - 1;
                while l < r {
                    let num = num + nums[l] as i64 + nums[r] as i64;
                    let target = target as i64;
                    if num > target {
                        r -= 1;
                    } else if num < target {
                        l += 1;
                    } else {
                        res.push(vec![nums[i], nums[j], nums[l], nums[r]]);
                        while l + 1 < r && nums[l + 1] == nums[l] {
                            l += 1;
                        }
                        while r - 1 > l && nums[r - 1] == nums[r] {
                            r -= 1;
                        }
                        l += 1;
                        r -= 1;
                    }
                }
                j += 1;
            }
            i += 1;
        }
        res
    }
}`,
        },
    ],
};

export default leetCodeMarkdown;
