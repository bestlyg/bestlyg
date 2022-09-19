#include <stdio.h>
#include <math.h>
int main(){
    long long c ;
    scanf("%lld",&c);
    int ans = 0;
    for(long long a = 1 ; a < c ; a++ ) {
        long long b = sqrt(c * c - a * a);
        if( a * a + b * b == c * c ){
            ans++;
        }
    }
    printf("%d",ans / 2);
    return 0;
}
