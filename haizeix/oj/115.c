#include <stdio.h>

int main(){
    int x,y;
    scanf("%d %d",&x,&y);
    if(x == y){
        printf("100");
    }else {
        int x1 = x / 10 ;
        int x2 = x % 10 ;
        int y1 = y / 10 ;
        int y2 = y % 10 ;
        if(x1 == y2 && x2 == y1){
            printf("20");
        }else if(x1 == y1 || x1 == y2 || x2 == y1 || x2 == y2){
            printf("2");
        }else {
            printf("0");
        }
    }
    return 0;
}
