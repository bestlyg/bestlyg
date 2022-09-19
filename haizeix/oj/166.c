#include <stdio.h>
#include <math.h>
#include <stdlib.h>
#include <string.h>

#define PI acos(-1)

int main(){
    char A[1000],B[1000],C[1000];
    int N, ans1, ans3;
    scanf("%s %d %s", A, &N, B);
    ans1 = strlen(A) > 100 ? 100 : strlen(A);
    strcpy(C, A);
    strcpy(C+N-1, B);
    strcpy(C+N-1+strlen(B), A+N-1);
    printf("%d\n", ans1);
    printf("%s\n", C);
    ans3 = strlen(C) - 1;
    while(C[ans3] != 'x')ans3--;
    ans3 = strlen(C) - ans3;
    printf("%d", ans3);
    return 0;
}
