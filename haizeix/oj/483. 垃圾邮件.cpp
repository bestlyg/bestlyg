#include <iostream>
#include <algorithm>
#include <vector>
#include <set>

using namespace std;

bool checkAt(string &s, int start) {
    if (start + 1 >= s.size()) return false;
    return s[start] == 'a' && s[start + 1] == 't';
}

bool checkNospam(string &s, int start) {
    if (start + 5 >= s.size()) return false;
    return s[start] == 'n' && 
           s[start + 1] == 'o' &&
           s[start + 2] == 's' &&
           s[start + 3] == 'p' &&
           s[start + 4] == 'a' &&
           s[start + 5] == 'm';
}

bool isLegal(string &s) {
    if (s.front() == '.' || s.back() == '.') return false;
    for (int i = 0; i < s.size(); i++) {
        if (s[i] == '@') {
            if (i == 0 || i == s.size() - 1) return false;
            if (s[i - 1] < 'a' || s[i - 1] > 'z' || s[i + 1] < 'a' || s[i + 1] > 'z') return false;
        }
    }
    return true;
}

int main() {
    string s;
    cin >> s;
    set<string> sset;
    // cout << s.size() << endl;
    for (int i = 0; i < s.size(); i++) {
        // cout << "=== i = " << i << endl;
        if (checkAt(s, i)) {
            string next = s.substr(0, i) + "@" + s.substr(i + 2, s.size() - i - 2);
            // cout << "next = " << next << ", legal = " << isLegal(next) << endl;
            if (!isLegal(next)) continue;
            sset.insert(next);
            for (int j = 0; j < s.size(); j++) {
                if (checkNospam(next, j)) {
                    string nnext = next.substr(0, j) + next.substr(j + 6, s.size() - j - 6);
                    if (!isLegal(nnext)) continue;
                    sset.insert(nnext);
                }
            }
        }
        if (checkNospam(s, i)) {
            string next = s.substr(0, i) + s.substr(i + 6, s.size() - i - 6);
            // cout << "next = " << next << ", legal = " << isLegal(next) << endl;
            if (!isLegal(next)) continue;
            for (int j = 0; j < s.size(); j++) {
                if (checkAt(next, j)) {
                    string nnext = next.substr(0, j) + "@" + next.substr(j + 2, next.size() - j - 2);
                    // cout << "nnext = " << nnext << endl;
                    if (!isLegal(nnext)) continue;
                    sset.insert(nnext);
                }
            }
        }
    }
    for (auto &s : sset) cout << s << endl;
    return 0;
}
