#include <stdio.h>

int main(){
    int n ;
    scanf("%d",&n);
    double ans = 14;
    if(n>3) {
      ans += (n-3) * 2.3;
      printf("%.1lf",ans);
	}else {
      printf("%.0lf",ans);
	}
    return 0;
}
