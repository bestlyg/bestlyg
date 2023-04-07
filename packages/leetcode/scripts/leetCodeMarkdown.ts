import { Markdown, Difficulty, Tag, Script } from '@/base';

const leetCodeMarkdown: Markdown = {
  exist: !true,
  name: '1040. 移动石子直到连续 II',
  url: 'https://leetcode.cn/problems/moving-stones-until-consecutive-ii/',
  difficulty: Difficulty.中等,
  tag: [Tag.广度优先搜索, Tag.数组, Tag.矩阵],
  desc: `在一个长度 无限 的数轴上，第 i 颗石子的位置为 stones[i]。如果一颗石子的位置最小/最大，那么该石子被称作 端点石子 。每个回合，你可以将一颗端点石子拿起并移动到一个未占用的位置，使得该石子不再是一颗端点石子。值得注意的是，如果石子像 stones = [1,2,5] 这样，你将 无法 移动位于位置 5 的端点石子，因为无论将它移动到任何位置（例如 0 或 3），该石子都仍然会是端点石子。当你无法进行任何移动时，即，这些石子的位置连续时，游戏结束。要使游戏结束，你可以执行的最小和最大移动次数分别是多少？ 以长度为 2 的数组形式返回答案：answer = [minimum_moves, maximum_moves] 。`,
  solutions: [
    {
      script: Script.CPP,
      time: 20,
      memory: 12.9,
      desc: '遍历',
      code: `class Solution {
public:
    vector<int> numMovesStonesII(vector<int>& stones) {
        int n = stones.size();
        sort(stones.begin(), stones.end());
        if (stones[n - 1] - stones[0] + 1 == n) return vector<int>{0, 0};
        // nmax : [1,2,4,8,9], 滚动的防止把1放入[2,9]或者把9放入[1,8], 计算空位再减去已经存在位置上的数字个数
        int nmin = INT_MAX, nmax = max(stones[n - 1] - stones[1] - 1 - (n - 3), stones[n - 2] - stones[0] - 1 - (n - 3));
        // ec: [l, r]中的空位
        for (int l = 0, r = 0, ec = 0; r < n; l++) {
            // 保证空位数量>=外面的数量
            while (r + 1 < n && n - (r - l + 1) > ec) ec += stones[r + 1] - stones[r] - 1, r++;
            if (r + 1 == n && n - (r - l + 1) > ec) break;
            // cnt: [l, r]外面还剩几个数字, lc: 外面的数字填空后还剩几个空位
            int cnt = n - (r - l + 1), lc = ec - cnt;
            // eg: [1,10,100]如果所有的数字都用完了但还存在lc, 那就直接逐个放入lc
            if (cnt == 0 && lc) nmin = min(nmin, lc);
            // eg: [1,2,4,8]如果lc没了说明刚好放完
            else if (lc == 0) nmin = min(nmin, cnt);
            // eg: [1,2,4]如果lc还剩1个，剩下的1个不能直接放入空位，需要借助另一端的一个制造只剩生
            else if (lc == 1) nmin = min(nmin, cnt + 2);
            else nmin = min(nmin, cnt + 1);
            ec -= stones[l + 1] - stones[l] - 1;
        }
        return vector<int>{nmin, nmax};
    }
};`,
    },
    {
      script: Script.PY3,
      time: 84,
      memory: 16.1,
      desc: '同上',
      code: `class Solution:
    def numMovesStonesII(self, stones: List[int]) -> List[int]:
        n = len(stones)
        stones.sort()
        if stones[n - 1] - stones[0] + 1 == n:
            return [0, 0]
        nmin, nmax = 0x7fffffff, max(
            stones[n - 1] - stones[1] - 1 - (n - 3), stones[n - 2] - stones[0] - 1 - (n - 3))
        l = r = ec = 0
        while r < n:
            while r + 1 < n and n - (r - l + 1) > ec:
                ec += stones[r + 1] - stones[r] - 1
                r += 1
            if r + 1 == n and n - (r - l + 1) > ec:
                break
            cnt = n - (r - l + 1)
            lc = ec - cnt
            if cnt == 0 and lc:
                nmin = min(nmin, lc)
            elif lc == 0:
                nmin = min(nmin, cnt)
            elif lc == 1:
                nmin = min(nmin, cnt + 2)
            else:
                nmin = min(nmin, cnt + 1)
            ec -= stones[l + 1] - stones[l] - 1
            l += 1
        return [nmin, nmax]`,
    },
    {
      script: Script.RUST,
      time: 4,
      memory: 2.3,
      desc: '同上',
      code: `impl Solution {
    pub fn num_moves_stones_ii(mut stones: Vec<i32>) -> Vec<i32> {
        use std::cmp::{max, min};
        let n = stones.len();
        stones.sort();
        if stones[n - 1] - stones[0] + 1 == n as i32 {
            vec![0, 0]
        } else {
            let (mut nmin, nmax) = (
                i32::MAX,
                max(
                    stones[n - 1] - stones[1] - 1 - (n as i32 - 3),
                    stones[n - 2] - stones[0] - 1 - (n as i32 - 3),
                ),
            );
            let (mut l, mut r, mut ec) = (0, 0, 0);
            while r < n {
                while r + 1 < n && n - (r - l + 1) > ec {
                    ec += (stones[r + 1] - stones[r] - 1) as usize;
                    r += 1;
                }
                if r + 1 == n && n - (r - l + 1) > ec {
                    break;
                }
                let cnt = n - (r - l + 1);
                let lc = ec - cnt;
                if cnt == 0 && lc > 0 {
                    nmin = min(nmin, lc as i32);
                }
                // eg: [1,2,4,8]如果lc没了说明刚好放完
                else if lc == 0 {
                    nmin = min(nmin, cnt as i32);
                }
                // eg: [1,2,4]如果lc还剩1个，剩下的1个不能直接放入空位，需要借助另一端的一个制造只剩生
                else if lc == 1 {
                    nmin = min(nmin, cnt as i32 + 2);
                } else {
                    nmin = min(nmin, cnt as i32 + 1);
                }
                ec -= (stones[l + 1] - stones[l] - 1) as usize;
                l += 1;
            }
            vec![nmin, nmax]
        }
    }
}`,
    },
  ],
};

export default leetCodeMarkdown;
