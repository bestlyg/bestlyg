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

int bs(int num, int arr[], int n){
    if(arr[0] > num) return arr[0];
    if(arr[n - 1] < num) return arr[n - 1];
    int l = 0, r = n - 1, m;
    while(l < r){
        m = (l + r) >> 1;
        if(arr[m] > num) r = m;
        else l = m + 1;
    }
    return arr[l - 1];
}

int main(){
    int n, m;
    scanf("%d %d", &n, &m);
    int nums[n], check[m];
    for(int i = 0; i < n; i++) scanf("%d" ,&nums[i]);
    for(int i = 0; i < m; i++) scanf("%d" ,&check[i]);
    for(int i = 0; i < m; i++){
        i != 0 && printf(" ");
        printf("%d", bs(check[i], nums, n));
    }
    return 0;
}
