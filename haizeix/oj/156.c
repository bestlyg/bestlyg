#include <stdio.h>
#include <math.h>
#include <stdlib.h>
#include <string.h>

int is_prime(int num){
    for(int i = 2; i <= num/2; i++){
        if(num % i == 0)return 0;
    }
    return 1;
}
int is_square(int num){
    int squ = sqrt(num);
    if( squ * squ == num )return 1;
    else return 0;
}
int check(int num){
    while(num){
        int subnum = num % 100;
        if(!is_square(subnum)) return 0;
        num /= 100;
    }
    return 1;
}
int main(){
    int a, b, cnt = 0;
    scanf("%d %d", &a, &b);
    for(int i = a; i <= b ; i++){
        if(is_prime(i) && check(i)){
            if(cnt != 0)printf(" ");
            printf("%d", i);
            cnt++;
        }
    }
    printf("\n%d",cnt);
    return 0;
}
