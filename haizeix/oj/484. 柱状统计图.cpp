#include <iostream>
#include <algorithm>

using namespace std;

int main() {
    char c;
    int list[26] = {0}, nmax = 0;
    while (cin >> c) {
        if (c < 'A' || c > 'Z') continue;
        nmax = max(nmax, ++list[c - 'A']);
    }
    for (int i = nmax; i >= 0; i--) {
        int last = 26;
        while (list[last - 1] < i) last--;
        for (int j = 0; j < last; j++) {
            if (j) cout << ' ';
            if (i == 0) {
                cout << static_cast<char>(j + 'A');
            } else {
                if (list[j] >= i) cout << '*';
                else cout << ' ';
            }
        }
        cout << endl;
    }
    return 0;
}
