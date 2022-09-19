#include <stdio.h>
int main(){
    int year;
    scanf("%d",&year);
    int mod = ( year + 1900 * 12  - 1900 ) % 12;
    if(mod == 0) {
        printf("rat");
    }else if(mod == 1){
        printf("ox");
    }else if(mod == 2){
        printf("tigger");
    }else if(mod == 3){
        printf("rabbit");
    }else if(mod == 4){
        printf("dragon");
    }else if(mod == 5){
        printf("snake");
    }else if(mod == 6){
        printf("horse");
    }else if(mod == 7){
        printf("sheep");
    }else if(mod == 8){
        printf("monkey");
    }else if(mod == 9){
        printf("rooster");
    }else if(mod == 10){
        printf("dog");
    }else if(mod == 11){
        printf("pig");
    }
    return 0;
}
