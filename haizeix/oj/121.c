#include <stdio.h>
#include <math.h>
int main(){
    char a,b ;
    scanf("%c %c",&a,&b);
    if(a == b) printf("TIE");
    else if(a == 'O' && b == 'Y' || a == 'Y' && b == 'H' || a == 'H' && b == 'O' )
            printf("MING");
    else printf("LI");
    return 0;
}
