import { Markdown, Difficulty, Tag, Script } from '@/base';

const leetCodeMarkdown: Markdown = {
  exist: !true,
  name: '2409. 统计共同度过的日子数',
  url: 'https://leetcode.cn/problems/count-days-spent-together/',
  difficulty: Difficulty.中等,
  tag: [Tag.广度优先搜索, Tag.数组, Tag.矩阵],
  desc: `请你返回 Alice和 Bob 同时在罗马的天数。`,
  solutions: [
    {
      script: Script.CPP,
      time: 0,
      memory:5.9,
      desc: '统计区间',
      code: `#define X first
#define Y second
class Solution {
public:
    typedef pair<int, int> pii;
    int days[13] = {0, 31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31};
    int countDaysTogether(string arriveAlice, string leaveAlice, string arriveBob, string leaveBob) {
        pii as = comp(arriveAlice), al = comp(leaveAlice), bs = comp(arriveBob), bl = comp(leaveBob);
        if (as.X > bs.X || as.X == bs.X && as.Y > bs.Y) swap(as, bs), swap(al, bl);
        if (al.X < bs.X || al.X == bs.X && al.Y < bs.Y) return 0;
        pii start = bs, end = bl.X < al.X || bl.X == al.X && bl.Y < al.Y ? bl : al;
        if (start.X == end.X) return end.Y - start.Y + 1;
        int res = days[start.X] - start.Y + 1 + end.Y;
        for (int i = start.X + 1; i < end.X; i++) res += days[i];
        return res;
    }
    pii comp(string &time) {
        return make_pair((time[0] - '0') * 10 + (time[1] - '0'), (time[3] - '0') * 10 + (time[4] - '0'));
    }
};`,
    },
    {
      script: Script.PY3,
      time: 48,
      memory: 15,
      desc: '同上',
      code: `days = [0, 31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31]
    def comp(time: str) -> Tuple[int, int]:
        return (
            (ord(time[0]) - ord('0')) * 10 + (ord(time[1]) - ord('0')),
            (ord(time[3]) - ord('0')) * 10 + (ord(time[4]) - ord('0')),
        )
    class Solution:
        def countDaysTogether(self, arriveAlice: str, leaveAlice: str, arriveBob: str, leaveBob: str) -> int:
            aS, aL, bS, bL = comp(arriveAlice), comp(
                leaveAlice), comp(arriveBob), comp(leaveBob)
            if aS[0] > bS[0] or aS[0] == bS[0] and aS[1] > bS[1]:
                temp = aS
                aS = bS
                bS = temp
                temp = aL
                aL = bL
                bL = temp
            if aL[0] < bS[0] or aL[0] == bS[0] and aL[1] < bS[1]:
                return 0
            start = bS
            end = bL if bL[0] < aL[0] or bL[0] == aL[0] and bL[1] < aL[1] else aL
            if start[0] == end[0]:
                return end[1] - start[1] + 1
            res = days[start[0]] - start[1] + 1 + end[1]
            for i in range(start[0] + 1, end[0]):
                res += days[i]
            return res`,
    },
    {
      script: Script.RUST,
      time: 0,
      memory: 2,
      desc: '同上',
      code: `fn str_to_vec(s: &String) -> Vec<char> {
    s.chars().collect()
}
impl Solution {
    pub fn count_days_together(
        arrive_alice: String,
        leave_alice: String,
        arrive_bob: String,
        leave_bob: String,
    ) -> i32 {
        use std::mem::swap;
        let days = [0, 31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
        let comp = |time: Vec<char>| -> (i32, i32) {
            (
                (time[0] as i32 - '0' as i32) * 10 + time[1] as i32 - '0' as i32,
                (time[3] as i32 - '0' as i32) * 10 + time[4] as i32 - '0' as i32,
            )
        };
        let (mut a_s, mut a_l, mut b_s, mut b_l) = (
            comp(str_to_vec(&arrive_alice)),
            comp(str_to_vec(&leave_alice)),
            comp(str_to_vec(&arrive_bob)),
            comp(str_to_vec(&leave_bob)),
        );
        if a_s.0 > b_s.0 || a_s.0 == b_s.0 && a_s.1 > b_s.1 {
            swap(&mut a_s, &mut b_s);
            swap(&mut a_l, &mut b_l);
        }
        if a_l.0 < b_s.0 || a_l.0 == b_s.0 && a_l.1 < b_s.1 {
            0
        } else {
            let start = b_s;
            let end = if b_l.0 < a_l.0 || b_l.0 == a_l.0 && b_l.1 < a_l.1 {
                b_l
            } else {
                a_l
            };
            if start.0 == end.0 {
                end.1 - start.1 + 1
            } else {
                let mut res = days[start.0 as usize] - start.1 + 1 + end.1;
                for i in start.0 + 1..end.0 {
                    res += days[i as usize];
                }
                res
            }
        }
    }
}`,
    },
  ],
};

export default leetCodeMarkdown;
