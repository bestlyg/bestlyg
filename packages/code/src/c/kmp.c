#include <stdio.h>
#include <stdlib.h>
#include <string.h>

#define MAX 26

void printNext(int **next, int len) {
    printf("===[PRINT NEXT START]===\n");
    for (int i = 0; i < len; i++) {
        printf("i = %d : ", i);
        for (int j = 0; j < MAX / 2; j++) {
            if (j != 0) printf(", ");
            printf("%c = %d", j + 'a', next[i][j]);
        }
        printf("\n        ");
        for (int j = MAX / 2; j < MAX; j++) {
            if (j != MAX / 2) printf(", ");
            printf("%c = %d", j + 'a', next[i][j]);
        }
        printf("\n-------------------------------------\n");
    }
    printf("===[PRINT NEXT END]===\n");
}
int **getJump(const char *t, int len) {
    int **res = (int **)malloc(sizeof(int *) * len);
    for (int i = 0; i < len; i++) {
        res[i] = (int *)malloc(sizeof(int) * MAX);
        memset(res[i], -1, sizeof(int) * MAX);
    }
    int j = -1;
    for (int i = 0; i < len; i++) {
        while (j + 1 < len && t[j + 1] != t[i]) j =
    }
    printNext(res, len);
    return res;
}

int kmp(const char *s, const char *t) {
    int tlen = strlen(t);
    printf("tlen = %d\n", tlen);
    int **next = getNext(t, tlen);
    for (int i = 0, j = 0; s[i]; i++) {
        // j = next[j][s[i] - 'a'];
    }
    return -1;
}

int main() {
    char *s = "hellodelloellossfgahf";
    char *t = "elloellos";
    printf("s = %s, t = %s, find = %d\n", s, t, kmp(s, t));
    return 0;
}