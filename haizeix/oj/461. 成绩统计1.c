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
    getchar();
    int cnt = 0, sum = 0, temp_num;
    char temp[1000];
    for(int i = 0; i < n; i++){
        scanf("%c", temp);
        // printf("input c=%c\n", temp[0]);
        if(temp[0] == 'C'){
            cnt++;
            scanf("%s", temp);
        }else {
            scanf("%d", &temp_num);
            sum += temp_num;
        }
        getchar();
    }
    printf("%d %d", cnt, sum / (n - cnt));
    return 0;
}
