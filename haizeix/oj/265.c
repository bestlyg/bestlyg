#include <stdio.h>
#include <math.h>
#include <stdlib.h>
#include <string.h>
#include <ctype.h>

#define PI acos(-1)
#define MAX_N 100000
#define EPSILON 1e-7
#define MAX(a, b) ({\
    __typeof(a) _a = (a);\
    __typeof(b) _b = (b);\
    _a > _b ? _a : _b;    \
})

void swap(int *a, int *b){
    *a = *a + *b;
    *b = *a - *b;
    *a = *a - *b;
}

typedef struct Stack{
    int *data;
    int len;
    int size;
} Stack;
Stack *createStack(int len){
    Stack *s = (Stack *)malloc(sizeof(Stack));
    s->len = len;
    s->size = 0;
    s->data = (int *)malloc(sizeof(int) * len);
    return s;
}
void freeStack(Stack *s){
    free(s->data);
    free(s);
}
void push(Stack *s, int val){
    if(!s || s->size == s->len) return ;
    s->data[s->size++] = val;
}
int pop(Stack *s){
    if(!s || s->size == 0) return -1;
    return s->data[--s->size];
}
int top(Stack *s){
    if(!s || s->size == 0) return -1;
    return s->data[s->size - 1];
}
int main(){
    char str[10000];
    scanf("%s", str);
    int len = strlen(str);
    Stack *s = createStack(len);
    int ans = 0;
    for (int i = 0; i < len; i++) {
        char ch = str[i];
        int topidx = top(s);
        if(
            ch == ')' && topidx != -1 && str[topidx] == '(' ||
            ch == ']' && topidx != -1 && str[topidx] == '[' ||
            ch == '}' && topidx != -1 && str[topidx] == '{'
        ) {
            pop(s);
            topidx = top(s);
            if(i - topidx > ans) ans = i - topidx;
        } else {
            push(s, i);
        }

    }
    printf("%d\n", ans);
    return 0;
}
