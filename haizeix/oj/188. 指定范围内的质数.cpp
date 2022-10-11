#include <cstdio>
int num[1000005];
void init(){
    for (int i = 2; i * i <= 1000005; i++) {
        if (num[i] == 0) {
            for (int j = 2; i * j <= 1000005; j++) num[i * j] = 1;
        }
    }
}
int main(){
    init();
    int l, r;
    scanf("%d %d", &r, &l);
    for (int i = l; i <= r; i++) {
        if (num[i] == 0) {
            printf("%d\n", i);
        }
    }
    return 0;
}
