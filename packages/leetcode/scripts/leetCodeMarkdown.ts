import { Markdown, Difficulty, Tag, Script } from '@/base';
import { backquote } from '@/utils';

const leetCodeMarkdown: Markdown = {
    exist: true,
    name: '421. 数组中两个数的最大异或值',
    url: 'https://leetcode.cn/problems/maximum-xor-of-two-numbers-in-an-array',
    difficulty: Difficulty.简单,
    tag: [],
    desc: `给你一个整数数组 nums ，返回 nums[i] XOR nums[j] 的最大运算结果，其中 0 ≤ i ≤ j < n 。`,
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
        {
            script: Script.CPP,
            time: 716,
            memory: 172.36,
            desc: '同上',
            code: `struct TrieNode {
    TrieNode* left = nullptr;
    TrieNode* right = nullptr;
};

void add(TrieNode* node, int num) {
    int pos = 30;
    while (pos >= 0) {
        int v = (num >> pos) & 1;
        if (v) {
            if (!node->left) node->left = new TrieNode();
            node = node->left;
        } else {
            if (!node->right) node->right = new TrieNode();
            node = node->right;
        }
        pos -= 1;
    }
}

int find(TrieNode* node, int num) {
    int pos = 30, ans = 0;
    while (pos >= 0 && node) {
        int v = (num >> pos) & 1;
        if (v) {
            if (node->right) {
                ans |= 1 << pos;
                node = node->right;
            } else node = node->left;
        } else {
            if (node->left) {
                ans |= 1 << pos;
                node = node->left;
            } else node = node->right;
        }
        pos -= 1;
    }
    return ans;
}

class Solution {
public:
    int findMaximumXOR(vector<int>& nums) {
        TrieNode *root = new TrieNode();
        int ans = 0;
        for (auto &num : nums) {
            add(root, num);
            ans = max(ans, find(root, num));
        }
        return ans;
    }
};`,
        },
        {
            script: Script.PY,
            time: 9296,
            memory: 444.3,
            desc: '同上',
            code: `class TrieNode:
    def __init__(self):
        self.left = self.right = None
    
def add(node, num: int, pos: int):
    while pos >= 0:
        v = (num >> pos) & 1
        if v:
            if not node.left: node.left = TrieNode()
            node = node.left
        else:
            if not node.right: node.right = TrieNode()
            node = node.right
        pos -= 1
        

def find(node, num: int, pos: int):
    ans = 0
    while pos >= 0 and node:
        v = (num >> pos) & 1
        if v: 
            if node.right:
                ans |= 1 << pos
                node = node.right
            else:
                node = node.left
        else:
            if node.left:
                ans |= 1 << pos
                node = node.left
            else:
                node = node.right
        pos -= 1
    return ans

class Solution:
    def findMaximumXOR(self, nums: List[int]) -> int:
        root = TrieNode()
        ans = 0
        for num in nums: 
            add(root, num, 30)
            ans = max(ans, find(root, num, 30))
        return ans`,
        },
        {
            script: Script.RUST,
            time: 564,
            memory: 85,
            desc: '同上',
            code: `struct TrieNode {
    left: Option<Box<TrieNode>>,
    right: Option<Box<TrieNode>>,
}
impl TrieNode {
    fn new() -> Self {
        Self {
            left: None,
            right: None,
        }
    }
}

fn add(mut node: &mut Box<TrieNode>, num: i32) {
    let mut pos = 30;
    while pos >= 0 {
        let v = (num >> pos) & 1;
        if v != 0 {
            if node.left.is_none() {
                node.left = Some(Box::new(TrieNode::new()));
            }
            node = node.left.as_mut().unwrap()
        } else {
            if node.right.is_none() {
                node.right = Some(Box::new(TrieNode::new()));
            }
            node = node.right.as_mut().unwrap()
        }
        pos -= 1;
    }
}

fn find(mut node: &Box<TrieNode>, num: i32) -> i32 {
    let mut pos = 30;
    let mut ans = 0;
    let mut node = Some(node);
    while pos >= 0 && node.is_some() {
        let node_ref = node.unwrap();
        let v = (num >> pos) & 1;
        if v != 0 {
            if node_ref.right.is_some() {
                ans |= 1 << pos;
                node = Some(node_ref.right.as_ref().unwrap());
            } else if node_ref.left.is_some() {
                node = Some(node_ref.left.as_ref().unwrap());
            } else {
                node = None;
            }
        } else {
            if node_ref.left.is_some() {
                ans |= 1 << pos;
                node = Some(node_ref.left.as_ref().unwrap());
            } else if node_ref.right.is_some() {
                node = Some(node_ref.right.as_ref().unwrap());
            } else {
                node = None;
            }
        }
        pos -= 1;
    }
    ans
}

impl Solution {
    pub fn find_maximum_xor(nums: Vec<i32>) -> i32 {
        let mut root = Box::new(TrieNode::new());
        let mut ans = 0;
        for num in &nums {
            add(&mut root, *num);
        }
        for num in &nums {
            ans = ans.max(find(&root, *num));
        }
        ans
    }
}`,
        },
    ],
};

export default leetCodeMarkdown;
