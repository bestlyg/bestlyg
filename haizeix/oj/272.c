#include <stdio.h>
#include <math.h>
#include <stdlib.h>
#include <string.h>
#include <ctype.h>
#include <inttypes.h>
#include <stdarg.h>

#define PI acos(-1)
#define MAX_PRIME 8100000
#define MAX 8100000
#define EPSILON 1e-7

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

typedef struct Node{
    struct Node *prev;
    struct Node *next;
    int val;
    int idx;
} Node;

void initNode(Node node, int val, int idx){
    log("init node, val = %d, idx = %d\n", val, idx);
    node.prev = NULL;
    node.next = NULL;
    node.val = val;
    node.idx = idx;
}

int comp(const void *a, const void *b) {
    log("compare a = %d, b = %d\n", ((Node *)a)->idx, ((Node *)b)->idx);
    return ((Node *)a)->val - ((Node *)b)->val;
}
void showList(Node list[], int n){
    log("show list : pos = %p\n", list);
    for (int i = 0; i < n; i++) {
        log("list[%d] = %d\n", i, list[i].val);
    }
}
int main(){
    int n;
    scanf("%d", &n);
    Node list[n];
    int ans[n - 1][2], pos[n];
    for (int i = 0; i < n; i++) {
        scanf("%d", &list[i].val);
        list[i].idx = i;
        list[i].prev = NULL;
        list[i].next = NULL;
    }
    qsort(list, n, sizeof(Node), comp);
    showList(list, n);
    for (int i = 0; i < n; i++) {
        Node node = list[i];
        pos[node.idx] = i;
    }
    for (int i = 0; i < n; i++) log("pos[%d] = %d\n", i, pos[i]);
    for (int i = 0; i < n; i++){
        if(i > 0) list[i].prev = &list[i - 1];
        if(i < n-1) list[i].next = &list[i + 1];
    }
    for (int i = n - 1; i >= 0; i--){
        Node node = list[pos[i]], *prev = node.prev, *next = node.next;
        log("check node : val = %d, idx = %d, prev.val = %d, next.val = %d\n",
            node.val, node.idx, prev ? prev->val : -1, next ? next->val : -1);
        if (node.idx == 0) continue;
        int *item = ans[node.idx - 1];
        if (!prev) {
            item[0] = next->val - node.val;
            item[1] = next->idx;
        } else if (!next) {
            item[0] = node.val - prev->val;
            item[1] = prev->idx;
        } else {
            int prev_v = node.val - prev->val, next_v = next->val - node.val;
            if (prev_v < next_v || prev_v == next_v && prev->val < next->val) {
                item[0] = prev_v;
                item[1] = prev->idx;
            } else {
                item[0] = next_v;
                item[1] = next->idx;
            }
        }
        if (prev) prev->next = node.next;
        if (next) next->prev = node.prev;
    }
    for (int i = 0; i < n - 1; i++) {
        printf("%d %d\n", ans[i][0], 1 + ans[i][1]);
    }
    return 0;
}
