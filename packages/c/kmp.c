#include <stdio.h>
#include <stdlib.h>

int *getNext(const char *t) {}

int kmp(const char *s, const char *t) {
    int *next = getNext(t);
    for (int i = 0, j = 0; s[i]; i++) {
        j = next[j][s[i] - 'a'];
    }
    return -1;
}

int main() {
    char *s = "hellodelloellossfgahf";
    char *t = "elloellos";
    printf("s = %s, t = %s, find = %d\n", s, t, kmp(s, t));
    return 0;
}