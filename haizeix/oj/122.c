#include <stdio.h>
#include <math.h>
#include <stdlib.h>

int main(){
    int time ;
    scanf("%d",&time);
    int h = time / 3600;
    time %= 3600;
    int m = time / 60 ;
    time %= 60;
    int s = time ;
    char * str = "am";
    if( h > 12 ){
        h -= 12 ;
        if( h <= 1 )
            str = "midnoon";
        else
            str = "pm";
	}else if( h >= 12 ) str = "midnoon";
    printf("%02d:%02d:%02d %s",h,m,s,str);
    return 0;
}
