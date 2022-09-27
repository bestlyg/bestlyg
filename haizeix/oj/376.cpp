#include <iostream>
#include <unordered_set>
#include <queue>
using namespace std;
int main(){
    int size, m, v, cnt = 0;
    cin >> size >> m;
    unordered_set<int> cache;
    queue<int> q;
    for (int i = 0; i < m; i++) {
        cin >> v;
        if (cache.count(v)) continue;
        cnt++;
        if (q.size() == size) {
            cache.erase(q.front());
            q.pop();
        }
        q.push(v);
        cache.insert(v);
    }
    cout << cnt << endl;
    return 0;
}
