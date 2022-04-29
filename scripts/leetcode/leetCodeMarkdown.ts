import { specStr, markdown } from '../utils';
import { Markdown, Difficulty, Tag, Script } from './leetcode';

const { backquote } = specStr;
const { link } = markdown;
const leetCodeMarkdown: Markdown = {
  exist: true,
  name: '427. 建立四叉树',
  url: 'https://leetcode-cn.com/problems/construct-quad-tree/',
  difficulty: Difficulty.中等,
  tag: [Tag.树, Tag.数组, Tag.分治, Tag.矩阵],
  desc: `你需要返回能表示矩阵的 四叉树 的根结点。`,
  solutions: [
    {
      script: Script.CPP,
      time: 12,
      memory: 6.5,
      desc: '递归看是否成树',
      code: `func construct(grid [][]int) *Node {
    n := len(grid)
    return dfs(grid, 0, n-1, 0, n-1)
}
func dfs(grid [][]int, srow, erow, scol, ecol int) *Node {
    mrow, mcol := (srow+erow)>>1, (scol+ecol)>>1
    for i := srow; i <= erow; i++ {
        for j := scol; j <= ecol; j++ {
            if grid[i][j] != grid[srow][scol] {
                return &Node{
                    Val:         false,
                    IsLeaf:      false,
                    TopLeft:     dfs(grid, srow, mrow, scol, mcol),
                    TopRight:    dfs(grid, srow, mrow, mcol+1, ecol),
                    BottomLeft:  dfs(grid, mrow+1, erow, scol, mcol),
                    BottomRight: dfs(grid, mrow+1, erow, mcol+1, ecol),
                }
            }
        }
    }
    return &Node{Val: grid[srow][scol] == 1, IsLeaf: true}
}`,
    },
  ],
};
export default leetCodeMarkdown;
