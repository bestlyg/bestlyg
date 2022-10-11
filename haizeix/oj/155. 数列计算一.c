#include <stdio.h>
#include <math.h>
#include <stdlib.h>
#include <string.h>

int main(){
    int n;
    scanf("%d", &n);
    int num = 3, add = 2, sum = 0;
    while(n--){
        printf("%d\n",num);
        sum += num;
        num += add;
        add += 2;
    }
    printf("%d\n", sum);
    return 0;
}
