#include <iostream>
using namespace std;

string getNext(string str) {
    string next = "";
    for (int i = 0; i < str.size(); i++) {
        int cnt = 1;
        char c = str[i];
        while (i + 1 < str.size() && str[i + 1] == c) cnt++, i++;
        next += to_string(cnt) + c;
    }
    return next;
}
int main() {
    string str = "1";
    int n;
    cin >> n;
    while (--n) str = getNext(str);
    cout << str << endl;
    return 0;
}
