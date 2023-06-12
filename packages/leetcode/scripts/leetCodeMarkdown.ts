import { Markdown, Difficulty, Tag, Script } from '@/base';
import { backquote } from '@/utils';

const leetCodeMarkdown: Markdown = {
    exist: !true,
    name: '1483. 树节点的第 K 个祖先',
    url: 'https://leetcode.cn/problems/kth-ancestor-of-a-tree-node/',
    difficulty: Difficulty.简单,
    tag: [],
    desc: `给你一棵树，树上有 n 个节点，按从 0 到 n-1 编号。树以父节点数组的形式给出，其中 parent[i] 是节点 i 的父节点。树的根节点是编号为 0 的节点。树节点的第 k 个祖先节点是从该节点到根节点路径上的第 k 个节点。`,
    solutions: [
        //         {
        //             script: Script.TS,
        //             time: 156,
        //             memory: 69,
        //             desc: '对于每个是对象的value，进行dfs',
        //             code: `type Obj = Record<any, any>;

        // function compactObject(obj: Obj): Obj {
        //     const res: any = Array.isArray(obj) ? [] : {};
        //     for (const [k, v] of Object.entries(obj)) {
        //         if (Boolean(v)) {
        //             const newv = typeof v === 'object' ? compactObject(v) : v;
        //             if (Array.isArray(obj)) res.push(newv);
        //             else res[k] = newv;
        //         }
        //     }
        //     return res;
        // };`,
        // },
        {
            script: Script.CPP,
            time: 520,
            memory: 132.2,
            desc: '倍增法',
            code: `class TreeAncestor {
public:
    vector<vector<int>> list;

    TreeAncestor(int n, vector<int>& parent): list(vector<vector<int>>(n)) {
        for (int i = 1; i < parent.size(); i++) {
            list[i].push_back(parent[i]);
            for (int j = 1, res = 1; res != -1; j++) {
                res = getKthAncestor(i, pow(2, j));
                if (res != -1) list[i].push_back(res);
            }
        }
    }

    int getKthAncestor(int node, int k) {
        if (k == 0) return node;
        int l = -1, r = list[node].size() - 1;
        while (l < r) {
            int m = (l + r + 1) / 2;
            if (k >= pow(2, m)) l = m;
            else r = m - 1;
        }
        if (l == -1) return l;
        return getKthAncestor(list[node][l], k - pow(2, l));
    }
};`,
        },
        {
            script: Script.PY3,
            time: 7080,
            memory: 48.2,
            desc: '同上',
            code: `class TreeAncestor:

    def __init__(self, n: int, parent: List[int]):
        self.list = [[] for _ in range(n)]
        for i in range(1, len(parent)):
            self.list[i].append(parent[i])
            j = res = 1
            while res != -1:
                res = self.getKthAncestor(i, pow(2, j))
                if res != -1:
                    self.list[i].append(res)
                j += 1

    def getKthAncestor(self, node: int, k: int) -> int:
        if k == 0:
            return node
        l = -1
        r = len(self.list[node]) - 1
        while l < r:
            m = (l+r+1)//2
            if k >= pow(2, m):
                l = m
            else:
                r = m-1
        if l == -1:
            return l
        return self.getKthAncestor(self.list[node][l], k-pow(2, l))
`,
        },
        {
            script: Script.RUST,
            time: 204,
            memory: 34.9,
            desc: '同上',
            code: `struct TreeAncestor {
    list: Vec<Vec<usize>>,
}
impl TreeAncestor {
    fn new(n: i32, parent: Vec<i32>) -> Self {
        let mut list = vec![vec![]; n as usize];
        for i in 1..parent.len() {
            list[i].push(parent[i] as usize);
            let mut res = 1;
            for j in 1.. {
                res = TreeAncestor::_get_kth_ancestor(&list, i as i32, 2i32.pow(j as u32));
                if res != -1 {
                    list[i].push(res as usize);
                } else {
                    break;
                }
            }
        }
        Self { list }
    }
    fn _get_kth_ancestor(list: &Vec<Vec<usize>>, node: i32, k: i32) -> i32 {
        if k == 0 {
            node
        } else {
            let mut l = -1 as i32;
            let mut r = (list[node as usize].len() - 1) as i32;
            while l < r {
                let m = (l + r + 1) / 2;
                if k >= 2i32.pow(m as u32) {
                    l = m;
                } else {
                    r = m - 1;
                }
            }
            if l == -1 {
                l
            } else {
                TreeAncestor::_get_kth_ancestor(list, list[node as usize][l as usize] as i32, k - (2i32.pow(l as u32)))
            }
        }
    }
    fn get_kth_ancestor(&self, node: i32, k: i32) -> i32 {
        TreeAncestor::_get_kth_ancestor(&self.list, node, k)
    }
}`,
        },
    ],
};

export default leetCodeMarkdown;
