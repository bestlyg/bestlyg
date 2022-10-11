#include <stdio.h>
#include <math.h>
#include <stdlib.h>
#include <string.h>
#include <ctype.h>

#define PI acos(-1)
#define MAX_PRIME 8100000
#define MAX 8100000
#define EPSILON 1e-7

void swap(int *a, int *b){
    *a = *a + *b;
    *b = *a - *b;
    *a = *a - *b;
}
int* get_prime(){
    static int arr[MAX_PRIME];
    arr[0] = arr[1] = 0;
    for(int i = 2; i <= MAX_PRIME; i++) arr[i] = 1;
    for(int i = 2; i <= MAX_PRIME; i++){
        if(!arr[i]) continue;
        for(int j = 2; i * j <= MAX_PRIME; j++) arr[i * j] = 0;
    }
    return arr;
}

int cmp_fn(const void *a, const void *b){
    return (*(int*)a - *(int*)b);
}
int main(){
    int n;
    scanf("%d", &n);
    int arr[n];
    for(int i = 0; i < n; i++) scanf("%d", &arr[i]);
    qsort(arr, n, sizeof(int), cmp_fn);
  //  for(int i = 0; i < n; i++) printf("%d ", arr[i]);
  //  printf("\n");
    int m = (n - 1) >> 1, cnt = 0;
    for(int i = 0; i < n; i++) if(arr[i] >= arr[m]) cnt++;
    printf("%d %d", arr[m], cnt);
    return 0;
}
