#include <algorithm>
#include <iostream>

using namespace std;

struct person {
    int idx, time;
};
bool comp(const person &a, const person &b) { return a.time < b.time; }
int main() {
    int n;
    cin >> n;
    person p[n];
    for (int i = 0; i < n; i++) {
        p[i].idx = i + 1;
        cin >> p[i].time;
    }
    sort(p, p + n, comp);
    int sum = 0, sums[n];
    for (int i = 0; i < n; i++) {
        if (i != 0) cout << ' ';
        cout << p[i].idx;
        sums[i] = sum;
        sum += p[i].time;
    }
    double ans = 0;
    for (int i = 0; i < n; i++) {
        ans += sums[i];
    }
    printf("\n%.2lf\n", ans / n);
    return 0;
}
