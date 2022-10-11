#include <stdio.h>
#include <math.h>
#include <stdlib.h>
#include <string.h>
#include <ctype.h>

#define PI acos(-1)

void swap(int *a, int *b){
    *a = *a + *b;
    *b = *a - *b;
    *a = *a - *b;
}
int cache[110000];
int f(int x, int m, int a[]){
    // printf("input x=%d, m=%d, cache[%d]=%d \n", x, m, x, cache[x]);
    if(cache[x] != -1) return cache[x];
    if(x < 10) return cache[x] = x;
    int ans = 0;
    for(int i = 1; i <= 10; i++){
        ans += a[i - 1] * f(x - i, m, a);
    }
    return cache[x] = ans % m;
}
int main(){
    for(int i = 0; i < 110000; i++) cache[i] = -1;
    int k, m, a[10];
    scanf("%d %d", &k, &m);
    for(int i = 0; i < 10; i++) scanf("%d", &a[i]);
    printf("%d\n", f(k, m, a));
    return 0;
}
