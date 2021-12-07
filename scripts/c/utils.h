#ifndef UTILS
#define UTILS
#define DEBUG
#ifdef DEBUG
#define log(frm, args...)    \
    {                        \
        printf(frm, ##args); \
    }
#else
#define log(frm, args...)
#endif
#define swap(a, b)           \
    {                        \
        __typeof(a) tmp = a; \
        a = b;               \
        b = tmp;             \
    }
void quick_sort(int *nums, int l, int r);
void array_log(int *nums, int l, int r);
#endif