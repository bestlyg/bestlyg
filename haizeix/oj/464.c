#include <stdio.h>
#include <math.h>
#include <stdlib.h>
#include <string.h>
#include <ctype.h>

#define PI acos(-1)

int main(){
    int x, y, cnt = 0;
    scanf("%d %d", &x, &y);
    for(int year = x; year <= y; year++){
        if(year % 100 != 0 && year % 4 ==0 || year % 400 ==0)
        cnt++;
    }
	printf("%d",cnt);
    return 0;
}
