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
    int m, n;
    scanf("%d %d", &m, &n);
    int nums[m][n], sums[m * n], idx = 0;
    for(int i = 0; i < m; i++){
        for(int j = 0; j < n; j++){
            scanf("%d", &nums[i][j]);
            sums[idx++] = nums[i][j];
        }
    }
    for(int i = 0; i < n * m; i++){
        for(int j = 0; j < n * m - 1 - i; j++){
            if(sums[j] < sums[j+1]) swap(&sums[j], &sums[j+1]);
        }
    }
    int max = -1;
    for(int j = 0; j < n; j++){
        max = nums[0][j];
        for(int i = 0; i < m; i++){
            max = max < nums[i][j] ? nums[i][j] : max;
        }
        printf("%d\n", max);
    }
    int sum = 0, avg;
    for(int i = 0; i < m * n; i++){
        i != 0 && printf(" ");
        printf("%d", sums[i]);
        sum += sums[i];
    }
    printf("\n%d\n", avg = round(1.0 * sum / m / n));
    int cnt = 0;
    for(int i = 0; i < m * n; i++){
        if(sums[i] >= avg) cnt++;
    }
    printf("%d\n", cnt);
    return 0;
}
