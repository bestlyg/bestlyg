#include <algorithm>
#include <iostream>

using namespace std;

int main() {
    long long m, n, marr[100005], narr[100005], sum = 0;
    cin >> m >> n;
    for (int i = 0; i < m; i++) {
        cin >> marr[i];
    }
    for (int i = 0; i < n; i++) {
        cin >> narr[i];
    }
    sort(narr, narr + n);
    // for (int i = 0; i < n; i++) {
    //     cout << narr[i] << ",";
    // }
    // cout << endl;
    int init = 1;
    for (int i = 0; i < m; i++) {
        int num = marr[i], l = 0, r = n - 1;
        while (l <= r) {
            int mid = (l + r) >> 1;
            // cout << "mid = " << mid << ", l = " << l << ", r = " << r
            //      << ", num = " << num << endl;
            if (narr[mid] == num) {
                if (!init) cout << ' ';
                init = 0;
                cout << num;
                sum += num;
                break;
            }
            if (narr[mid] > num)
                r = mid - 1;
            else
                l = mid + 1;
        }
    }
    cout << endl << sum << endl;
    return 0;
}
