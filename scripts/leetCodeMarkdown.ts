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
    existMarkdown: true,
    name: '103. 二叉树的锯齿形层序遍历',
    url: 'https://leetcode-cn.com/problems/find-all-anagrams-in-a-string/',
    difficulty: Difficulty.中等,
    tag: [Tag.哈希表, Tag.字符串, Tag.滑动窗口],
    desc: `给定两个字符串 s 和 p，找到 s 中所有 p 的 异位词 的子串，返回这些子串的起始索引。不考虑答案输出的顺序。`,
    solutions: [
      {
        script: Script.C,
        time: 0,
        memory: 7.1,
        desc: '修改层序遍历，偶数层倒序',
        code: `#define MAX 2000
int** zigzagLevelOrder(struct TreeNode* root, int* returnSize, int** returnColumnSizes){
    int **arr = (int **)malloc(sizeof(int) * MAX);
    *returnSize = 0;
    *returnColumnSizes = (int *)malloc(sizeof(int) * MAX);
    if (!root) return arr;
    // 维护队列储存节点信息
    struct TreeNode *q[2000];
    q[0] = root;
    // 维护队列头尾指针
    int head = 0, tail = 1;
    // 维护当前层的元素数量，当前遍历的层级
    int size = 1, height = 1, order = -1;
    arr[0] = (int *)malloc(sizeof(int));
    arr[0][0] = root->val;
    (*returnColumnSizes)[0] = 1;
    while (head != tail) {
        // 每次出队一个节点
        struct TreeNode *node = q[head++];
        // 若左节点不为空则入队
        if (node->left) q[tail++] = node->left;
        // 若右节点不为空则入队
        if (node->right) q[tail++] = node->right;
        // 若当前层无元素，说明队列里都是下一层的元素
        if (--size == 0) {
            size = tail - head;
            *returnSize += 1;
            (*returnColumnSizes)[height] = size;
            arr[height] = (int *)malloc(sizeof(int) * size);
            if (order == 1) for(int i = head; i < tail; i++) arr[height][i - head] = q[i]->val;
            else for(int i = tail - 1; i >= head; i--) arr[height][tail - 1 - i] = q[i]->val;
            order *= -1;
            ++height;
        }
    }
    return arr;
}`,
      },
    ],
  },
  {
    existMarkdown: true,
    name: '104. 二叉树的最大深度',
    url: 'https://leetcode-cn.com/problems/find-all-anagrams-in-a-string/',
    difficulty: Difficulty.中等,
    tag: [Tag.哈希表, Tag.字符串, Tag.滑动窗口],
    desc: `给定两个字符串 s 和 p，找到 s 中所有 p 的 异位词 的子串，返回这些子串的起始索引。不考虑答案输出的顺序。`,
    solutions: [
      {
        script: Script.C,
        time: 4,
        memory: 7.7,
        desc: '递归遍历每层左右子树加一',
        code: `int maxDepth(struct TreeNode* root){
    // 如果为NULL就是0
    if (!root) return 0;
    // 否则判断左右子树的最大深度 + 1
    return fmax(maxDepth (root->left), maxDepth(root->right)) + 1;
}`,
      },
    ],
  },
  {
    existMarkdown: true,
    name: '278. 第一个错误的版本',
    url: 'https://leetcode-cn.com/problems/find-all-anagrams-in-a-string/',
    difficulty: Difficulty.中等,
    tag: [Tag.哈希表, Tag.字符串, Tag.滑动窗口],
    desc: `给定两个字符串 s 和 p，找到 s 中所有 p 的 异位词 的子串，返回这些子串的起始索引。不考虑答案输出的顺序。`,
    solutions: [
      {
        script: Script.C,
        time: 0,
        memory: 5.5,
        desc: '二分',
        code: `int firstBadVersion(int n) {
    long l = 1, r = 2147483647, m;
    while (l < r) {
        m = (r + l) / 2;
        // 每次中间值是错误版本，就右侧值左移当中间值
        if (isBadVersion(m)) r = m;
        // 否则就左侧点是成功版本，找中间值的后一个
        else l = m + 1;
    }
    return l;
}`,
      },
    ],
  },
  {
    existMarkdown: true,
    name: '295. 数据流的中位数',
    url: 'https://leetcode-cn.com/problems/find-all-anagrams-in-a-string/',
    difficulty: Difficulty.中等,
    tag: [Tag.哈希表, Tag.字符串, Tag.滑动窗口],
    desc: `给定两个字符串 s 和 p，找到 s 中所有 p 的 异位词 的子串，返回这些子串的起始索引。不考虑答案输出的顺序。`,
    solutions: [
      {
        script: Script.C,
        time: 376,
        memory: 83,
        desc: '堆',
        code: `#define swap(a, b)              \\
    {                           \\
        __typeof(a) __temp = a; \\
        a = b;                  \\
        b = __temp;             \\
    }

typedef struct
{
    int size, len, *data;
    int(*comp)(int, int);
} Heap;
Heap *heap_create(int len, int (*comp)(int, int))
{
    Heap *h = (Heap *)malloc(sizeof(Heap));
    h->comp = comp;
    h->len = len;
    h->size = 0;
    h->data = (int *)malloc(sizeof(int) * len);
    return h;
}
void heap_free(Heap *h)
{
    if (!h)
        return;
    free(h->data);
    free(h);
}
void heap_shift_up(Heap *h, int idx)
{
    while (idx)
    {
        int p = (idx - 1) / 2;
        if (h->comp(h->data[idx], h->data[p]) > 0)
        {
            swap(h->data[p], h->data[idx]);
            idx = p;
        }
        else
            break;
    }
}
void heap_shift_down(Heap *h, int idx)
{
    while (idx * 2 + 1 < h->size)
    {
        int child = idx;
        if (h->comp(h->data[child], h->data[idx * 2 + 1]) < 0)
        {
            child = idx * 2 + 1;
        }
        if (
            idx * 2 + 2 < h->len && h->comp(h->data[child], h->data[idx * 2 + 2]) < 0)
        {
            child = idx * 2 + 2;
        }
        if (child == idx)
            break;
        swap(h->data[idx], h->data[child]);
        idx = child;
    }
}
int heap_remove(Heap *h)
{
    if (!h || h->size == 0)
        return -1;
    int val = h->data[0];
    h->data[0] = h->data[--h->size];
    heap_shift_down(h, 0);
    return val;
}
int heap_add(Heap *h, int val)
{
    if (!h || h->len == h->size)
        return 0;
    h->data[h->size] = val;
    heap_shift_up(h, h->size++);
    return val;
}
int heap_top(Heap *h)
{
    if (!h || h->size == 0)
        return -1;
    return h->data[0];
}
void heap_show(Heap *h)
{
#ifdef DEBUG
    printf("Heap : [");
    for (int i = 0; i < h->len; i++)
    {
        if (!h->data[i])
            continue;
        i != 0 && printf(",");
        printf("%d", h->data[i]);
    }
    printf("]\\n");
#endif
}

int comp1(int a, int b)
{
    return a - b;
}
int comp2(int a, int b)
{
    return b- a;
}

typedef struct {
    Heap *h1, *h2;
} MedianFinder;

#define MAX 200000
MedianFinder* medianFinderCreate() {
    MedianFinder *o = (MedianFinder *)malloc(sizeof(MedianFinder));
    o->h1 = heap_create(MAX, comp1);
    o->h2 = heap_create(MAX, comp2);
    return o;
}

void medianFinderAddNum(MedianFinder* obj, int num) {
    if(obj->h1->size == 0 || num <= heap_top(obj->h1)) {
        heap_add(obj->h1, num);
        if (obj->h1->size > obj->h2->size + 1) heap_add(obj->h2, heap_remove(obj->h1));
    }
    else {
        heap_add(obj->h2, num);
        if (obj->h2->size > obj->h1->size) heap_add(obj->h1, heap_remove(obj->h2));
    }
}

double medianFinderFindMedian(MedianFinder* obj) {
    if((obj->h1->size + obj->h2->size) & 1) return heap_top(obj->h1);
    else return (heap_top(obj->h1) + heap_top(obj->h2)) / 2.0;
}

void medianFinderFree(MedianFinder* obj) {
    heap_free(obj->h1);
    heap_free(obj->h2);
    free(obj);
}`,
      },
    ],
  },
];
