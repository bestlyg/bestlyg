import { Markdown, Difficulty, Tag, Script } from '@/base';

const leetCodeMarkdown: Markdown = {
  exist: !true,
  name: '1630. 等差子数组',
  url: 'https://leetcode.cn/problems/arithmetic-subarrays/',
  difficulty: Difficulty.中等,
  tag: [Tag.广度优先搜索, Tag.数组, Tag.矩阵],
  desc: `返回 boolean 元素构成的答案列表 answer 。如果子数组 nums[l[i]], nums[l[i]+1], ... , nums[r[i]] 可以 重新排列 形成 等差数列 ，answer[i] 的值就是 true；否则answer[i] 的值就是 false 。`,
  solutions: [
    {
      script: Script.CPP,
      time: 20,
      memory: 20.2,
      desc: '多次遍历，对每个区间枚举所有值',
      code: `class Solution {
public:
    vector<bool> checkArithmeticSubarrays(vector<int>& nums, vector<int>& l, vector<int>& r) {
        vector<bool> res(l.size(), 0);
        for (int i = 0; i < l.size(); i++) {
            int left = l[i], right = r[i], size = right - left,
                nmax = *max_element(nums.begin() + left, nums.begin() + right + 1), 
                nmin = *min_element(nums.begin() + left, nums.begin() + right + 1);
            if ((nmax - nmin) % size != 0) res[i] = false;
            else if (nmin == nmax) res[i] = true;
            else {
                bool f = true;
                int step = (nmax - nmin) / size, list[size + 1];
                memset(list, 0, sizeof(int) * (size + 1));
                for (int i = left; i <= right && f; i++) {
                    int val = (nums[i] - nmin) / step;
                    if ((nums[i] - nmin) % step != 0 || list[val] != 0) f = false;
                    else list[val] = 1;
                }
                res[i] = f;
            }
        }
        return res;
    }
};`,
    },
    {
      script: Script.PY3,
      time: 96,
      memory: 15,
      desc: '同上',
      code: `class Solution:
    def checkArithmeticSubarrays(self, nums: List[int], l: List[int], r: List[int]) -> List[bool]:
        def check(i: int):
            left, right = l[i], r[i]
            size = right-left
            nmax, nmin = max(nums[left:right + 1]), min(nums[left:right+1])
            if (nmax - nmin) % size != 0:
                return False
            elif nmin == nmax:
                return True
            else:
                step = (nmax - nmin) // size
                arr = [False] * (size + 1)
                for i in range(left, right+1):
                    val = (nums[i] - nmin) // step
                    if (nums[i] - nmin) % step != 0 or arr[val]:
                        return False
                    else:
                        arr[val] = True
                return True
        return [check(i) for i in range(len(l))]`,
    },
    {
      script: Script.RUST,
      time: 8,
      memory: 2,
      desc: '同上',
      code: `impl Solution {
    pub fn check_arithmetic_subarrays(nums: Vec<i32>, l: Vec<i32>, r: Vec<i32>) -> Vec<bool> {
        let check = |i| -> bool {
            let (left, right) = (l[i] as usize, r[i] as usize);
            let size = right - left;
            let (nmax, nmin) = (*nums[left..=right].iter().max().unwrap(), *nums[left..=right].iter().min().unwrap());
            if (nmax - nmin) % (size as i32) != 0 {
                false
            } else if nmax == nmin {
                true
            } else {
                let step = (nmax - nmin) / (size as i32);
                let mut arr = vec![false; (size + 1) as usize];
                for i in left..=right {
                    let val = ((nums[i] - nmin) / step) as usize;
                    if (nums[i] - nmin) % step != 0 || arr[val] {
                        return false;
                    }
                    arr[val] = true;
                }
                true
            }
        };
        (0..l.len()).map(|i| check(i)).collect::<Vec<bool>>()
    }
}`,
    },
  ],
};

export default leetCodeMarkdown;
