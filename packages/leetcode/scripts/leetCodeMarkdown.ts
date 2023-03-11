import { Markdown, Difficulty, Tag, Script } from '@/base';

const leetCodeMarkdown: Markdown = {
  exist: !true,
  name: '面试题 17.05.  字母与数字',
  url: 'https://leetcode.cn/problems/find-longest-subarray-lcci//',
  difficulty: Difficulty.中等,
  tag: [Tag.广度优先搜索, Tag.数组, Tag.矩阵],
    desc: `给定一个放有字母和数字的数组，找到最长的子数组，且包含的字母和数字的个数相同。返回该子数组，若存在多个最长子数组，返回左端点下标值最小的子数组。若不存在这样的数组，返回一个空数组。`,
  solutions: [
    {
      script: Script.CPP,
      time: 160,
      memory: 92.1,
      desc: '前缀和',
      code: `class Solution {
public:
    vector<string> findLongestSubarray(vector<string>& array) {
        int cur = 0, resMax = 0, resIdx = -1;
        unordered_map<int, int> m;
        m[0] = -1;
        for (int i = 0; i < array.size(); i++) {
            cur += isalpha(array[i][0]) ? 1 : -1;
            if (m.count(cur) && i - m[cur] > resMax) resIdx = m[cur] + 1, resMax = i - m[cur];
            if (!m.count(cur)) m[cur] = i;
        }
        vector<string> res;
        for (int i = resIdx; i < resIdx + resMax; i++) res.push_back(array[i]);
        return res;
    }
};`,
    },
    {
      script: Script.PY3,
      time: 108,
      memory: 32.6,
      desc: '同上',
      code: `class Solution:
    def findLongestSubarray(self, array: List[str]) -> List[str]:
        cur, resMax, resIdx = 0, 0, -1
        m = dict()
        m[0] = -1
        for i in range(len(array)):
            cur += 1 if array[i].isalpha() else -1
            if cur in m and i - m[cur] > resMax:
                resIdx = m[cur] + 1
                resMax = i - m[cur]
            if cur not in m:
                m[cur] = i
        return array[resIdx:resIdx + resMax]`,
    },
    {
      script: Script.RUST,
      time: 84,
      memory: 11.4,
      desc: '同上',
      code: `impl Solution {
    pub fn find_longest_subarray(array: Vec<String>) -> Vec<String> {
        let (mut cur, mut resMax, mut resIdx) = (0, 0, 0);
        let mut m = std::collections::HashMap::<i32, i32>::new();
        m.insert(0, -1);
        for i in 0..array.len() {
            let s = array[i].chars().collect::<Vec<char>>();
            cur += if s[0].is_alphabetic() { 1 } else { -1 };
            if m.contains_key(&cur) && i as i32 - *m.get(&cur).unwrap() > resMax {
                resIdx = *m.get(&cur).unwrap() + 1;
                resMax = i as i32 - *m.get(&cur).unwrap();
            }
            if !m.contains_key(&cur) {
                m.insert(cur, i as i32);
            }
        }
        let resMax = resMax as usize;
        let resIdx = resIdx as usize;
        array[resIdx..resIdx + resMax].to_vec()
    }
}`,
    },
  ],
};

export default leetCodeMarkdown;
