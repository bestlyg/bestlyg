#include <stdio.h>
int main(){
    int a,b,c;
    scanf("%d %d %d",&a,&b,&c);
    if(a>b){
      a = a + b;
      b = a - b;
      a = a - b;
    }
    if(a > c){
      a = a + c;
      c = a - c;
      a = a - c;
    }
    if(b > c ){
      b = b + c ;
      c = b - c ;
      b = b - c ;
    }
    int sum = a * a + b * b ;
    if( a+b < c || a+c < b || b+c < a){
        printf("illegal triangle");
    }else if( sum > c * c){
        printf("acute triangle");
    }else if(sum == c * c ){
        printf("right triangle");
    }else if(sum < c * c ){
        printf("obtuse triangle");
    }
    return 0;
}
