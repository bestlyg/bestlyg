import { Markdown, Difficulty, Tag, Script } from '@/base';

const leetCodeMarkdown: Markdown = {
  exist: !true,
  name: '1487. 保证文件名唯一',
  url: 'https://leetcode.cn/problems/making-file-names-unique/',
  difficulty: Difficulty.中等,
  tag: [Tag.广度优先搜索, Tag.数组, Tag.矩阵],
  desc: `返回长度为 n 的字符串数组，其中 ans[i] 是创建第 i 个文件夹时系统分配给该文件夹的实际名称。`,
  solutions: [
    {
      script: Script.CPP,
      time: 168,
      memory: 57.2,
      desc: '遍历',
      code: `class Solution {
public:
    vector<string> getFolderNames(vector<string>& names) {
        unordered_map<string, int> m;
        for (int i = 0; i < names.size(); i++) {
            string name = names[i];
            if (m.count(name)) {
                for (int j = m[name]; ; j++) {
                    string next = name + "(" + to_string(j) + ")";
                    if (!m.count(next)) {
                        names[i] = next;
                        m[next] = 1;
                        m[name] = j + 1;
                        break;
                    }
                }
            } else {
                m[name] = 1;
            }
        }
        return names;
    }
};`,
    },
    {
      script: Script.PY3,
      time: 140,
      memory: 28.3,
      desc: '同上',
      code: `class Solution:
    def getFolderNames(self, names: List[str]) -> List[str]:
        m = {}
        for i in range(len(names)):
            name = names[i]
            if name in m:
                j = m[name]
                while name + "(" + str(j) + ")" in m:
                    j += 1
                next_name = name + "(" + str(j) + ")"
                names[i] = next_name
                m[next_name] = 1
                m[name] = j + 1
            else:
                m[name] = 1
        return names`,
    },
    {
      script: Script.RUST,
      time: 48,
      memory: 9.3,
      desc: '同上',
      code: `impl Solution {
    pub fn get_folder_names(names: Vec<String>) -> Vec<String> {
        let mut names = names;
        let mut m = std::collections::HashMap::<String, usize>::new();
        for i in 0..names.len() {
            let name = names[i].clone();
            if m.contains_key(&name) {
                let mut j = *m.get(&name).unwrap();
                let next;
                loop {
                    let mut item = name.clone();
                    item.push('(');
                    item.push_str(&j.to_string());
                    item.push(')');
                    if !m.contains_key(&item) {
                        next = item;
                        break;
                    }
                    j += 1;
                }
                m.insert(next.clone(), 1);
                names[i] = next.clone();
                *m.get_mut(&name).unwrap() = j + 1;
            } else {
                m.insert(name.clone(), 1);
            }
        }
        names
    }
}`,
    },
  ],
};

export default leetCodeMarkdown;
