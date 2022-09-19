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
int main(){
    int n;
    scanf("%d", &n);
    int cnt = 0;
    int *prime = get_prime(n);
    for(int i = 0; i <= n / 2; i++){
        if(!*(prime + i) || !*(prime + n - i)) continue;
        cnt++;
    }
    printf("%d", cnt);
    return 0;
}
