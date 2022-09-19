#include <stdio.h>
#include <math.h>
#include <stdlib.h>
#include <string.h>
#include <ctype.h>

#define PI acos(-1)

void format(char str[]){
    //printf("================\ninput [%s]\n", str);
    char *pos = str - 1;
    char *temp = str;
    while( strstr(pos + 1, "Ban_smoking") != NULL){
        pos = strstr(pos + 1, "Ban_smoking");
        int idx = pos - str;
        //printf("find Ban_smoking in %ld\n", pos - str);
        char suffix[1000];
        strcpy(suffix, str + idx + strlen("Ban_smoking"));
        //printf("temp : [%s], suffix : [%s]\n", temp + idx, suffix);
        strcpy(temp + idx, "No_smoking");
        //printf("temp : [%s]\n", temp);
        strcpy(temp + idx + strlen("No_smoking"), suffix);
        //printf("temp : [%s]\n", temp);
    }
}
int main(){
    int n;
    scanf("%d", &n);
    char str[n][1000];
    for(int i = 0; i < n; i++){
        scanf("%s", str[i]);
    }
    for(int i = 0; i < n; i++){
        format(str[i]);
        printf("%s\n", str[i]);
    }
    return 0;
}
