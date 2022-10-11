#include <algorithm>
#include <iostream>
#include <queue>
#include <stack>
#include <string>
#include <vector>

using namespace std;

struct person {
    int time, country;
};
int main() {
    int n, countries[100005] = {0}, cnt = 0, time, pn, country;
    scanf("%d", &n);
    queue<person> q;
    for (int i = 0; i < n; i++) {
        scanf("%d%d", &time, &pn);
        while (q.size() > 0 && time - q.front().time >= 86400) {
            person p = q.front();
            q.pop();
            if (--countries[p.country] == 0) cnt--;
        }
        for (int i = 0; i < pn; i++) {
            scanf("%d", &country);
            q.push((person){time, country});
            if (++countries[country] == 1) cnt++;
        }
        printf("%d\n", cnt);
    }
    return 0;
}
