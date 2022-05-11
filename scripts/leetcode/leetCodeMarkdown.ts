import { specStr, markdown } from '../utils';
import { Markdown, Difficulty, Tag, Script } from './leetcode';

const { backquote } = specStr;
const { link } = markdown;
const leetCodeMarkdown: Markdown = {
  exist: true,
  name: '449. 序列化和反序列化二叉搜索树',
  url: 'https://leetcode-cn.com/problems/minimum-genetic-mutation/',
  difficulty: Difficulty.中等,
  tag: [Tag.广度优先搜索, Tag.哈希表, Tag.字符串],
  desc: `给你两个基因序列 start 和 end ，以及一个基因库 bank ，请你找出并返回能够使 start 变化为 end 所需的最少变化次数。如果无法完成此基因变化，返回 -1 。`,
  solutions: [
    {
      script: Script.CPP,
      time: 64,
      memory: 45.7,
      desc: '递归',
      code: `class Codec {
   public:
    string serialize(TreeNode *root) {
        if (root == nullptr) return "(-1)";
        return "(" + to_string(root->val) + "," + serialize(root->left) + "," +
               serialize(root->right) + ")";
    }
    TreeNode *deserialize(string data) {
        if (data == "(-1)") return nullptr;
        string l, r;
        int val = analysis(data, l, r);
        TreeNode *ans = new TreeNode(val);
        ans->left = deserialize(l);
        ans->right = deserialize(r);
        return ans;
    }
    int analysis(string &data, string &l, string &r) {
        int level = 0, n = data.size(), val;
        int i = 0, prev = 1, cnt = 0;
        for (; i < n; i++) {
            int ch = data[i];
            if (ch == '(') {
                level++;
            } else if (ch == ')') {
                level--;
            } else if (ch == ',' && level == 1) {
                string substr = data.substr(prev, i - prev);
                if (cnt == 0)
                    val = stoi(substr);
                else if (cnt == 1)
                    l = substr;
                cnt++;
                prev = i + 1;
            }
        }
        r = data.substr(prev, i - prev - 1);
        return val;
    }
};`,
    },
  ],
};
export default leetCodeMarkdown;
