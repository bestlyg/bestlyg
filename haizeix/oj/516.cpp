#include <cstdio>
long long n,i=0,r=0,c=0,o=0;char s[100005];
int main(){scanf("%d%s",&n,s);for(;i<n;i++)if(s[i]=='C')++c;else if(s[i]=='O')o+=c;else r+=o;printf("%lld",r);return 0;}
