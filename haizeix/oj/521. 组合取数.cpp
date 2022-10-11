#include <algorithm>
#include <iostream>
#include <vector>
#include <unordered_set>

using namespace std;

#define MAX 3000000

int prime_list[MAX] = {0};
class Prime {
public:
    vector<int> list;
    Prime(int n): list(vector<int>(n + 1, 1)) {
        list[0] = 0;
        for (int i = 2; i <= n; i++) {
            if (list[i]) list[++list[0]] = i, prime_list[i] = 1;
            for (int j = 1; j <= list[0] && list[j] * i <= n; j++) {
                list[list[j] * i] = 0;
                if (i % list[j] == 0) break;
            }
        }
    }
    void print() {
        cout << list[0] << " primes : " << endl;
        for (int i = 1; i <= list[0]; i++) {
            if (i % 20 == 0) cout << endl;
            cout << list[i] << ", ";
        }
        cout << "none" << endl;
    }
    vector<int> get_primes() {
        vector<int> res;
        for (int i = 1; i <= list[0]; i++) res.push_back(list[i]);
        return res;
    }
    int &operator[](const int idx) {
        return list[idx];
    }
};

void dfs(vector<int> &data, int &ans, int &r, int start = 0, int current = 0, int used = 0, int level = 0) {
    if (level == r) {
        if (prime_list[current]) ans++;
        return;
    }
    if (r - level > data.size() - start) return;
    for (int i = start; i < data.size(); i++) {
        if (used & (1 << i)) continue;
        dfs(data, ans, r, i + 1, current + data[i], used | (1 << i), level + 1);
    }
}


int main() {
    Prime list(MAX);
    int n, r, ans = 0;
    cin >> n >> r;
    vector<int> data(n);
    for (int i = 0; i < n; i++) cin >> data[i];
    dfs(data, ans, r);
    cout << ans << endl;
    return 0;
}

