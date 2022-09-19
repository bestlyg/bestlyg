#include <algorithm>
#include <iostream>
#include <stack>
#include <string>
#include <vector>

using namespace std;

int main() {
    string str;
    cin >> str;
    stack<char> s;
    for (auto it = str.begin(); it < str.end(); it++) {
        char ch = *it;
        if (ch == '[' || ch == '(' || ch == '{') {
            s.push(ch);
        } else if (ch == ']' || ch == ')' || ch == '}') {
            if (s.size() == 0 || ch == ']' && s.top() != '[' ||
                ch == ')' && s.top() != '(' || ch == '}' && s.top() != '{') {
                cout << "NO" << endl;
                return 0;
            }
            s.pop();
        }
    }
    if (s.empty())
        cout << "YES" << endl;
    else
        cout << "NO" << endl;
    return 0;
}
