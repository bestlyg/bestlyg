#include <stdio.h>
#include <math.h>
#include <stdlib.h>
#include <string.h>
#include <ctype.h>

#define PI acos(-1)

int main(){
    int n, num1 = 1, num2 = 1;
    scanf("%d", &n);
	 if(n == 1 || n == 2)return 1;
	 n -=2 ;
    while(n--){
        int next_num = num1 + num2;
        num1 = num2;
        num2 = next_num;
    }
    printf("%d", num2);
    return 0;
}
