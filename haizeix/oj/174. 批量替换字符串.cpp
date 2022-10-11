#include <iostream>
using namespace std;
int main(){
    string s;
    getline(cin, s);
    string ans = "";
    for (auto &c : s) {
        if (c == '\n') break;
        else if (c == ' ') ans += "%20";
        else ans += c;
    }
    cout << ans << endl;
    return 0;
}
