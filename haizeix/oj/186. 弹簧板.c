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
    int n;
    scanf("%d" ,&n);
    int nums[n];
    for(int i = 0; i < n; i++) scanf("%d", &nums[i]);
    int cnt = 1, idx = 0;
    while(idx + nums[idx] < n){
        cnt++;
        idx += nums[idx];
    }
    printf("%d", cnt);
    return 0;
}
