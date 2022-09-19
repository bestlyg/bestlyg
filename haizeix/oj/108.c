#include <stdio.h>

int main(){
    char c;
    scanf("%c",&c);
    double m , n ;
    scanf("%lf %lf",&m,&n);
    double ans = m * n ;
    if(c == 't'){
        ans /= 2;
    }
    printf("%.2lf",ans);
    return 0;
}
