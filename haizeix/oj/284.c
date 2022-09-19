#include <stdio.h>
#include <stdlib.h>

#define PI acos(-1)
#define MAX_PRIME 8100000
#define EPSILON 1e-7
#define swap(a, b)              \
    {                           \
        __typeof(a) __temp = a; \
        a = b;                  \
        b = __temp;             \
    }
// #define DEBUG

#ifdef DEBUG
#define log(frm, args...)    \
    {                        \
        printf(frm, ##args); \
    }
#else
#define log(frm, args...)
#endif

/*
void swap(int *a, int *b){
    *a = *a + *b;
    *b = *a - *b;
    *a = *a - *b;
}*/
int is_little()
{
    int num = 1;
    return ((char *)(&num))[0];
}

int heap_comp(int a, int b)
{
    return b - a;
}

typedef struct
{
    int size;
    int len;
    int *data;
} Heap;

Heap *createHeap(int len)
{
    Heap *h = (Heap *)malloc(sizeof(Heap));
    h->len = len;
    h->size = 0;
    h->data = (int *)malloc(sizeof(int) * len);
    return h;
}
void freeHeap(Heap *h)
{
    if (!h)
        return;
    free(h->data);
    free(h);
}
void shift_up(Heap *h, int idx)
{
    while (idx)
    {
        int p = (idx - 1) / 2;
        if (heap_comp(h->data[idx], h->data[p]) > 0)
        {
            swap(h->data[p], h->data[idx]);
            idx = p;
        }
        else
            break;
    }
}
void shift_down(Heap *h, int idx)
{
    while (idx * 2 + 1 < h->size)
    {
        int child = idx;
        if (heap_comp(h->data[child], h->data[idx * 2 + 1]) < 0)
        {
            child = idx * 2 + 1;
        }
        if (
            idx * 2 + 2 < h->len && heap_comp(h->data[child], h->data[idx * 2 + 2]) < 0)
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
    shift_down(h, 0);
    return val;
}
int heap_add(Heap *h, int val)
{
    if (!h || h->len == h->size)
        return 0;
    h->data[h->size] = val;
    shift_up(h, h->size++);
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
    printf("]\n");
#endif
}
typedef struct
{
    int money, day;
} Goods;
int comp(const void *a, const void *b)
{
    Goods *ga = (*(Goods **)a), *gb = (*(Goods **)b);
    return ga->day - gb->day;
}
int main()
{
    int n, money, day;
    scanf("%d", &n);
    Goods **arr = (Goods **)malloc(sizeof(Goods) * n);
    for (int i = 0; i < n; i++)
    {
        scanf("%d %d", &money, &day);
        arr[i] = (Goods *)malloc(sizeof(Goods));
        arr[i]->day = day;
        arr[i]->money = money;
    }
    qsort(arr, n, sizeof(Goods), comp);
    for (int i = 0; i < n; i++)
    {
        log("%d = (%d,%d)\n", i, arr[i]->money, arr[i]->day);
    }
    Heap *h = createHeap(n);
    for (int i = 0; i < n; i++)
    {

        Goods *item = arr[i];
        if (item->day > h->size)
        {
            log("add item : money = %d, day = %d\n", item->money, item->day);
            heap_add(h, item->money);
        }
        else if (item->day == h->size && item->money > heap_top(h))
        {
            int remove = heap_remove(h);
            log("remove : money = %d\n", remove);
            heap_add(h, item->money);
            log("add item : money = %d, day = %d\n", item->money, item->day);
        }
        heap_show(h);
    }
    int ans = 0;
    while (h->size)
        ans += heap_remove(h);
    printf("%d\n", ans);
    return 0;
}
