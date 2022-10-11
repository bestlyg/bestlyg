#include <iostream>

using namespace std;

int main() {
    char str[15][3], tmp;
    int idx = 0, n = 0;
    while (~scanf("%c", &tmp)) {
        if (tmp == ' ') {
            str[n][idx] = '\0';
            idx = 0;
            if (n < 10) n++;
        } else {
            str[n][idx++] = tmp;
            if (tmp == '/' && n == 10) {
                idx = 0;
                n++;
            }
        }
        // cout << "tmp = [" << tmp << "], n = " << n << ", idx = " << idx <<
        // endl;
    }
    // for (int i = 0; i < n + 1; i++) {
    //     cout << i + 1 << ". [" << str[i] << "]" << endl;
    // }
    int sum = 0;
    for (int i = 0; i < 10; i++) {
        char ch1 = str[i][0];
        char ch2 = str[i][1];
        if (ch1 == '/') {
            sum += 10;
            char next = str[i + 1][0];
            if (next == '/') {
                sum += 10;
                next = str[i + 2][0];
                sum += next == '/' ? 10 : next - '0';
            } else {
                char next2 = str[i + 1][1];
                sum += next2 == '/' ? 10 : next + next2 - 2 * '0';
            }
        } else if (ch2 == '/') {
            sum += 10;
            char next = str[i + 1][0];
            sum += next == '/' ? 10 : next - '0';
        } else {
            sum += ch1 + ch2 - '0' * 2;
        }
        // cout << "===========" << endl
        //      << i + 1 << ". [" << str[i] << "]" << endl;
        // cout << sum << endl;
    }
    cout << sum << endl;
    return 0;
}
