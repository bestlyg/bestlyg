#include <stdio.h>
#include <math.h>
#include <stdlib.h>
#include <string.h>
#include <ctype.h>

#define PI acos(-1)

int main(){
    char str[26];
    scanf("%s", str);
    int len = strlen(str);
    int start = 0;
    for(int i = 0; i < len ; i++){
        for(int j = start, cnt = 0; cnt < len ; j = (j + 1) % len, cnt++){
            printf("%c", str[j]);
        }
        printf("\n");
        start = (start + len - 2) % len;
    }
    return 0;
}
