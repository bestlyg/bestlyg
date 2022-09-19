#include <iostream>
using namespace std;
int main(){
    string str;
    cin >> str;
    int cnt = 0;
    for (auto &c : str) if (c == 'A') cnt++;
    cout << cnt << endl;
    return 0;
}
