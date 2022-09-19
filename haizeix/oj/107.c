#include <stdio.h>

int main(){
    int n ;
    scanf("%d",&n);
    printf( n % 7 == 0 && n % 2 != 0 ? "YES":"NO");
    return 0;
}
