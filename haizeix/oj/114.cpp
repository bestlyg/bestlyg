#include <iostream>

using namespace std;
int main(){
    char c;
    cin >> c;
    string ans;
    switch (c) {
        case 'h': ans = "He"; break;
        case 'l': ans = "Li"; break;
        case 'c': ans = "Cao"; break;
        case 'd': ans = "Duan"; break;
        case 'w': ans = "Wang"; break;
        default : ans = "Not Here"; break;
    }
    cout << ans << endl;
    return 0;
}
