#include <stdio.h>

int main(){
    int a;
    scanf("%d",&a);
    int num = a;
    int ans = 0;
    while(a){
        ans = ans * 10 + a % 10 ;
        a /= 10;
    }
    printf(num == ans ? "YES" : "NO");
    return 0;
}
