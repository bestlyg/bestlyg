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
    int nums[n];
    for(int i = 0; i < n; i++){
        scanf("%d", &nums[i]);
    }
    for(int i = 0; i < n; i++){
        for(int j = 0; j < n - 1 - i; j++){
            if(nums[j] < nums[j+1]) swap(&nums[j], &nums[j+1]);
        }
    }
    for(int i = 0; i < n; i++) printf("%d\n", nums[i]);
    int b[6] = {0};
    for(int i = 0; i < n; i++){
        int num = nums[i];
        if(num == 100) b[0]++;
        else if(num >= 90) b[1]++;
        else if(num >= 80) b[2]++;
        else if(num >= 70) b[3]++;
        else if(num >= 60) b[4]++;
        else b[5]++;
    }
    for(int i = 0; i < 6; i++){
        i != 0 && printf(" ");
        printf("%d", b[i]);
    }
    return 0;
}
