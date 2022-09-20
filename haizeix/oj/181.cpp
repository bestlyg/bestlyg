#include <iostream>
using namespace std;
int main(){
    string s;
    cin >> s;
    for (auto &c : s) c ^= 0b0100000;
    cout << s << endl;
    return 0;
}
