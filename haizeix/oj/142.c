#include <stdio.h>
#include <math.h>
#include <stdlib.h>

int isPalindrome(int num){
    int nums[5];
    // snprintf(str, 5, "%d", num);
    // printf("%s", str);
    int i = 4;
    while (num){
        nums[i--] = num % 10;
        num /= 10;
    }
    for(int i = 0; i < 2 ; i++){
        if(nums[i] != nums[5-1-i])return 0;
    }
    return 1;
}
int isPrime(int num){
    for(int i = 2; i <= num / 2; i++){
        if(num % i == 0)return 0;
    }
    return 1;
}
int main(){
    int a,b,fp=1;
    scanf("%d %d" , &a, &b);
    while(a <= b){
        // printf("%d : palindrome=%d , prime=%d\n", a, isPalindrome(a), isPrime(b));
        if(isPalindrome(a) && isPrime(a)){
            if(fp)fp=0;
            else printf(" ");
            printf("%d",a);
        }
        a++;
    }
    return 0;
}
