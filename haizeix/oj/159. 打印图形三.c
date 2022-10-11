#include <stdio.h>
#include <math.h>
#include <stdlib.h>
#include <string.h>

int main(){
    char ch;
    scanf("%c", &ch);
    for(int i = ch; i >= 'A'; i--){
       for(int j = i; j < ch; j++) printf(" ");
       for(int j = i; j >= 'A'; j--) printf("%c", j);
       if(i != 'A')for(int j = 'A'; j <= i-1; j++) printf("%c", j);
       printf("\n");
    }
    return 0;
}
