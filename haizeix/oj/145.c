#include <stdio.h>
#include <math.h>
#include <stdlib.h>
#include <string.h>

int main(){
    int n;
    scanf("%d", &n);
	char name[100],ans[100]={0};
    for(int i = 0; i < n ; i++){
        scanf("%s", name);
        //printf("input name : %s\n", name);
        if(strlen(name) > strlen(ans)){
            strcpy(ans,name);
        }
       // printf("ans name : %s\n", ans);
    }
    printf("%s", ans);
    return 0;
}
