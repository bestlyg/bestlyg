import { Markdown, Difficulty, Tag, Script } from '@/base';

const leetCodeMarkdown: Markdown = {
  exist: !true,
  name: '1813. 句子相似性 III',
  url: 'https://leetcode.cn/problems/sentence-similarity-iii/',
  difficulty: Difficulty.中等,
  tag: [Tag.数组,Tag.双指针,Tag.字符串],
  desc: `给你两个句子 sentence1 和 sentence2 ，如果 sentence1 和 sentence2 是相似的，请你返回 true ，否则返回 false 。`,
  solutions: [
    {
      script: Script.CPP,
      time: 0,
      memory: 6.4,
      desc: '双指针递归',
      code: `class Solution {
public:
    bool areSentencesSimilar(string sentence1, string sentence2) {
        vector<string> l1 = split(sentence1), l2 = split(sentence2);
        return compare(l1, l2, 0, 0, false);
    }
    bool compare(vector<string> &l1, vector<string> &l2, int i1, int i2, bool inserted) {
        if (i1 == l1.size() && i2 == l2.size()) return true;
        if (i2 == l2.size() || i1 == l1.size()) return !inserted;
        if (l1[i1] == l2[i2]) return compare(l1, l2, i1 + 1, i2 + 1, inserted);
        if (inserted) return false;
        int next = i1;
        while ((next = indexof(l1, next + 1, l2[i2])) != -1)
            if (compare(l1, l2, next, i2, true)) return true;
        next = i2;
        while ((next = indexof(l2, next + 1, l1[i1])) != -1)
            if (compare(l1, l2, i1, next, true)) return true;
        return false;
    }
    int indexof(vector<string> &l, int start, string &s) {
        for (int i = start; i < l.size(); i++)
            if (l[i] == s) return i;
        return -1;
    }
    vector<string> split(string &s) {
        vector<string> ans;
        for (int i = 0; i < s.size(); i++) {
            if (s[i] == ' ') continue;
            string cur = "";
            while (i < s.size() && s[i] != ' ') cur += s[i++];
            ans.push_back(cur);
        }
        return ans;
    }
};`,
    },
    {
      script: Script.RUST,
      time: 0,
      memory: 2.2,
      desc: '同上',
      code: `impl Solution {
    pub fn are_sentences_similar(sentence1: String, sentence2: String) -> bool {
        let l1 = sentence1.split(" ").collect::<Vec<&str>>();
        let l2 = sentence2.split(" ").collect::<Vec<&str>>();
        Solution::compare(&l1, &l2, 0, 0, false)
    }
    fn compare(l1: &Vec<&str>, l2: &Vec<&str>, i1: usize, i2: usize, inserted: bool) -> bool {
        if i1 == l1.len() && i2 == l2.len() {
            true
        } else if i1 == l1.len() || i2 == l2.len() {
            !inserted
        } else if l1[i1].cmp(l2[i2]).is_eq() {
            Solution::compare(l1, l2, i1 + 1, i2 + 1, inserted)
        } else if inserted {
            false
        } else {
            let mut next = i1;
            loop {
                let res = Solution::indexof(l1, next + 1, l2[i2]);
                if res == -1 {
                    break;
                }
                let res = res as usize;
                if Solution::compare(l1, l2, res, i2, true) {
                    return true;
                }
                next = res;
            }
            let mut next = i2;
            loop {
                let res = Solution::indexof(l2, next + 1, l1[i1]);
                if res == -1 {
                    break;
                }
                let res = res as usize;
                if Solution::compare(l1, l2, i1, res, true) {
                    return true;
                }
                next = res;
            }
            false
        }
    }
    fn indexof(l: &Vec<&str>, start: usize, s: &str) -> i32 {
        let mut i = start;
        while i < l.len() {
            if l[i].cmp(s).is_eq() {
                return i as i32;
            }
            i += 1;
        }
        return -1;
    }
}`,
    },
  ],
};

export default leetCodeMarkdown;
