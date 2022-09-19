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
    int n, nums[50] = {0};
    scanf("%d" ,&n);
    nums[1] = 1;
    nums[2] = 1;
    for(int i = 3; i < n; i++){
        nums[i] = nums[i - 2] + nums[i - 3];
       // printf("nums[%d]=%d\n", i, nums[i]);
    }
    printf("%d", nums[n - 1]);
    return 0;
}
