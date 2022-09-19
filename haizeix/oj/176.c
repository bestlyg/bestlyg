#include <stdio.h>
#include <math.h>
#include <stdlib.h>
#include <string.h>
#include <ctype.h>

#define PI acos(-1)

int main(){
    char a[1000], b[1000];
    scanf("%s %s", a, b);
    char *pos = a - 1;
    int cnt = 0;
    while(strstr(pos + 1, b) != NULL){
        pos = strstr(pos + 1, b);
        cnt++;
    }
    printf("%d", cnt);
    return 0;
}
