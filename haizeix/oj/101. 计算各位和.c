#include <stdio.h>

int main(){
    int a;
    scanf("%d",&a);
    int ans = 0;
    while(a){
        ans += a % 10 ;
        a /= 10;
    }
    printf("%d",ans);
    return 0;
}
