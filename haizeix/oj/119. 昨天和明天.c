#include <stdio.h>

int main(){
    int y , m ,d;
    scanf("%d %d %d",&y , &m, &d);
    int prevY = y , prevM=m ,prevD=d ;
    int laterY = y , laterM = m , laterD = d;
    int monthArr[13] = {
            0,31,
            y % 100 != 0 && y % 4 ==0 || y % 400 ==0 ? 29 : 28 ,
            31 , 30, 31, 30 ,31,31,30,31, 30 ,31  };
    if(d == 1){
        laterD++;
        if(m == 1){
            prevM = 13;
            prevY-- ;
        }
        prevM--;
        prevD = monthArr[prevM];
    }else if ( d == monthArr[m]){
        prevD--;
        if(m == 12){
            laterM=0;
            laterY++;
        }
        laterM++;
        laterD = 1;
    }else {
        prevD--;
        laterD++;
    }
    printf("%d %d %d\n",prevY,prevM,prevD);
    printf("%d %d %d\n",laterY,laterM,laterD);
    return 0;
}
