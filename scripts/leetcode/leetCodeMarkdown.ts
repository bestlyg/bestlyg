import { specStr, markdown } from '../utils';
import { Markdown, Difficulty, Tag, Script } from './leetcode';

const { backquote } = specStr;
const { link } = markdown;
const leetCodeMarkdown: Markdown = {
  exist: !true,
  name: '442. 数组中重复的数据',
  url: 'https://leetcode-cn.com/problems/find-all-duplicates-in-an-array/',
  difficulty: Difficulty.中等,
  tag: [Tag.数组, Tag.哈希表],
  desc: `给你一个长度为 n 的整数数组 nums ，其中 nums 的所有整数都在范围 [1, n] 内，且每个整数出现 一次 或 两次 。请你找出所有出现 两次 的整数，并以数组形式返回。`,
  solutions: [
    {
      script: Script.CPP,
      time: 80,
      memory: 43.5,
      desc: '哈希存储',
      code: `class Solution {
   public:
    vector<int> findDuplicates(vector<int>& nums) {
        unordered_set<int> s;
        vector<int> ans;
        for (auto& num : nums) {
            if (s.count(num))
                ans.push_back(num);
            else
                s.insert(num);
        }
        return ans;
    }
};`,
    },
    {
      script: Script.CPP,
      time: 24,
      memory: 32.7,
      desc: '遍历，与对应索引的位置进行交换，如果索引上已存在说明重复',
      code: `class Solution {
   public:
    vector<int> findDuplicates(vector<int>& nums) {
        vector<int> ans;
        for (int i = 0; i < nums.size(); i++) {
            while (nums[i] != nums[nums[i] - 1])
                swap(nums[i], nums[nums[i] - 1]);
        }
        for (int i = 0; i < nums.size(); i++) {
            if (nums[i] != i + 1) ans.push_back(nums[i]);
        }
        return ans;
    }
};`,
    },
    {
      script: Script.CPP,
      time: 48,
      memory: 32.7,
      desc: '遍历，对应位置取负',
      code: `class Solution {
   public:
    vector<int> findDuplicates(vector<int>& nums) {
        vector<int> ans;
        for (int i = 0; i < nums.size(); i++) {
            int num = abs(nums[i]);
            if (nums[num - 1] < 0)
                ans.push_back(num);
            else
                nums[num - 1] *= -1;
        }
        return ans;
    }
};`,
    },
  ],
};
export default leetCodeMarkdown;
