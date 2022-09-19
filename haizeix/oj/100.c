#include <stdio.h>

int main(){
    int n ;
    scanf("%d",&n);
    double mulNum = 1 + 0.00417;
    double ans = n * mulNum;
    for(int i = 1 ; i < 6 ; i ++ ) {
        ans = ( n + ans ) * mulNum;
    }
    printf("$%.2lf",ans);
    return 0;
}
