#include <stdio.h>
#include <math.h>
#include <stdlib.h>
#include <string.h>
#include <ctype.h>

#define PI acos(-1)

int main(){
    int n, str[26];
    for(int i = 0; i < 26; i++)str[i] = 0;
    scanf("%d", &n);
    getchar();
    for(int i = 0; i < n; i++){
        char ch;
        int num;
        scanf("%c", &ch);
        getchar();
        scanf("%d", &num);
        getchar();
        //printf("input ch=%c num=%d\n", ch, num);
        str[ch - 'A'] = num;
    }
    char pw[30]={0};
    scanf("%s", pw);
    int ans = 0;
    for(int i = 0; i < strlen(pw); i++){
        if(islower(pw[i])) continue;
        if(str[pw[i] - 'A'] == 0) continue;
        ans += str[pw[i] - 'A'];
    }
    printf("%d", ans);
    return 0;
}
