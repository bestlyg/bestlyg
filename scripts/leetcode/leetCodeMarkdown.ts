import { specStr, markdown } from '../utils';
import { Markdown, Difficulty, Tag, Script } from './leetcode';

const { backquote } = specStr;
const { link } = markdown;
const leetCodeMarkdown: Markdown = {
  exist: !true,
  name: '1823. 找出游戏的获胜者',
  url: 'https://leetcode-cn.com/problems/find-the-winner-of-the-circular-game/',
  difficulty: Difficulty.中等,
  tag: [Tag.递归, Tag.队列, Tag.数组, Tag.数学, Tag.模拟],
  desc: `给你参与游戏的小伙伴总数 n ，和一个整数 k ，返回游戏的获胜者。`,
  solutions: [
    {
      script: Script.CPP,
      time: 0,
      memory: 5.4,
      desc: '遍历',
      code: `int findTheWinner(int n, int k) {
    int list[n], current = n - 1;
    for (int i = 0; i < n; i++) list[i] = i + 1;
    list[n - 1] = 0;
    for (int jump = 0; n > 1; n--) {
        jump = (k - 1) % n;
        while (jump > 0) current = list[current], jump--;
        list[current] = list[list[current]];
    }
    return current + 1;
}`,
    },
    {
      script: Script.GO,
      time: 0,
      memory: 1.9,
      desc: '遍历',
      code: `func findTheWinner(n int, k int) int {
    list := make([]int, n)
    for i := 0; i < n; i++ {
        list[i] = i + 1
    }
    list[n-1] = 0
    current := n - 1
    for jump := 0; n > 1; n-- {
        jump = (k - 1) % n
        for ; jump > 0; jump-- {
            current = list[current]
        }
        list[current] = list[list[current]]
    }
    return current + 1
}`,
    },
  ],
};
export default leetCodeMarkdown;
