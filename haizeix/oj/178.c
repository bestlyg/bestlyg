#include <stdio.h>
#include <math.h>
#include <stdlib.h>
#include <string.h>
#include <ctype.h>

#define PI acos(-1)

int main(){
    char str[1100000], ch = 'A';
    int n, len = 0;
    scanf("%d", &n);
    for(int i = 0; i < n ; i++){
        str[len++] = ch++;
        //printf("===\nend = %d\n", len - 1);
        for(int j = 0, prev_len = len, end = len - 1; j < end; j++){
            str[j + prev_len] = str[j];
            len++;
            //printf("str = %s, j = %d, len = %d\n", str, j, len);
        }
       // printf("%s\n", str);
    }
    printf("%s", str);
    return 0;
}
