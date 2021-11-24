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
    name: '20. 有效的括号',
    url: 'https://leetcode-cn.com/problems/reconstruct-original-digits-from-english/',
    difficulty: Difficulty.中等,
    tag: [Tag.哈希表, Tag.数学, Tag.字符串],
    desc: `给你一个字符串 s ，其中包含字母顺序打乱的用英文单词表示的若干数字（0-9）。按 升序 返回原始的数字。`,
    solutions: [
      {
        script: Script.TS,
        time: 0,
        memory: 5.8,
        desc: 'stack',
        code: `typedef struct Stack
{
    int size;
    int len;
    int *data;
} Stack;
Stack *createStack(int len)
{
    Stack *s = (Stack *)malloc(sizeof(Stack));
    s->size = 0;
    s->len = len;
    s->data = (int *)malloc(sizeof(int) * len);
    return s;
}
void push(Stack *s, int val)
{
    if (s->size == s->len)
        return;
    s->data[s->size++] = val;
}
void pop(Stack *s)
{
    if (s->size == 0)
        return;
    s->size--;
}
int isEmpty(Stack *s) {
    return s->size == 0;
}
int top(Stack *s)
{
    if (s->size == 0)
        return -999999999;
    return s->data[s->size - 1];
}
void freeStack(Stack *s)
{
    free(s->data);
    free(s);
}
void showStack(Stack *s, char *title, int type)
{
    printf("Stack %s : [", title);
    for (int i = 0; i < s->size; i++)
    {
        i &&printf(",");
        if (type == 1)
            printf("%d", s->data[i]);
        if (type == 2)
            printf("%c", s->data[i]);
    }
    printf("]\\n");
}
bool isValid(char * s){
    int len = strlen(s);
    Stack *stack = createStack(len);
    for (int i = 0; i < len; i++) {
        char ch = s[i];
        if (
            ch == ')' && !isEmpty(stack) && s[top(stack)] == '(' || 
            ch == ']' && !isEmpty(stack) && s[top(stack)] == '[' || 
            ch == '}' && !isEmpty(stack) && s[top(stack)] == '{' 
        ) pop(stack);
        else push(stack, i);
    }
    return stack->size == 0;
}`,
      },
    ],
  },
  {
    existMarkdown: true,
    name: '225. 用队列实现栈',
    url: 'https://leetcode-cn.com/problems/reconstruct-original-digits-from-english/',
    difficulty: Difficulty.中等,
    tag: [Tag.哈希表, Tag.数学, Tag.字符串],
    desc: `给你一个字符串 s ，其中包含字母顺序打乱的用英文单词表示的若干数字（0-9）。按 升序 返回原始的数字。`,
    solutions: [
      {
        script: Script.TS,
        time: 0,
        memory: 5.7,
        desc: 'queue',
        code: `// #define DEBUG
#ifdef DEBUG
#define log(frm, args...)    \\
    {                        \\
        printf(frm, ##args); \\
    }
#else
#define log(frm, args...)
#endif

typedef struct Node{
    int val;
    struct Node *prev, *next;
} Node;
Node *createNode(int val){
    Node *node = (Node *)malloc(sizeof(Node));
    node->val = val;
    node->prev = NULL;
    node->next = NULL;
    return node;
}
typedef struct {
    int size;
    Node *head, *tail;
} Queue;
Queue *ceateQueue(){
    Queue *q = (Queue *)malloc(sizeof(Queue));
    q->size = 0;
    q->tail = q->head = NULL;
    return q;
}
void enQueue(Queue *q, int val){
    Node *node = createNode(val);
    if (q->size == 0) {
        q->head = q->tail = node;
    } else {
        node->prev = q->tail;
        q->tail->next = node;
        q->tail = node;
    }
    q->size++;
    log("enQueue %d success, head = %d, tail = %d\\n", val, q->head->val, q->tail->val);
}
int isQueueEmpty(Queue *q) {
    return q->size == 0;
}
int queueTop(Queue *q){
    if (isQueueEmpty(q)) return -1;
    return q->head->val;
}
int deQueue(Queue *q) {
    if (isQueueEmpty(q)) return -1;
    if (q->size == 1) {
        Node *node = q->head;
        int val = node->val;
        q->tail = q->head = NULL;
        free(node);
        q->size = 0;
        return val;
    }
    Node *node = q->head;
    node->next->prev = NULL;
    int val = node->val;
    q->head = node->next;
    free(node);
    q->size--;
    return val;
}
void freeQueue(Queue *q){
    while(q->size) deQueue(q);
    free(q);
}

typedef struct {
    int size;
    Queue *q1, *q2;
} MyStack;

MyStack* myStackCreate() {
    MyStack *s = (MyStack *)malloc(sizeof(MyStack));
    s->q1 = ceateQueue();
    s->q2 = ceateQueue();
    return s;
}

void myStackPush(MyStack* obj, int x) {
    log("push %d\\n", x);
    enQueue(obj->q1, x);
    log("push %d successfully\\n", x);
}

int myStackPop(MyStack* obj) {
    while(obj->q1->size > 1) enQueue(obj->q2, deQueue(obj->q1));
    int val = deQueue(obj->q1);
    while(obj->q2->size) enQueue(obj->q1, deQueue(obj->q2));
    return val;
}

int myStackTop(MyStack* obj) {
    return obj->q1->tail->val;
}

bool myStackEmpty(MyStack* obj) {
    return obj->q1->size == 0;
}

void myStackFree(MyStack* obj) {
    freeQueue(obj->q1);
    freeQueue(obj->q2);
    free(obj);
}`,
      },
    ],
  },
  {
    existMarkdown: true,
    name: '232. 用栈实现队列',
    url: 'https://leetcode-cn.com/problems/reconstruct-original-digits-from-english/',
    difficulty: Difficulty.中等,
    tag: [Tag.哈希表, Tag.数学, Tag.字符串],
    desc: `给你一个字符串 s ，其中包含字母顺序打乱的用英文单词表示的若干数字（0-9）。按 升序 返回原始的数字。`,
    solutions: [
      {
        script: Script.TS,
        time: 0,
        memory: 5.7,
        desc: 'stack',
        code: `typedef struct Stack
{
    int size;
    int len;
    int *data;
} Stack;
Stack *createStack(int len)
{
    Stack *s = (Stack *)malloc(sizeof(Stack));
    s->size = 0;
    s->len = len;
    s->data = (int *)malloc(sizeof(int) * len);
    return s;
}
void push(Stack *s, int val)
{
    if (s->size == s->len)
        return;
    s->data[s->size++] = val;
}
void pop(Stack *s)
{
    if (s->size == 0)
        return;
    s->size--;
}
int isEmpty(Stack *s) {
    return s->size == 0;
}
int top(Stack *s)
{
    if (s->size == 0) return -1;
    return s->data[s->size - 1];
}
void freeStack(Stack *s)
{
    free(s->data);
    free(s);
}
typedef struct {
    Stack *s1, *s2;
} MyQueue;


MyQueue* myQueueCreate() {
    MyQueue *q = (MyQueue *)malloc(sizeof(MyQueue));
    q->s1 = createStack(100);
    q->s2 = createStack(100);
    return q;
}

void myQueuePush(MyQueue* obj, int x) {
    push(obj->s1, x);
}
void check(MyQueue *obj){
    if (!obj->s2->size) {
        while(obj->s1->size) {
            push(obj->s2, top(obj->s1));
            pop(obj->s1);
        }
    }
}
int myQueuePop(MyQueue* obj) {
    check(obj);
    int val = top(obj->s2);
    pop(obj->s2);
    return val;
}

int myQueuePeek(MyQueue* obj) {
    check(obj);
    return top(obj->s2);
}

bool myQueueEmpty(MyQueue* obj) {
    return obj->s1->size + obj->s2->size == 0;
}

void myQueueFree(MyQueue* obj) {
    freeStack(obj->s1);
    freeStack(obj->s2);
    free(obj);
}`,
      },
    ],
  },
];
