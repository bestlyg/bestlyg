import { Markdown, Difficulty, Tag, Script } from '@/base';

const leetCodeMarkdown: Markdown = {
  exist: !true,
  name: '1032. 字符流',
  url: 'https://leetcode.cn/problems/stream-of-characters/',
  difficulty: Difficulty.中等,
  tag: [Tag.广度优先搜索, Tag.数组, Tag.矩阵],
  desc: `设计一个算法：接收一个字符流，并检查这些字符的后缀是否是字符串数组 words 中的一个字符串。`,
  solutions: [
    {
      script: Script.CPP,
      time: 140,
      memory: 90.7,
      desc: 'ac自动机，对每个trie的无效节点赋值下一跳',
      code: `struct TrieNode {
    bool end;
    TrieNode *fail, *children[26];
    TrieNode(): end(false), fail(nullptr) {
        memset(children, 0, sizeof(children));
    }
};

class StreamChecker {
public:
    TrieNode *root, *current;
    StreamChecker(vector<string>& words): root(new TrieNode()), current(root) {
        for (auto &word : words) {
            TrieNode *node = root;
            for (auto &c : word) {
                int idx = c - 'a';
                if (!node->children[idx]) node->children[idx] = new TrieNode();
                node = node->children[idx];
            }
            node->end = true;
        }
        queue<TrieNode *> q;
        for (int i = 0; i < 26; i++) {
            if (root->children[i]) root->children[i]->fail = root, q.push(root->children[i]);
            else root->children[i] = root;
        }
        while (q.size()) {
            TrieNode *node = q.front();
            q.pop();
            node->end = node->end || node->fail->end;
            for (int i = 0; i < 26; i++) {
                if (node->children[i]) node->children[i]->fail = node->fail->children[i], q.push(node->children[i]);
                else node->children[i] = node->fail->children[i];
            }
        }
    }

    bool query(char letter) {
        current = current->children[letter - 'a'];
        return current->end;
    }
};`,
    },
    {
      script: Script.PY3,
      time: 544,
      memory: 50.4,
      desc: '同上',
      code: `from queue import Queue

class TrieNode:
    def __init__(self) -> None:
        self.end = False
        self.fail = None
        self.children: List[TrieNode] = [None] * 26


class StreamChecker:

    def __init__(self, words: List[str]):
        self.root = self.current = TrieNode()
        for word in words:
            node = self.root
            for c in word:
                idx = ord(c) - ord('a')
                if not node.children[idx]:
                    node.children[idx] = TrieNode()
                node = node.children[idx]
            node.end = True
        q = Queue()
        self.root.fail = self.root
        for i in range(26):
            if self.root.children[i]:
                self.root.children[i].fail = self.root
                q.put(self.root.children[i])
            else:
                self.root.children[i] = self.root
        while q.qsize():
            node: TrieNode = q.get()
            node.end = node.end or node.fail.end
            for i in range(26):
                if node.children[i]:
                    node.children[i].fail = node.fail.children[i]
                    q.put(node.children[i])
                else:
                    node.children[i] = node.fail.children[i]

    def query(self, letter: str) -> bool:
        self.current = self.current.children[ord(letter) - ord('a')]
        return self.current.end`,
    },
    {
      script: Script.RUST,
      time: 56,
      memory: 33.4,
      desc: '同上',
      code: `pub use std::{cell::RefCell, rc::Rc};
struct TrieNode {
    end: bool,
    fail: Option<Rc<RefCell<TrieNode>>>,
    children: Vec<Option<Rc<RefCell<TrieNode>>>>,
}
impl TrieNode {
    fn new() -> Rc<RefCell<Self>> {
        Rc::new(RefCell::new(Self {
            end: false,
            fail: None,
            children: vec![None; 26],
        }))
    }
}
struct StreamChecker {
    root: Rc<RefCell<TrieNode>>,
    current: Rc<RefCell<TrieNode>>,
}
impl StreamChecker {
    fn new(words: Vec<String>) -> Self {
        let root = TrieNode::new();
        let current = root.clone();
        for word in words {
            let mut node = root.clone();
            for c in word.chars() {
                let idx = c as usize - 'a' as usize;
                let node_ref = node.as_ref();
                {
                    let mut node = node_ref.borrow_mut();
                    if node.children[idx].is_none() {
                        node.children[idx] = Some(TrieNode::new());
                    }
                }
                let next_node = node_ref.borrow().children[idx].clone().unwrap();
                node = next_node;
            }
            node.as_ref().borrow_mut().end = true;
        }
        let mut q = std::collections::VecDeque::<Rc<RefCell<TrieNode>>>::new();
        {
            let mut root_ref = root.as_ref().borrow_mut();
            for i in 0..26 {
                if root_ref.children[i].is_some() {
                    q.push_back(root_ref.children[i].clone().unwrap());
                    root_ref.children[i]
                        .clone()
                        .unwrap()
                        .as_ref()
                        .borrow_mut()
                        .fail = Some(root.clone());
                } else {
                    root_ref.children[i] = Some(root.clone());
                }
            }
        }
        while !q.is_empty() {
            let node = q.pop_front().unwrap();
            {
                let node = node.as_ref();
                let end = node.borrow().end;
                node.borrow_mut().end =
                    end || node.borrow().fail.as_ref().unwrap().as_ref().borrow().end;
            }
            for i in 0..26 {
                let node = node.as_ref();
                let fail_node = node
                    .borrow()
                    .fail
                    .as_ref()
                    .unwrap()
                    .as_ref()
                    .borrow()
                    .children[i]
                    .clone();
                if node.borrow().children[i].is_some() {
                    q.push_back(node.borrow().children[i].clone().unwrap());
                    let child = node.borrow().children[i].clone().unwrap();
                    child.as_ref().borrow_mut().fail = fail_node.clone();
                } else {
                    node.borrow_mut().children[i] = fail_node.clone();
                }
            }
        }
        Self { root, current }
    }

    fn query(&mut self, letter: char) -> bool {
        let current = self.current.as_ref();
        let next = current.borrow().children[letter as usize - 'a' as usize]
            .as_ref()
            .unwrap()
            .clone();
        self.current = next;
        self.current.as_ref().borrow().end
    }
}`,
    },
  ],
};

export default leetCodeMarkdown;
