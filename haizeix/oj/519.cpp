#include <iostream>
using namespace std;

int main() {
    long long l, r, ans = 0;
    cin >> l >> r;
    for (int bnum = 0; bnum <= 9; bnum++) {
        for (int snum = 0; snum <= 9; snum++) {
            if (snum == bnum) continue;
            for (int bit = 2; bit <= 17; bit++) {
                for (int sidx = 0; sidx <= bit; sidx++) {
                    if (sidx == bit && snum == 0 || bnum == 0 && sidx != bit)
                        continue;
                    // printf("bnum = %d, snum = %d, bit = %d, sidx = %d\n",
                    // bnum,
                    //        snum, bit, sidx);
                    long long num = 0;
                    int cnt = bit - sidx;
                    while (cnt--) num = num * 10 + bnum;
                    num = num * 10 + snum;
                    cnt = sidx;
                    while (cnt--) num = num * 10 + bnum;
                    // cout << "create num = " << num << endl;
                    if (num >= l && num <= r) ans++;
                }
            }
        }
    }
    cout << ans << endl;
    return 0;
}
