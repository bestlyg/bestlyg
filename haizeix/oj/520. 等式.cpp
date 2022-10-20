#include <iostream>
using namespace std;

const int MAX = 15000000;
const int MAX_K = 1940500;
long long list[MAX] = {0};

int main() {
    for (int i = 1; i < MAX; i++) list[i] = list[i - 1] + i;
    int a;
    cin >> a;
    for (int k = a; ; k++) {
        // cout << "====" << endl << "k = " << k << endl;
        int l = k + 1, r = MAX;
        while (l < r) {
            int n = (l + r) / 2;
            if (list[n] - list[k] == list[k - 1]) {
                cout << k << ' ' << n << endl;
                return 0;
            }
            if (list[n] - list[k] > list[k - 1]) r = n - 1;
            else l = n + 1;
            // cout << "l = " << l << ", r = " << r << endl;
        }
        if (list[l] - list[k] == list[k - 1]) {
            cout << k << ' ' << l << endl;
            return 0;
        }
    }
    return 0;
}
