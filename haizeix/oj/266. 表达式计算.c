#include <stdio.h>
#include <math.h>
#include <stdlib.h>
#include <string.h>
#include <ctype.h>
#include <inttypes.h>
#include <stdarg.h>

#define PI acos(-1)
#define MAX_PRIME 8100000
#define EPSILON 1e-7
// #define DEBUG

#ifdef DEBUG
#define log(frm, args...)    \
    {                        \
        printf(frm, ##args); \
    }
#else
#define log(frm, args...)
#endif

void swap(int *a, int *b)
{
    *a = *a + *b;
    *b = *a - *b;
    *a = *a - *b;
}
int is_little()
{
    int num = 1;
    return ((char *)(&num))[0];
}

typedef struct Stack
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
    printf("]\n");
}
Stack *ops;
Stack *nums;
void comp()
{
    int num2 = top(nums);
    pop(nums);
    int num1 = top(nums);
    pop(nums);
    char op = top(ops);
    pop(ops);
    int ans;
    if (op == '+')
        ans = num1 + num2;
    else if (op == '-')
        ans = num1 - num2;
    else if (op == '*')
        ans = num1 * num2;
    else if (op == '/')
        ans = num1 / num2;
    else if (op == '^')
        ans = (int)pow(num1, num2);
    else
        printf("unknown op : %c\n", op);
    push(nums, ans);
}
int main()
{
    ops = createStack(1000);
    nums = createStack(1000);
    int len;
    char s[1006];
    s[0] = '(';
    scanf("%s", s + 1);
    len = strlen(s);
    s[len++] = ')';
    s[len] = '\0';
    log("str = [%s], len = %d\n", s, len);
    for (int i = 0; i < strlen(s); i++)
    {
        char ch = s[i];
        if (ch == '(')
            push(ops, ch);
        else if (isdigit(ch))
        {
            int num = ch - '0';
            while (isdigit(s[i + 1]))
            {
                num = num * 10 + s[i + 1] - '0';
                i++;
            }
            push(nums, num);
        }
        else if (ch == '+' || ch == '-')
        {
            int flag = ch == '+' ? 1 : -1;
            if (i && (s[i - 1] == ')' || isdigit(s[i - 1])))
            {
                while (top(ops) != '(')
                    comp();
                push(ops, ch);
            }
            else
            {
                int num = s[++i] - '0';
                while (isdigit(s[i + 1]))
                {
                    num = num * 10 + s[i + 1] - '0';
                    i++;
                }
                push(nums, flag * num);
            }
        }
        else if (ch == '*' || ch == '/')
        {
            while (top(ops) != '(' && top(ops) != '+' && top(ops) != '-')
                comp();
            push(ops, ch);
        }
        else if (ch == '^')
        {
            while (top(ops) == '^')
                comp();
            push(ops, ch);
        }
        else if (ch == ')')
        {
            while (top(ops) != '(')
                comp();
            pop(ops);
        }
        else
            printf("unknown char : %c\n", ch);
#ifdef DEBUG
        printf("==================\n");
        showStack(ops, "ops", 2);
        showStack(nums, "nums", 1);
#endif
    }
    printf("%d\n", top(nums));
    return 0;
}
