#include <stdio.h>
#include <math.h>
#include <stdlib.h>
#include <string.h>
#include <ctype.h>

#define PI acos(-1)
#define MAX 100000
#define EPSILON 1e-7

void swap(int *a, int *b){
    *a = *a + *b;
    *b = *a - *b;
    *a = *a - *b;
}
int bs(int num, int nums[], int l, int r){
    // printf("find num:%d, l=%d, r=%d\n", num, l, r);
    if(l > r || num < nums[l] || num > nums[r]) return -1;
    int m = (l + r) >> 1;
    if(nums[m] > num) return bs(num, nums, l, m - 1);
    else if(nums[m] < num) return bs(num, nums, m + 1, r);
    else return m;
}
int main(){
    int n, k;
    scanf("%d %d", &n, &k);
    int nums[n], find_nums[k];
    for(int i = 0; i < n; i++) scanf("%d", &nums[i]);
    for(int i = 0; i < k; i++) scanf("%d", &find_nums[i]);
    for(int i = 0; i < k; i++){
        i != 0 && printf(" ");
        printf("%d", 1 + bs(find_nums[i], nums, 0, n - 1));
    }
    return 0;
}
