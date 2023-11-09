import { Markdown, Difficulty, Tag, Script } from '@/base';
import { backquote } from '@/utils';

const leetCodeMarkdown: Markdown = {
    exist: !true,
    name: '2258. 逃离火灾',
    url: 'https://leetcode.cn/problems/escape-the-spreading-fire',
    difficulty: Difficulty.简单,
    tag: [],
    desc: `请你返回你在初始位置可以停留的 最多 分钟数，且停留完这段时间后你还能安全到达安全屋。如果无法实现，请你返回 -1 。如果不管你在初始位置停留多久，你 总是 能到达安全屋，请你返回 109 。`,
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
        // {
        //     script: Script.CPP,
        //     time: 716,
        //     memory: 172.36,
        //     desc: '同上',
        //     code: ``,
        // },
        {
            script: Script.PY,
            time: 840,
            memory: 17.25,
            desc: 'bfs记录火蔓延的时间点，通过二分获取最大可能值',
            code: `dirs = [(0, 1), (1, 0), (0, -1), (-1, 0)]

class Solution:
    def maximumMinutes(self, grid: List[List[int]]) -> int:
        n = len(grid)
        m = len(grid[0])
        times = [[inf] * m for _ in range(n)]
        checks = [[False] * m for _ in range(n)]
        q = deque()
        for i in range(n):
            for j in range(m):
                if grid[i][j] == 1:
                    q.append((i, j))
                    times[i][j] = 0
        
        size = len(q)
        time = 1
        while q:
            i, j = q.popleft()
            for dir in dirs:
                nexti = i + dir[0]
                nextj = j + dir[1]
                if 0 <= nexti < n and 0 <= nextj < m and grid[nexti][nextj] != 2 and times[nexti][nextj] == inf:
                    q.append((nexti, nextj))
                    times[nexti][nextj] = time
            size -= 1
            if size == 0:
                size = len(q)
                time += 1

        def check(time: int) -> bool:
            for i in range(n):
                for j in range(m):
                    checks[i][j] = False
            q.clear()
            time += 1
            q.append((0, 0))
            size = 1
            while q:
                i, j = q.popleft()
                for dir in dirs:
                    nexti = i + dir[0]
                    nextj = j + dir[1]
                    if 0 <= nexti < n and 0 <= nextj < m and grid[nexti][nextj] == 0:
                        if nexti == n - 1 and nextj == m - 1 and times[nexti][nextj] >= time:
                            return True
                        if times[nexti][nextj] > time and (not checks[nexti][nextj]):
                            checks[nexti][nextj] = True
                            q.append((nexti, nextj))
                size -= 1
                if size == 0:
                    size = len(q)
                    time += 1
            return False

        l = -1
        r = 10 ** 9
        while l < r:
            mid = (l + r + 1) // 2
            if check(mid): l = mid
            else: r = mid - 1

        return l`,
        },
        // {
        //     script: Script.RUST,
        //     time: 564,
        //     memory: 85,
        //     desc: '同上',
        //     code: ``,
        // },
    ],
};

export default leetCodeMarkdown;
