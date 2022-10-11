#include <iostream>

using namespace std;

void check(char *str, int n, int score) {
    int w = 0, l = 0, idx = 0;
    for (int i = 0; i < n; i++) {
        char ch = str[i];
        if (ch == 'W')
            w++;
        else
            l++;
        if ((w >= score || l >= score) && abs(w - l) >= 2) {
            cout << w << ':' << l << endl;
            idx++;
            w = 0;
            l = 0;
        }
    }
    cout << w << ':' << l << endl;
}

int main() {
    int len = 0;
    char str[25 * 2505];
    do {
        cin >> str[len++];
    } while (str[len - 1] != 'E');
    len--;
    check(str, len, 11);
    cout << endl;
    check(str, len, 21);
    return 0;
}
