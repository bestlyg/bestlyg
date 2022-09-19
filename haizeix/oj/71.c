#include <stdio.h>
#include <stdlib.h>
typedef struct unionfind
{
    int *father, len, size;
} UnionFind;
UnionFind *unionfind_create(int len)
{
    UnionFind *uf = (UnionFind *)malloc(sizeof(UnionFind));
    uf->size = uf->len = len;
    uf->father = (int *)malloc(sizeof(int) * len);
    for (int i = 0; i < len; i++)
        uf->father[i] = i;
    return uf;
}
void unionfind_free(UnionFind *uf)
{
    free(uf->father);
    free(uf);
}
int unionfind_find(UnionFind *uf, int data)
{
    return uf->father[data] = uf->father[data] == data ? data : unionfind_find(uf, uf->father[data]);
}
void unionfind_union(UnionFind *uf, int data1, int data2)
{
    int p1 = unionfind_find(uf, data1), p2 = unionfind_find(uf, data2);
    if (p1 == p2)
        return;
    uf->size--;
    uf->father[p1] = p2;
}
int main()
{
    int n, m, a, b, c;
    scanf("%d %d", &n, &m);
    UnionFind *uf = unionfind_create(n);
    for (int i = 0; i < m; i++)
    {
        scanf("%d %d %d", &a, &b, &c);
        --b;
        --c;
        if (a == 1)
        {
            unionfind_union(uf, b, c);
        }
        else
        {
            printf("%s\n", unionfind_find(uf, b) == unionfind_find(uf, c) ? "Yes" : "No");
        }
    }
    return 0;
}
