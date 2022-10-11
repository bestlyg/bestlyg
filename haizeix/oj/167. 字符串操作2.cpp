#include <iostream>
using namespace std;
int main(){
    string s1, s2;
    int p;
    cin >> s1 >> p >> s2;
    s2 = s1.substr(0, p - 1) + s2 + s1.substr(p - 1);
    cout << s1.size() << endl
         << s1.find('a') + 1 << endl
         << s2 << endl;
    return 0;
}
