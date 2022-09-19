#include <stdio.h>

int main(){
    int y , m ,d;
    scanf("%d %d %d",&y , &m, &d);
    int monthArr[13] = {
            0,31,
            y % 100 != 0 && y % 4 ==0 || y % 400 ==0 ? 29 : 28 ,
            31 , 30, 31, 30 ,31,31,30,31, 30 ,31  };
    if( m < 1 || m > 12 || monthArr[m] < d){
        printf("NO");
    }else {
        printf("YES");
    }
    return 0;
}
