#include <iostream>
using namespace std;
int main(){
    string s;
    getline(cin, s);
    int ans[4] = {0};
    for (auto &c : s) {
        int num;
        if (c >= 'a' && c <= 'z' || c >= 'A' && c <= 'Z') num = 0;
        else if (c >= '0' && c <= '9') num = 1;
        else if (c == ' ') num = 2;
        else num = 3;
        ans[num]++;
    }
    cout << ans[0] << ' '
         << ans[1] << ' '
         << ans[2] << ' '
         << ans[3] << endl;
    return 0;
}
