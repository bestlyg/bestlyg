#include <iostream>
#include <string>
using namespace std;
char to62(int num) {
    return num < 10 ? num + '0'
         : num < 36 ? num + 'A' - 10
         : num + 'a' - 36;
}
int to10(char c) {
    return c >= '0' && c <= '9' ? c - '0'
         : c >= 'A' && c <= 'Z' ? c - 'A' + 10
         : c - 'a' + 36;
}
int main(){
    int radix1, radix2;
    string s1, s2 = "0";
    cin >> radix1 >> radix2 >> s1;
    cout << radix1 << ' ' << s1 << endl;
    char ans[1005] = {0};
    int i = 0, n = s1.size();
    for (int i_s1 = 0; i_s1 < n; i++) {
        int k = 0;
        // 短除法
        for (int j = i_s1; j < n; j++) {
            k = k * radix1 + to10(s1[j]);
            s1[j] = to62(k / radix2);
            k %= radix2;
        }
        ans[i] = to62(k);
        while (i_s1 < n && s1[i_s1] == '0') i_s1++;
    }
    cout << radix2 << ' ';
    for (int j = i - 1; j >= 0; j--) cout << ans[j];
    cout << endl;
    return 0;
}
