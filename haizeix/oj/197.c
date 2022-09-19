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
    int nums[10];
    for(int i = 0; i < 10; i++) scanf("%d", &nums[i]);
    for(int i = 0; i < 10; i++){
        for(int j = 0; j < 10 - 1 - i; j++){
            if(nums[j] < nums[j+1]){
                swap(&nums[j], &nums[j+1]);
            }
        }
    }
    for(int i = 0; i < 10; i++){
        i != 0 && printf(" ");
        printf("%d", nums[i]);
    }
    return 0;
}
