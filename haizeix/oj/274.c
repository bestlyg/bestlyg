#include <stdio.h>
#include <stdlib.h>
#define MAX 6
#ifdef DEBUG
#define log(frm, args...)    \
    {                        \
        printf(frm, ##args); \
    }
#else
#define log(frm, args...)
#endif
int compare(int *arr1, int *arr2)
{
    log("compare\n");
    int same = 0, f;
    for (int i = 0; i < MAX; i++)
    {
        f = 1;
        for (int j = 0; j < MAX; j++)
        {
            if (arr1[(i + j) % MAX] != arr2[j])
            {
                f = 0;
                break;
            }
        }
        if (f)
        {
            same = 1;
            break;
        }
        log("re");
        f = 1;
        for (int j = 0; j < MAX; j++)
        {
            log("re idx = %d\n", (i - j + MAX) % MAX);
            if (arr1[(i - j + MAX) % MAX] != arr2[j])
            {
                f = 0;
                break;
            }
        }
        if (f)
        {
            same = 1;
            break;
        }
    }
    log("find same = %d\n", same);
    return same;
}
typedef struct hashnode
{
    int *data;
    struct hashnode *next;
} HashNode;
HashNode *hashnode_create(int *data)
{
    HashNode *node = (HashNode *)malloc(sizeof(HashNode));
    node->data = data;
    node->next = NULL;
    return node;
}
void hashnode_free(HashNode *node)
{
    free(node->data);
    free(node);
}
typedef struct hashtable
{
    int len;
    HashNode **list;
} HashTable;
HashTable *hashtable_create(int len)
{
    HashTable *table = (HashTable *)malloc(sizeof(HashTable));
    table->len = len;
    table->list = (HashNode **)malloc(sizeof(HashNode) * len);
    for (int i = 0; i < len; i++)
        table->list[i] = hashnode_create((int *)malloc(sizeof(int)));
    return table;
}
void hashtable_free(HashTable *table)
{
    for (int i = 0; i < table->len; i++)
    {
        if (!table->list[i])
            continue;
        HashNode *p = table->list[i];
        while (p)
        {
            HashNode *next = p->next;
            hashnode_free(p);
            p = next;
        }
    }
    free(table);
}
int hashtable_hash(HashTable *table, int *data)
{
    int ans = 0;
    for (int i = 0; i < MAX; i++)
        ans += data[i];
    return ans % table->len;
}
int hashtable_set(HashTable *table, int *data)
{
    log("hashtable_set\n");
    int hash = hashtable_hash(table, data);
    log("get data hash = %d\n", hash);
    HashNode *p = table->list[hash];
    while (p->next && compare(data, p->next->data) != 1)
    {
        log("in loop\n");
        p = p->next;
    }
    log("get prev node\n");
    if (p->next)
    {
        log("p->next != null\n");
        free(p->next->data);
        p->next->data = data;
        return 0;
    }
    log("p->next == null\n");
    HashNode *next = p->next;
    p->next = hashnode_create(data);
    p->next->next = next;
    return 1;
}
int hashtable_del(HashTable *table, int *data)
{
    int hash = hashtable_hash(table, data);
    HashNode *p = table->list[hash];
    while (p->next && compare(data, p->next->data) != 1)
        p = p->next;
    if (!p->next)
        return 0;
    HashNode *next = p->next->next;
    hashnode_free(p->next);
    p->next = next;
    return 1;
}
int main()
{
    int n, flag = 1;
    scanf("%d", &n);
    HashTable *table = hashtable_create(100007);
    for (int i = 0; i < n; i++)
    {
        int *arr = (int *)malloc(sizeof(int) * MAX);
        for (int j = 0; j < MAX; j++)
            scanf("%d", &arr[j]);
        log("load %d arr\n", i + 1);
        int res = hashtable_set(table, arr);
        log("res = %d\n", res);
        if (flag == 1)
            flag = res;
        log("load end\n");
    }
    printf("%s", flag ? "No two snowflakes are alike.\n" : "Twin snowflakes found.\n");
    return 0;
}
