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
int main(){
    int n;
    scanf("%d", &n);
    int nums[n], idx[n];
    for(int i = 0; i < n; i++){
        scanf("%d", &nums[i]);
        idx[i] = i;
    }
    for(int i = 0; i < n; i++){
        for(int j = 0; j < n - 1 - i; j++){
            if(nums[idx[j]] > nums[idx[j + 1]]) swap(&idx[j], &idx[j+1]);
        }
    }
    for(int i = 0; i < n; i++){
        i != 0 && printf(" ");
        printf("%d", idx[i] + 1);
    }
    return 0;
}
