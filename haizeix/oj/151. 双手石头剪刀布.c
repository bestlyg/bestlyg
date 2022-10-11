#include <stdio.h>
#include <math.h>
#include <stdlib.h>
#include <string.h>

int check(char a, char b){
    if(a == b)return 0;
    if(a == 'O' && b == 'Y' ||
       a == 'H' && b == 'O' ||
       a == 'Y' && b == 'H'){
        return 1;
    }else{
        return -1;
    }
}
int main(){
    char ml, mr, ll, lr;
    scanf("%c %c\n", &ml, &mr);
    scanf("%c %c", &ll, &lr);
    int check_ll = check(ml, ll);
    int check_lr = check(ml, lr);
    int check_rr = check(mr, lr);
    int check_rl = check(mr, ll);
   // printf("ml=%c,mr=%c,ll=%c,lr=%c\n",ml,mr,ll,lr);
   // printf("ll=%d,lr=%d,rr=%d,rl=%d\n",check_ll,check_lr,check_rr,check_rl);
    char *ans;
    if(check_ll == 1){
        // printf("in 1");
        if(check_lr >= 0 || check_rr > 0){
        //    printf("in 11");
            ans = "MING";
        }else{
            ans = "LIHUA";
        }
    }else if(check_ll == 0){
        if(check_rr == 1) ans = "MING";
        else if(check_rr == -1) ans = "LIHUA";
        else ans = "TIE";
    }else {
        if(check_rl <= 0 || check_rr < 0) ans = "LIHUA";
        else ans = "MING";
    }
    printf("%s\n", ans);
    return 0;
}
