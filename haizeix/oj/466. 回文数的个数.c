#include <stdio.h>
#include <math.h>
#include <stdlib.h>
#include <string.h>
#include <ctype.h>

#define PI acos(-1)

int main(){
    int n, cnt = 0;
    scanf("%d", &n);
    for(int i = 1; i <= n; i++){
        char str[10];
        sprintf(str, "%d", i);
        int len = strlen(str), f = 1;
        for(int j = 0; j < len / 2; j++){
            if(str[j] != str[len - j - 1]){
                f = 0;
                break;
            }
        }
        if(f) cnt++;
    }
    printf("%d", cnt);
    return 0;
}
