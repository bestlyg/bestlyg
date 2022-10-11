#include <stdio.h>
#include <math.h>
#include <stdlib.h>

int main(){
    int h,m,s,t ;
    scanf("%d %d %d %d",&h,&m,&s,&t);
    double percent = 1.0 * t / ( 24 * 60 * 60 ) ;
    char * str = "am";
    h += t / 3600 ;
    t %= 3600;
    m += t / 60 ;
    s += t % 60 ;
    if( s > 60 ){
        m += s / 60 ;
        s %= 60 ;
    }
    if( m > 60 ){
        h += m / 60 ;
        m %= 60 ;
    }
    // printf("%d %d %d\n" , h , m ,s ) ;
    if( h < 24 ){
         if( h >= 12 ){
             h -= 12;
			     if( h == 0 ) h = 12 ;
             str = "pm";
         }
    }else {
         h -= 24 ;
         if( h == 0 ) h = 12 ;
         else if( h >= 12 ){
             h -= 12;
             str = "pm";
         }
    }
    printf("%d:%d:%d%s\n",h,m,s,str);
    printf("%.2lf%%",percent * 100);
    return 0;
}
