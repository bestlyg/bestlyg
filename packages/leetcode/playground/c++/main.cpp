#include <cstdio>
#include <cstring>

#ifdef DEBUG
#define log(frm, args...) \
    { printf(frm, ##args); }
#else
#define log(frm, args...)
#endif

int main() {
    int n, k;
    scanf("%d %d", &n, &k);
    log("%d %d\n", n, k);
    int arr[n];
    for (int i = 0; i < n; i++) {
        scanf("%d", &arr[i]);
        log("%d ", arr[i]);
    }
    log("\n");
    k--;
    while (k >= 0 && arr[k] <= 0) k--;
    if (k == -1) {
        printf("0\n");
    } else {
        while (k < n && arr[k] == arr[k + 1]) k++;
        k++;
        printf("%d\n", k);
    }
    return 0;
}