#include <iostream>
#include <cstdio>
#include <vector>
#include <functional>
#include <queue>
#include <algorithm>

using namespace std;

struct Cow { int idx, nmin, nmax; };
struct Item { int idx, nmax; };

int main() {
    int c;
    cin >> c;
    vector<Cow> list(c);
    for (int i = 0; i < c; i++) {
        list[i].idx = i;
        scanf("%d %d", &list[i].nmin, &list[i].nmax);
    }
    sort(list.begin(), list.end(), [&](Cow a, Cow b){
        return a.nmin != b.nmin ? a.nmin < b.nmin : a.idx < b.idx;
    }) ;
    // for (auto &c : list) cout << c.idx << ", " << c.nmin << ", " << c.nmax << endl;
    // cout << "====" << endl;
    int max_item = 0;
    vector<int> ans(c);

    auto all_cmp = [&](const Item a, const Item b){ return a.nmax > b.nmax; };
    priority_queue<Item, vector<Item>, decltype(all_cmp)> all_q(all_cmp);
    auto idle_cmp = [&](const Item a, const Item b){ return a.idx > b.idx; };
    priority_queue<Item, vector<Item>, decltype(idle_cmp)> idle_q(idle_cmp);
    for (int i = 0; i < c; i++) {
        while (all_q.size() && all_q.top().nmax < list[i].nmin) {
            idle_q.push(all_q.top());
            all_q.pop();
        }
        if (idle_q.size()) {
            Item item = idle_q.top();
            idle_q.pop();
            ans[list[i].idx] = item.idx;
            item.nmax = list[i].nmax;
            all_q.push(move(item));
        } else {
            Item item = { ++max_item, list[i].nmax };
            ans[list[i].idx] = item.idx;
            all_q.push(move(item));
        }
    }
    printf("%d\n", max_item);
    for (auto &o : ans) printf("%d\n", o);
    return 0;
}

