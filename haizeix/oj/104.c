#include <stdio.h>

int main(){
    int a;
    scanf("%d",&a);
    while(a){
        if( a % 10 == 9 ){
            printf("YES");
            return 0;
        }
        a /= 10;
    }
    printf("NO");
    return 0;
}
