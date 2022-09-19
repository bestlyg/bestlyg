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
#define log(frm, args...) {\
    printf(frm, ##args);\
}
#else
#define log(frm, args...)
#endif

void swap(int *a, int *b){
    *a = *a + *b;
    *b = *a - *b;
    *a = *a - *b;
}
int is_little(){
    int num = 1;
    return ((char *)(&num))[0];
}

typedef struct Stack{
    int size;
    int len;
    int *data;
} Stack;
Stack *createStack(int len) {
    Stack *s = (Stack *)malloc(sizeof(Stack));
    s->size = 0;
    s->len = len;
    s->data = (int *)malloc(sizeof(int) * len);
    return s;
}
void push(Stack *s, int val) {
    if(s->size == s->len) return;
    s->data[s->size++] = val;
}
int pop(Stack *s){
    if(s->size == 0) return -1;
    return s->data[--s->size];
}
Stack *clone(Stack *s){
    Stack *clone = createStack(s->len);
    for (int i = 0; i < s->size; i++) {
        push(clone, s->data[i]);
    }
    return clone;
}
void freeStack(Stack *s){
    free(s->data);
    free(s);
}
void showStack(Stack *s){
    printf("Stack : [");
    for(int i = 0; i < s->size; i++) {
        printf("%d <-", s->data[i]);
    }
    printf("Top ]\n");
}
#define MAX 20
Stack *s;
int cnt = 0;
char temp[MAX + 5];
char ans[MAX][MAX];
void dfs(int n, int idx, int num){
    log("n = %d, idx = %d, num = %d, tmp = %s, cnt = %d\n", n, idx, num, temp, cnt);
    if(cnt >= MAX) return;
    if (num == n) {
        temp[idx++] = num + '0';
        Stack *cs = createStack(n);
        while(s->size){
            int val = pop(s);
            push(cs, val);
            temp[idx++] = val + '0';
        }
        temp[idx] = '\0';
        while(cs->size) push(s, pop(cs));
        freeStack(cs);
        strcpy(ans[cnt++], temp);
        return ;
    }
    temp[idx] = num + '0';
    // part push
    int tmpidx = idx + 1;
    Stack *cs = createStack(n);
    while(s->size){
        int val = pop(s);
        push(cs, val);
        temp[tmpidx++] = val + '0';
    }
    while(cs->size >= 1) {
        dfs(n, tmpidx, num + 1);
        tmpidx--;
        push(s, pop(cs));
    }
    /*
    while(cs->size) {
        push(s, pop(cs));
        tmpidx--;
        dfs(n, tmpidx, num + 1);
    }*/
    freeStack(cs);
    // no push
    dfs(n, idx + 1, num + 1);
    // all push
        push(s, num);
        dfs(n, idx, num + 1);
        pop(s);
}
int main(){
    int n;
    scanf("%d", &n);
    s = createStack(n);
    dfs(n, 0, 1);
	for(int i = 0; i < cnt; i++){
		for(int j = 0;j < n; j++)
	    printf("%d", ans[i][j] - '0');
	    printf("\n");
	}
    return 0;
}
