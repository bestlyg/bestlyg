import { Markdown, Difficulty, Tag, Script } from '@/base';

const leetCodeMarkdown: Markdown = {
  exist: !true,
  name: '1105. 填充书架',
  url: 'https://leetcode.cn/problems/filling-bookcase-shelves/',
  difficulty: Difficulty.中等,
  tag: [Tag.广度优先搜索, Tag.数组, Tag.矩阵],
  desc: `给定一个数组 books ，其中 books[i] = [thicknessi, heighti] 表示第 i 本书的厚度和高度。你也会得到一个整数 shelfWidth 。每一层所摆放的书的最大高度就是这一层书架的层高，书架整体的高度为各层高之和。以这种方式布置书架，返回书架整体可能的最小高度。`,
  solutions: [
    {
      script: Script.CPP,
      time: 4,
      memory: 7.9,
      desc: 'dp[i]表示以i为行末的最大高度',
      code: `class Solution {
public:
    int minHeightShelves(vector<vector<int>>& books, int shelfWidth) {
        int n = books.size();
        vector<int> dp(n + 1, INT_MAX);
        dp[0] = 0;
        for (int i = 1; i <= n; i++) {
            int sum = 0, h = 0;
            for (int j = i - 1; j >= 0; j--) {
                if (sum + books[j][0] > shelfWidth) break;
                sum += books[j][0];
                h = max(h, books[j][1]);
                dp[i] = min(dp[i], dp[j] + h);
            }
        }
        return dp[n];
    }
};`,
    },
    {
      script: Script.PY3,
      time: 40,
      memory: 15.3,
      desc: '同上',
      code: `class Solution:
    def minHeightShelves(self, books: List[List[int]], shelfWidth: int) -> int:
        n = len(books)
        dp = [inf] * (n + 1)
        dp[0] = 0
        for i in range(1, n+1):
            sum = h = 0
            for j in range(i-1, -1, -1):
                if sum + books[j][0] > shelfWidth:
                    break
                sum += books[j][0]
                h = max(h, books[j][1])
                dp[i] = min(dp[i], dp[j]+h)
        return dp[n]`,
    },
    {
      script: Script.RUST,
      time: 0,
      memory: 2.3,
      desc: '同上',
      code: `impl Solution {
    pub fn min_height_shelves(books: Vec<Vec<i32>>, shelf_width: i32) -> i32 {
        use std::cmp::{max, min};
        let n = books.len();
        let mut dp = vec![i32::MAX; n + 1];
        dp[0] = 0;
        for i in 1..=n {
            let mut sum = 0;
            let mut h = 0;
            for j in (0..=i - 1).rev() {
                if sum + books[j][0] > shelf_width {
                    break;
                }
                sum += books[j][0];
                h = max(h, books[j][1]);
                dp[i] = min(dp[i], dp[j] + h);
            }
        }
        dp[n]
    }
}`,
    },
  ],
};

export default leetCodeMarkdown;
