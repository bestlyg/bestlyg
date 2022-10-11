#include <stdio.h>

int main(){
    int begin , n ;
    scanf("%d %d",&begin,&n);
    if(begin<0)begin = 0;
    else if(begin%2!=0)begin += 1;
    while(n--){
        printf("%d\n",begin);
        begin+=2;
    }
    return 0;
}
