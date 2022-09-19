#include <algorithm>
#include <cmath>
#include <iostream>

using namespace std;
int main() {
    int r, nums1[10], nums2[10], n = 8, sum1 = 0, sum2 = 0, end = 0;
    scanf("%d", &r);
    for (int i = 0; i < 10; i++) {
        int min1 = 1000, min2 = 1000;
        for (int i = 0; i < n; i++) {
            scanf("%d", &nums1[i]);
            if (i == 0 && nums1[i] == -1) {
                end = 1;
                break;
            }
            min1 = min(min1, nums1[i]);
        }
        if (end) break;
        for (int i = 0; i < n; i++) {
            scanf("%d", &nums2[i]);
            min2 = min(min2, nums2[i]);
        }
        /*
        cout << "=========" << endl << "nums1:" << endl;
        for (int i = 0; i < n; i++) cout << nums1[i] << ' ';
        cout << endl;
        cout << "nums2:" << endl;
        for (int i = 0; i < n; i++) cout << nums2[i] << ' ';
        cout << endl;
        cout << "min1 = " << min1 << ", min2 = " << min2 << endl;
        */
        if (min1 == min2) {
            printf("0:0\n");
            continue;
        }
        int cnt = 0;
        if (min1 > min2) {
            for (int i = 0; i < n; i++) {
                if (nums2[i] < min1 && nums2[i] <= r) cnt++;
            }
            printf("0:%d\n", cnt);
            sum2 += cnt;
        } else {
            for (int i = 0; i < n; i++) {
                if (nums1[i] < min2 && nums1[i] <= r) cnt++;
            }
            printf("%d:0\n", cnt);
            sum1 += cnt;
        }
    }
    printf("%d:%d\n", sum1, sum2);
    return 0;
}
