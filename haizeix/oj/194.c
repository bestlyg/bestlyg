#include <stdio.h>

int main(){
    int n , a[100000],s;
    scanf("%d",&n);
    for(int i = 0; i < n ; i++){
        scanf("%d",&a[i]);
    }
    scanf("%d",&s);
    for(int i = 0; i < n ;i++){
        int l = i + 1 , r = n - 1 , need = s - a[i] ;
        int mid;
        while(l<=r){
            mid = (l+r)/2;
            int midNum = a[mid];
            if( midNum > need ){
                r = mid - 1;
            }else if(midNum < need){
                l = mid + 1;
            }else {
                printf("Yes");
                return 0;
            }
        }
    }
    printf("No");
    return 0;
}
