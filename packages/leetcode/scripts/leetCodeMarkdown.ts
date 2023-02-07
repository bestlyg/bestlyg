import { Markdown, Difficulty, Tag, Script } from '@/base';

const leetCodeMarkdown: Markdown = {
  exist: !true,
  name: '1604. 警告一小时内使用相同员工卡大于等于三次的人',
  url: 'https://leetcode.cn/problems/alert-using-same-key-card-three-or-more-times-in-a-one-hour-period/',
  difficulty: Difficulty.中等,
  tag: [Tag.广度优先搜索, Tag.数组, Tag.矩阵],
  desc: `请你返回去重后的收到系统警告的员工名字，将它们按 字典序升序 排序后返回。`,
  solutions: [
    {
      script: Script.CPP,
      time: 236,
      memory: 97.4,
      desc: '遍历',
      code: `class Solution {
public:
    vector<string> alertNames(vector<string>& keyName, vector<string>& keyTime) {
        unordered_map<string, vector<int>> m;
        vector<string> ans;
        for (int i = 0; i < keyName.size(); i++) {
            string &name = keyName[i];
            int time = (keyTime[i][0] * 10 + keyTime[i][1]) * 60 + keyTime[i][3] * 10 + keyTime[i][4];
            m[name].push_back(time);
        }
        for (auto &item : m) {
            sort(item.second.begin(), item.second.end());
            for (int i = 2; i < item.second.size(); i++) {
                if (item.second[i] - item.second[i - 2] <= 60) {
                    ans.push_back(item.first);
                    break;
                }
            }
        }
        sort(ans.begin(), ans.end());
        return ans;
    }
};`,
    },
    {
      script: Script.PY3,
      time: 188,
      memory: 36.8,
      desc: '同上',
      code: `class Solution:
    def alertNames(self, keyName: List[str], keyTime: List[str]) -> List[str]:
        m = defaultdict(list)
        for i in range(len(keyName)):
            time = (ord(keyTime[i][0]) * 10 + ord(keyTime[i][1])) * \
                60 + ord(keyTime[i][3]) * 10 + ord(keyTime[i][4])
            m[keyName[i]].append(time)
        ans = []
        for k, v in m.items():
            v.sort()
            for i in range(2, len(v)):
                if v[i] - v[i - 2] <= 60:
                    ans.append(k)
                    break
        ans.sort()
        return ans`,
    },
    {
      script: Script.RUST,
      time: 76,
      memory: 18.6,
      desc: '同上',
      code: `impl Solution {
  pub fn alert_names(key_name: Vec<String>, key_time: Vec<String>) -> Vec<String> {
      use std::collections::HashMap;
      let mut m = HashMap::<String, Vec<i32>>::new();
      let mut key_name = key_name.into_iter();
      let mut key_time = key_time.into_iter();
      loop {
          let key_name = key_name.next();
          let key_time = key_time.next().map(|time| {
              let time = time.chars().map(|v| v as i32).collect::<Vec<i32>>();
              (time[0] * 10 + time[1]) * 60 + time[3] * 10 + time[4]
          });
          if key_name.is_none() {
              break;
          }
          let list = m.entry(key_name.unwrap()).or_insert(Vec::new());
          list.push(key_time.unwrap());
      }
      let mut ans = Vec::new();
      for (k, mut v) in m {
          v.sort();
          for i in 2..v.len() {
              if v[i] - v[i - 2] <= 60 {
                  ans.push(k);
                  break;
              }
          }
      }
      ans.sort();
      ans
  }`
,
    },
  ],
};

export default leetCodeMarkdown;
