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

int cmp_fn1(const void *a, const void *b){
    return (*(int*)a - *(int*)b);
}
int cmp_fn2(const void *a, const void *b){
    return (*(int*)b - *(int*)a);
}
int main(){
    int n, l1, r1, l2, r2;
    scanf("%d %d %d %d %d", &n, &l1, &r1, &l2, &r2);
    int arr[n];
    for(int i = 0; i < n; i++) scanf("%d", &arr[i]);
    qsort(arr + l1 - 1, r1 - l1 + 1, sizeof(int), cmp_fn1);
    qsort(arr + l2 - 1, r2 - l2 + 1, sizeof(int), cmp_fn2);
	for(int i = 0; i < n; i++){
	i !=0 && printf(" ");
		 printf("%d", arr[i]);
	}
    return 0;
}
