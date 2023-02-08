import { Markdown, Difficulty, Tag, Script } from '@/base';

const leetCodeMarkdown: Markdown = {
  exist: !true,
  name: '1233. 删除子文件夹',
  url: 'https://leetcode.cn/problems/remove-sub-folders-from-the-filesystem/',
  difficulty: Difficulty.中等,
  tag: [Tag.广度优先搜索, Tag.数组, Tag.矩阵],
  desc: `你是一位系统管理员，手里有一份文件夹列表 folder，你的任务是要删除该列表中的所有 子文件夹，并以 任意顺序 返回剩下的文件夹。`,
  solutions: [
    {
      script: Script.CPP,
      time: 208,
      memory: 51.4,
      desc: 'trie',
      code: `struct Node {
    bool end;
    unordered_map<string, Node*> children;
    Node(): end(false) {}
};
class Solution {
public:
    vector<string> removeSubfolders(vector<string>& folder) {
        sort(folder.begin(), folder.end());
        Node *root = new Node();
        vector<string> ans;
        for (auto &path : folder) {
            Node *next = root;
            istringstream iss(path);
            string tmp;
            getline(iss, tmp, '/');
            while (getline(iss, tmp, '/')) {
                if (!next->children.count(tmp)) next = next->children[tmp] = new Node();
                else next = next->children[tmp];
                if (next->end) break;
            }
            if (!next->end) ans.push_back(path);
            next->end = true;
        }
        return ans;
    }
};`,
    },
    {
      script: Script.PY3,
      time: 140,
      memory: 25.4,
      desc: '同上',
      code: `class Node:
    def __init__(self) -> None:
        self.end = False
        self.children = defaultdict(Node)

class Solution:
    def removeSubfolders(self, folder: List[str]) -> List[str]:
        folder.sort()
        root = Node()
        ans = []
        for path in folder:
            nextNode = root
            l = path.split('/')
            for i in range(1, len(l)):
                nextNode = nextNode.children[l[i]]
                if nextNode.end:
                    break
            if not nextNode.end:
                ans.append(path)
            nextNode.end = True
        return ans`,
    },
    {
      script: Script.RUST,
      time: 56,
      memory: 6.8,
      desc: '同上',
      code: `use std::collections::HashMap;
#[derive(Clone)]
struct Node {
    end: bool,
    children: HashMap<String, Node>,
}
impl Node {
    fn new() -> Self {
        Self {
            end: false,
            children: HashMap::new(),
        }
    }
}

impl Solution {
    pub fn remove_subfolders(folder: Vec<String>) -> Vec<String> {
        let mut folder = folder;
        folder.sort();
        let mut root = Node::new();
        let mut ans = vec![];
        for path in folder {
            let mut next = &mut root;
            let l: Vec<&str> = path.split("/").collect();
            for i in 1..l.len() {
                if !next.children.contains_key(l[i]) {
                    next.children.insert(l[i].to_string(), Node::new());
                }
                next = next.children.get_mut(l[i]).unwrap();
                if next.end {
                    break;
                }
            }
            if !next.end {
                ans.push(path);
            }
            next.end = true;
        }
        ans
    }
}`
,
    },
  ],
};

export default leetCodeMarkdown;
