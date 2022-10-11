#include <stdio.h>
#include <math.h>
#include <stdlib.h>
#include <string.h>
#include <ctype.h>

#define PI acos(-1)

int main(){
    int m, n;
    scanf("%d %d", &m, &n);
    if(m < n){
        int temp = m;
        m = n;
        n = temp;
    }
    if(m % n == 0){
        printf("%d", n);
        return 0;
    }
    while(n != 0){
        int mod = m % n;
        m = n;
        n = mod;
    }
    printf("%d", m);
    return 0;
}
