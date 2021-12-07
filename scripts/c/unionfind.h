#ifndef UNIFIND
#define UNIFIND
typedef struct unionfind
{
    int *father, len, size;
} UnionFind;
UnionFind *unionfind_create(int len);
void unionfind_free(UnionFind *uf);
int unionfind_find(UnionFind *uf, int data);
void unionfind_union(UnionFind *uf, int data1, int data2);
#endif