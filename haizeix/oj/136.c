#include <stdio.h>
#include <math.h>
#include <stdlib.h>

int main(){
    int n ;
    scanf("%d",&n);
    for(int i = 7 ; i <= n ; i += 7 ){
        printf("%d\n",i);
    }
    return 0;
}
