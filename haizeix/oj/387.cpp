#include <algorithm>
#include <iostream>

using namespace std;

struct data {
    int idx, num;
};

bool comp(const data &a, const data &b) { return a.num < b.num; }

int main() {
    int m, n, midxarr[100005], narr[100005], sum = 0;
    data marr[100005];
    scanf("%d %d", &m, &n);
    for (int i = 0; i < m; i++) {
        cin >> marr[i].num;
        marr[i].idx = i + 1;
    }
    for (int i = 0; i < n; i++) {
        cin >> narr[i];
    }
    sort(marr, marr + m, comp);
    for (int i = 0; i < n; i++) {
        int num = narr[i], l = 0, r = m, f = 0;
        while (l < r) {
            int mid = (l + r) >> 1;
            if (marr[mid].num >= num)
                r = mid;
            else
                l = mid + 1;
        }
        if (l == m)
            printf("0\n");
        else
            printf("%d\n", marr[l].idx);
    }
    return 0;
}
