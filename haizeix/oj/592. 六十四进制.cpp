#include <iostream>
#include <string>
#include <vector>
using namespace std;
const int MOD = 1e9 + 7;
// vector<char> getBitList(){
//     int n = 0;
//     vector<char> list(64);
//     for (int i = '0'; i <= '9'; i++) list[n++] = i;
//     for (int i = 'A'; i <= 'Z'; i++) list[n++] = i;
//     for (int i = 'a'; i <= 'z'; i++) list[n++] = i;
//     list[n++] = '-';
//     list[n++] = '_';
//     return list;
// }
int toNum(char c){
    return c >= '0' && c <= '9' ? c - '0' : 
           c >= 'A' && c <= 'Z' ? c - 'A' + 10 : 
           c >= 'a' && c <= 'z' ? c - 'a' + 36 : 
           c == '-' ? 62 : 63;
}
int getCnt(int num) {
    int ans = 0;
    for (int i = 0; i < 64; i++) {
        for (int j = 0; j < 64; j++) {
            if ((i & j) == num) ans++;
        }
    }
    return ans;
}
int main(){
    // vector<char> list = getBitList();
    string s;
    cin >> s;
    long long ans = 1;
    for (auto &c : s) ans = (ans * getCnt(toNum(c))) % MOD;
    cout << ans << endl;
    return 0;
}
