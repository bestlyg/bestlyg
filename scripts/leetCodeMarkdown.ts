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
    name: '19. 删除链表的倒数第 N 个结点',
    url: 'https://leetcode-cn.com/problems/integer-replacement/',
    difficulty: Difficulty.中等,
    tag: [Tag.贪心, Tag.位运算, Tag.记忆化搜索, Tag.动态规划],
    desc: `给定一个正整数 n ，n 变为 1 所需的最小替换次数是多少？`,
    solutions: [
      {
        script: Script.C,
        time: 0,
        memory: 5.8,
        desc: '遍历',
        code: `struct ListNode* removeNthFromEnd(struct ListNode* head, int n){
        int sum = 0;
        struct ListNode* p = head;
        while (p) p = p->next, sum++;
        if (sum == 1 && n == 1) return NULL;
        int del_idx = sum - n;
        p = head;
        if (del_idx == 0) return p->next;
        while (--del_idx) p = p->next;
        p->next = p->next->next;
        return head;
}`,
      },
    ],
  },
  {
    existMarkdown: true,
    name: '24. 两两交换链表中的节点',
    url: 'https://leetcode-cn.com/problems/integer-replacement/',
    difficulty: Difficulty.中等,
    tag: [Tag.贪心, Tag.位运算, Tag.记忆化搜索, Tag.动态规划],
    desc: `给定一个正整数 n ，n 变为 1 所需的最小替换次数是多少？`,
    solutions: [
      {
        script: Script.C,
        time: 0,
        memory: 5.8,
        desc: 'dfs',
        code: `struct ListNode* swapPairs(struct ListNode* head){
    if (!head) return NULL;
    if (head->next == NULL) return head;
    struct ListNode *next_node = head->next;
    if (next_node->next != NULL) head->next = swapPairs(next_node->next);
    else head->next = NULL;
    next_node->next = head;
    return next_node;
}`,
      },
    ],
  },
  {
    existMarkdown: true,
    name: '83. 删除排序链表中的重复元素',
    url: 'https://leetcode-cn.com/problems/integer-replacement/',
    difficulty: Difficulty.中等,
    tag: [Tag.贪心, Tag.位运算, Tag.记忆化搜索, Tag.动态规划],
    desc: `给定一个正整数 n ，n 变为 1 所需的最小替换次数是多少？`,
    solutions: [
      {
        script: Script.C,
        time: 4,
        memory: 6.2,
        desc: '双指针',
        code: `struct ListNode* deleteDuplicates(struct ListNode* head){
    struct ListNode *p = head;
    struct ListNode *work_p = head;
    while (work_p) {
        while (work_p && work_p->val == p->val) work_p = work_p->next;
        p->next = work_p;
        p = p->next;
    }
    return head;
}`,
      },
    ],
  },
  {
    existMarkdown: true,
    name: '141. 环形链表',
    url: 'https://leetcode-cn.com/problems/integer-replacement/',
    difficulty: Difficulty.中等,
    tag: [Tag.贪心, Tag.位运算, Tag.记忆化搜索, Tag.动态规划],
    desc: `快慢指针`,
    solutions: [
      {
        script: Script.C,
        time: 12,
        memory: 7.7,
        desc: '快慢指针',
        code: `bool hasCycle(struct ListNode *head) {
    if(!head) return 0;
    struct ListNode *slow = head;
    struct ListNode *fast = head->next;
    while (fast && fast->next && fast != slow) fast = fast->next->next, slow = slow->next;
    return fast == slow;
}`,
      },
    ],
  },
  {
    existMarkdown: true,
    name: '160. 相交链表',
    url: 'https://leetcode-cn.com/problems/integer-replacement/',
    difficulty: Difficulty.中等,
    tag: [Tag.贪心, Tag.位运算, Tag.记忆化搜索, Tag.动态规划],
    desc: `快慢指针`,
    solutions: [
      {
        script: Script.C,
        time: 36,
        memory: 13.5,
        desc: '双指针',
        code: `struct ListNode *getIntersectionNode(struct ListNode *headA, struct ListNode *headB) {
    struct ListNode *a = headA, *b = headB;
    while(a != b){
        a = a ? a->next : headB;
        b = b ? b->next : headA;
    }
    return a;
}`,
      },
    ],
  },
  {
    existMarkdown: true,
    name: '160. 相交链表',
    url: 'https://leetcode-cn.com/problems/integer-replacement/',
    difficulty: Difficulty.中等,
    tag: [Tag.贪心, Tag.位运算, Tag.记忆化搜索, Tag.动态规划],
    desc: `快慢指针`,
    solutions: [
      {
        script: Script.C,
        time: 36,
        memory: 13.5,
        desc: '双指针',
        code: `struct ListNode *getIntersectionNode(struct ListNode *headA, struct ListNode *headB) {
    struct ListNode *a = headA, *b = headB;
    while(a != b){
        a = a ? a->next : headB;
        b = b ? b->next : headA;
    }
    return a;
}`,
      },
    ],
  },
  {
    existMarkdown: true,
    name: '202. 快乐数',
    url: 'https://leetcode-cn.com/problems/integer-replacement/',
    difficulty: Difficulty.中等,
    tag: [Tag.贪心, Tag.位运算, Tag.记忆化搜索, Tag.动态规划],
    desc: `快慢指针`,
    solutions: [
      {
        script: Script.C,
        time: 0,
        memory: 5.3,
        desc: '快慢指针',
        code: `int comp(int n) {
    int sum = 0, num;
    while (n) {
        num = n % 10;
        sum += num * num;
        n /= 10;
    }
    return sum;
}
bool isHappy(int n){
    int fast = n, slow = n;
    do{
        fast = comp(comp(fast));
        slow = comp(slow);
    } while(fast != slow);
    return slow == 1;
}`,
      },
    ],
  },
  {
    existMarkdown: true,
    name: '203. 移除链表元素',
    url: 'https://leetcode-cn.com/problems/integer-replacement/',
    difficulty: Difficulty.中等,
    tag: [Tag.贪心, Tag.位运算, Tag.记忆化搜索, Tag.动态规划],
    desc: `快慢指针`,
    solutions: [
      {
        script: Script.C,
        time: 8,
        memory: 7.9,
        desc: '双指针',
        code: `struct ListNode* removeElements(struct ListNode* head, int val){
    if (!head) return NULL;
    while (head && head->val == val) head = head->next;
    if (!head) return NULL;
    struct ListNode *p = head;
    struct ListNode *work = head;
    while (work) {
        work = work->next;
        while(work && work->val == val) work = work->next;
        p->next = work;
        p = p->next;
    }
    return head;
}`,
      },
    ],
  },
  {
    existMarkdown: true,
    name: '206. 反转链表',
    url: 'https://leetcode-cn.com/problems/integer-replacement/',
    difficulty: Difficulty.中等,
    tag: [Tag.贪心, Tag.位运算, Tag.记忆化搜索, Tag.动态规划],
    desc: `快慢指针`,
    solutions: [
      {
        script: Script.C,
        time: 4,
        memory: 6.6,
        desc: '递归',
        code: `struct ListNode* reverseList(struct ListNode* head){
    if (head == NULL || head->next == NULL) return head;
    struct ListNode *next = head->next;
    struct ListNode *reverse_head = reverseList(next);
    next->next = head;
    head->next = NULL;
    return reverse_head;
}`,
      },
    ],
  },
  {
    existMarkdown: true,
    name: '237. 删除链表中的节点',
    url: 'https://leetcode-cn.com/problems/integer-replacement/',
    difficulty: Difficulty.中等,
    tag: [Tag.贪心, Tag.位运算, Tag.记忆化搜索, Tag.动态规划],
    desc: `快慢指针`,
    solutions: [
      {
        script: Script.C,
        time: 4,
        memory: 6.2,
        desc: '递归',
        code: `void deleteNode(struct ListNode* node) {
    struct ListNode *next = node->next;
    node->val = next->val;
    node->next = next->next;
}`,
      },
    ],
  },
  {
    existMarkdown: true,
    name: '234. 回文链表',
    url: 'https://leetcode-cn.com/problems/integer-replacement/',
    difficulty: Difficulty.中等,
    tag: [Tag.贪心, Tag.位运算, Tag.记忆化搜索, Tag.动态规划],
    desc: `快慢指针`,
    solutions: [
      {
        script: Script.C,
        time: 164,
        memory: 40.8,
        desc: '储存数组再遍历',
        code: `bool isPalindrome(struct ListNode* head){
    int nums[100000] = {0}, len = 0;
    struct ListNode *p = head;
    while(p){
        nums[len++] = p->val;
        p = p->next;
    }
    for (int i = 0; i < len / 2; i++) {
        if (nums[i] != nums[len - 1 - i]) return 0;
    }
    return 1;
}`,
      },
    ],
  },
];
