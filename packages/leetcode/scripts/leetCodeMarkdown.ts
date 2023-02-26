import { Markdown, Difficulty, Tag, Script } from '@/base';

const leetCodeMarkdown: Markdown = {
  exist: !true,
  name: '1255. 得分最高的单词集合',
  url: 'https://leetcode.cn/problems/maximum-score-words-formed-by-letters/',
  difficulty: Difficulty.中等,
  tag: [Tag.广度优先搜索, Tag.数组, Tag.矩阵],
  desc: `请你帮忙计算玩家在单词拼写游戏中所能获得的「最高得分」：能够由 letters 里的字母拼写出的 任意 属于 words 单词子集中，分数最高的单词集合的得分。`,
  solutions: [
    {
      script: Script.CPP,
      time: 8,
      memory: 9.3,
      desc: '状态压缩后遍历所有可能',
      code: `class Solution {
public:
    int maxScoreWords(vector<string>& words, vector<char>& letters, vector<int>& score) {
        int ans = 0, n = words.size();
        vector<int> clist(26, 0), wscore(n, 0), cclist;
        for (auto &c : letters) clist[c - 'a']++;
        for (int i = 0; i < n; i++) {
            for (auto &c : words[i]) wscore[i] += score[c - 'a'];
        }
        for (int i = 0; i < (1 << n); i++) {
            cclist = clist;
            bool f = true;
            int s = 0;
            for (int j = 0; j < n && f; j++) {
                if (i & (1 << j)) {
                    s += wscore[j];
                    for (auto &c : words[j]) {
                        if (cclist[c - 'a'] == 0) {
                            f = false;
                            break;
                        }
                        cclist[c - 'a']--;
                    }
                }
            }
            if (f) ans = max(ans, s);
        }
        return ans;
    }
};`,
    },
    {
      script: Script.PY3,
      time: 468,
      memory: 14.9,
      desc: '同上',
      code: `class Solution:
    def maxScoreWords(self, words: List[str], letters: List[str], score: List[int]) -> int:
        def toScore(word: str) -> int:
            res = 0
            for c in word:
                res += score[ord(c) - ord('a')]
            return res
  
        ans = 0
        n = len(words)
        clist = [0] * 26
        for c in letters:
            clist[ord(c) - ord('a')] += 1
        wscore = [toScore(w) for w in words]
        for i in range(1 << n):
            cclist = [clist[i] for i in range(26)]
            f = True
            s = 0
            for j in range(n):
                if i & (1 << j):
                    s += wscore[j]
                    for c in words[j]:
                        if cclist[ord(c) - ord('a')] == 0:
                            f = False
                            break
                        cclist[ord(c) - ord('a')] -= 1
                if f:
                    ans = max(ans, s)
        return ans`,
    },
    {
      script: Script.RUST,
      time: 4,
      memory: 2.1,
      desc: '同上',
      code: `impl Solution {
        pub fn max_score_words(words: Vec<String>, letters: Vec<char>, score: Vec<i32>) -> i32 {
            let words = words
                .into_iter()
                .map(|s| s.chars().collect::<Vec<char>>())
                .collect::<Vec<Vec<char>>>();
            let mut ans = 0;
            let n = words.len();
            let list = letters.into_iter().fold([0; 26], |list, c| {
                let mut list = list;
                list[c as usize - 'a' as usize] += 1;
                list
            });
            let wscore = words
                .iter()
                .map(|w| {
                    let mut s = 0;
                    for c in w.iter() {
                        s += score[*c as usize - 'a' as usize];
                    }
                    s
                })
                .collect::<Vec<i32>>();
            for i in 0..(1 << n) {
                let mut clist = list.clone();
                let mut f = true;
                let mut s = 0;
                for j in 0..n {
                    if (i & (1 << j)) != 0 {
                        s += wscore[j];
                        for c in words[j].iter() {
                            if clist[*c as usize - 'a' as usize] == 0 {
                                f = false;
                                break;
                            }
                            clist[*c as usize - 'a' as usize] -= 1;
                        }
                    }
                }
                if f {
                    ans = ans.max(s);
                }
            }
            ans
        }
    }`,
    },
  ],
};

export default leetCodeMarkdown;
