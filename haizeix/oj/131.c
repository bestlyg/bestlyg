#include <stdio.h>
#include <math.h>
#include <stdlib.h>

int main(){
    int temp, n, min = 10001 , max = 0;
    scanf("%d", &n);
    for(int i = 0; i < n ; i++){
        scanf("%d", &temp);
        min = temp < min ? temp : min;
        max = temp > max ? temp : max;
    }
    printf("%d", max - min);
    return 0;
}
