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
int main(){
    int n, a = 4, b = 7;
    double ans = 1.0 * a / b;
    scanf("%d", &n);
    while(--n){
        int c = a + b;
        a = b;
        b = c;
        ans += 1.0 * a / b;
    }
    printf("%d/%d\n", a, b);
    printf("%.2lf", ans);
    return 0;
}
