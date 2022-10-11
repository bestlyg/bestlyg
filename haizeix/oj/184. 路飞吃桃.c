#include <stdio.h>
#include <math.h>
#include <stdlib.h>
#include <string.h>
#include <ctype.h>

#define PI acos(-1)

int main(){
    int n, num = 1;
    scanf("%d", &n);
    while(--n){
        num = (num + 1) * 2;
    }
    printf("%d", num);
    return 0;
}
