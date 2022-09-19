#include <algorithm>
#include <iostream>

using namespace std;

struct user {
    int idx;
    string cnt;
};
bool comp(const user &a, const user &b) {
    return a.cnt.size() != b.cnt.size() ? a.cnt.size() > b.cnt.size()
                                        : a.cnt > b.cnt;
}
int main() {
    user u[105];
    int n;
    cin >> n;
    for (int i = 0; i < n; i++) {
        u[i].idx = i + 1;
        cin >> u[i].cnt;
    }
    sort(u, u + n, comp);
    cout << u[0].idx << endl << u[0].cnt << endl;
    return 0;
}
