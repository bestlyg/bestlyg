#include <stdio.h>

int main(){
    int a,b,c,t;
    scanf("%d %d %d %d",&a,&b,&c,&t);
    float inWater1 = 1.0 / a + 1.0 / b;
    float inWater2 = inWater1 - 1.0 / c;
    float ans = ( 1.0 - inWater1 * t) / inWater2;
    printf("%.2f",ans + t );
    return 0;
}
