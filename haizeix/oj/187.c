#include <stdio.h>
#include <math.h>
#include <stdlib.h>
#include <string.h>
#include <ctype.h>

#define PI acos(-1)

int main(){
    long long n, cnt = 1, ps = 1;
    scanf("%d", &n);
    if( n > 1){
        for(int i = 2; i <= n ; i++){
            cnt = cnt * 2 + 1;
            ps = ps * 2 + i;
        }
    }
    printf("%lld %lld", cnt, ps);
    return 0;
}
