#include <stdio.h>
#include <math.h>
#include <stdlib.h>

int main(){
    int n;
    scanf("%d", &n);
    for(int i = 1; i <= n ; i++){
        for(int j = i ; j <= n ; j++){
            if(j != i) printf("\t");
            printf("%d*%d=%d", i, j, i*j);
        }
        printf("\n");
    }
    return 0;
}
