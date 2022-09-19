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
    scanf("%d", &n);
    int nums[n];
    for(int i = 0; i < n; i++){
        scanf("%d", &nums[i]);
    }
    for(int i = 0; i < n; i++){
        for(int j = 0; j < n - 1 - i; j++){
            if(nums[j] > nums[j+1]) swap(&nums[j], &nums[j+1]);
        }
    }
    int cnt = 0;
    for(int i = 0; i < n; i++){
        while(i + 1 < n && nums[i] == nums[i + 1]) i++;
        cnt++;
    }
    printf("%d\n", cnt);
    for(int i = 0; i < n; i++){
        while(i + 1 < n && nums[i] == nums[i + 1]) i++;
        i != 0 && printf(" ");
        printf("%d", nums[i]);
    }
    return 0;
}
