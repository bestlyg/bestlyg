#include <algorithm>
#include <iostream>
#include <stack>
#include <string>
#include <vector>

using namespace std;

struct node {
    int v;
    double c;
};

int main() {
    int n, v, c;
    char op;
    cin >> v >> c >> n;
    stack<node> s;
    s.push((node){v, v * c / 100.0});
    for (int i = 0; i < n; i++) {
        node top = s.top();
        // printf("top node : v = %d, c = %d, v_all = %d, c_all = %lf\n", top.v,
        //        top.c, top.v_all, top.c_all);
        cin >> op;
        if (op == 'P') {
            cin >> v >> c;
            s.push((node){s.top().v + v, s.top().c + v * c / 100.0});
        } else if (s.size() > 1) {
            s.pop();
        }
        printf("%d %.5lf\n", s.top().v, s.top().c / s.top().v * 100);
    }
    return 0;
}
