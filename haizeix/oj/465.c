#include <stdio.h>
#include <math.h>
#include <stdlib.h>
#include <string.h>
#include <ctype.h>

#define PI acos(-1)

int main(){
    long long n, k;
    scanf("%lld %lld", &n, &k);
    char str[20];
    sprintf(str, "%lld", n);
    //printf("%s\n", str);
    if(strlen(str) < k){
        printf("0");
    }else {
        printf("%c", str[strlen(str) - k]);
    }
    return 0;
}
