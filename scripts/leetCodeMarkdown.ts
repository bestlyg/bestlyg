import { leetcode, markdown, specStr } from './utils';
const { backquote } = specStr;
const { Script, Difficulty, Tag } = leetcode;
const { link } = markdown;
type Script = leetcode.Script;
type Difficulty = leetcode.Difficulty;
type Tag = leetcode.Tag;
type Solution = leetcode.Solution;
type Markdown = leetcode.Markdown;
export const leetCodeMarkdowns: Markdown[] = [
  {
    existMarkdown: !true,
    name: '959. 由斜杠划分区域',
    url: 'https://leetcode-cn.com/problems/regions-cut-by-slashes/',
    difficulty: Difficulty.中等,
    tag: [Tag.深度优先搜索, Tag.广度优先搜索, Tag.并查集, Tag.图],
    desc: `在由 1 x 1 方格组成的 N x N 网格 grid 中，每个 1 x 1 方块由 /、\\ 或空格构成。这些字符会将方块划分为一些共边的区域。`,
    solutions: [
      {
        script: Script.C,
        time: 4,
        memory: 6.6,
        desc: '并查集',
        code: `typedef struct unionfind
{
    int *father, len, size;
} UnionFind;
UnionFind *unionfind_create(int len)
{
    UnionFind *uf = (UnionFind *)malloc(sizeof(UnionFind));
    uf->size = uf->len = len;
    uf->father = (int *)malloc(sizeof(int) * len);
    for (int i = 0; i < len; i++)
        uf->father[i] = i;
    return uf;
}
void unionfind_free(UnionFind *uf)
{
    free(uf->father);
    free(uf);
}
int unionfind_find(UnionFind *uf, int data)
{
    return uf->father[data] = uf->father[data] == data ? data : unionfind_find(uf, uf->father[data]);
}
void unionfind_union(UnionFind *uf, int data1, int data2)
{
    int p1 = unionfind_find(uf, data1), p2 = unionfind_find(uf, data2);
    if (p1 == p2) return ;
    uf->size--;
    uf->father[p1] = p2;
}
#define BLOCK 4
int get_idx(int row, int col, int n) {
    return row * n * BLOCK + col * BLOCK;
}
int regionsBySlashes(char ** grid, int gridSize){
    UnionFind *uf = unionfind_create(gridSize * gridSize * BLOCK);
    for (int row = 0; row < gridSize; row++) {
        for (int col = 0; col < gridSize; col++) {
            char ch = grid[row][col];
            int idx1 = get_idx(row, col, gridSize), idx2 = idx1 + 1, idx3 = idx1 + 2, idx4 = idx1 + 3;
            if (ch == ' ') {
                unionfind_union(uf, idx1, idx2);
                unionfind_union(uf, idx1, idx3);
                unionfind_union(uf, idx1, idx4);
            } else if (ch == '/') {
                unionfind_union(uf, idx1, idx2);
                unionfind_union(uf, idx3, idx4);
            } else {
                unionfind_union(uf, idx1, idx4);
                unionfind_union(uf, idx2, idx3);
            }
            //if (row > 0) unionfind_union(uf, idx1, get_idx(row - 1, col, gridSize) + 2);
            //if (col > 0) unionfind_union(uf, idx2, get_idx(row, col - 1, gridSize) + 3);
            if (col < gridSize - 1) unionfind_union(uf, idx4, get_idx(row, col + 1, gridSize) + 1);
            if (row < gridSize - 1) unionfind_union(uf, idx3, get_idx(row + 1, col, gridSize));
        }
    }
    return uf->size;
}`,
      },
    ],
  },
  {
    existMarkdown: true,
    name: '547. 省份数量',
    url: 'https://leetcode-cn.com/problems/regions-cut-by-slashes/',
    difficulty: Difficulty.中等,
    tag: [Tag.深度优先搜索, Tag.广度优先搜索, Tag.并查集, Tag.图],
    desc: `在由 1 x 1 方格组成的 N x N 网格 grid 中，每个 1 x 1 方块由 /、\\ 或空格构成。这些字符会将方块划分为一些共边的区域。`,
    solutions: [
      {
        script: Script.JS,
        time: 36,
        memory: 6.9,
        desc: '并查集',
        code: `typedef struct unionfind
{
    int *father, len, size;
} UnionFind;
UnionFind *unionfind_create(int len)
{
    UnionFind *uf = (UnionFind *)malloc(sizeof(UnionFind));
    uf->size = uf->len = len;
    uf->father = (int *)malloc(sizeof(int) * len);
    for (int i = 0; i < len; i++)
        uf->father[i] = i;
    return uf;
}
void unionfind_free(UnionFind *uf)
{
    free(uf->father);
    free(uf);
}
int unionfind_find(UnionFind *uf, int data)
{
    return uf->father[data] = uf->father[data] == data ? data : unionfind_find(uf, uf->father[data]);
}
void unionfind_union(UnionFind *uf, int data1, int data2)
{
    int p1 = unionfind_find(uf, data1), p2 = unionfind_find(uf, data2);
    if (p1 == p2) return ;
    uf->size--;
    uf->father[p1] = p2;
}
int findCircleNum(int** isConnected, int isConnectedSize, int* isConnectedColSize){
    UnionFind *uf = unionfind_create(isConnectedSize);
    for (int i = 0; i < isConnectedSize; i++) {
        for (int j = 0; j < isConnectedSize; j++) {
            if (isConnected[i][j]) unionfind_union(uf, i, j);
        }
    }
    return uf->size;
}`,
      },
    ],
  },
];
