#include <iostream>

using namespace std;

int main() {
    string str;
    int s;
    cin >> str >> s;
    // cout << "input str = [" << str << "]" << endl
    //      << "remov num = [" << s << "]" << endl;
    for (int i = 0; i < s; i++) {
        int repidx = str.size() - 1;
        for (int idx = 0; idx < str.size() - 1; idx++) {
            if (str[idx] > str[idx + 1]) {
                repidx = idx;
                break;
            }
        }
        str.replace(repidx, 1, "");
    }
    // cout << "end str = [" << str << "]" << endl;
    for (int i = 0, init = 1; i < str.size(); i++) {
        if (init) {
            if (str[i] == '0')
                continue;
            else
                init = 0;
        }
        cout << str[i];
    }
    return 0;
}
