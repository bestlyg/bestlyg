#include <stdio.h>
#include <math.h>
#include <stdlib.h>
#include <string.h>

#define PI acos(-1)

int main(){
    int N, bit = 1 << 5;
    scanf("%d", &N);
    char names[N][100];
    for(int i = 0; i < N; i++){
        scanf("%s", names[i]);
        int len = strlen(names[i]);
        names[i][0] &= ~bit;
        for(int j = 1; j < len; j++){
            names[i][j] |= bit;
        }
    }
    for(int i = 0; i < N; i++){
        for(int j = 0; j < N-1-i; j++){
            if(strcmp(names[j],names[j+1])>0){
                char temp[100];
                strcpy(temp, names[j]);
                strcpy(names[j], names[j+1]);
                strcpy(names[j+1], temp);
            }
        }
    }
    for(int i = 0; i < N; i++){
        printf("%s\n", names[i]);
    }

    return 0;
}
