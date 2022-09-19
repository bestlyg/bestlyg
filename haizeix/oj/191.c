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
    int a, b, *prime = get_prime();
    scanf("%d %d", &a, &b);
    int left, right;
    for(int i = a; i <= b; i++) {
        if(prime[i]){
            left = i;
            break;
        }
    }
    for(int i = b; i >= a; i--) {
        if(prime[i]){
            right = i;
            break;
        }
    }
    if(left == right){
        printf("There are no adjacent primes.");
        return 0;
    }
    int num = a, next_num = a, nums1[2], nums2[2], distant1 = -1, distant2 = -1;
	while(!prime[num]) num++;
	next_num = num;
    while(1){
        while(next_num + 1 <= b && prime[next_num + 1] == 0) next_num++;
        next_num++;
        if(next_num > b) break;
        int distant = next_num - num;
        if(distant1 == -1 || distant < distant1){
            nums1[0] = num;
            nums1[1] = next_num;
            distant1 = distant;
        }
        if(distant2 == -1 || distant > distant2){
            nums2[0] = num;
            nums2[1] = next_num;
            distant2 = distant;
        }
       // printf("num = %d, next_num = %d\n", num, next_num);
        num = next_num;
    }
    printf("%d,%d are closest, %d,%d are most distant.", nums1[0], nums1[1], nums2[0], nums2[1]);
    return 0;
}
