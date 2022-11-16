#include <cctype>
#include <cerrno>
#include <cfloat>
#include <ciso646>
#include <climits>
#include <clocale>
#include <cmath>
#include <csetjmp>
#include <csignal>
#include <cstdarg>
#include <cstddef>
#include <cstdio>
#include <cstdlib>
#include <cstring>
#include <ctime>
#include <cwchar>
#include <cwctype>
#include <algorithm>
#include <bitset>
#include <complex>
#include <deque>
#include <exception>
#include <fstream>
#include <functional>
#include <iomanip>
#include <ios>
#include <iosfwd>
#include <iostream>
#include <istream>
#include <iterator>
#include <limits>
#include <list>
#include <locale>
#include <map>
#include <memory>
#include <new>
#include <numeric>
#include <ostream>
#include <queue>
#include <set>
#include <sstream>
#include <stack>
#include <stdexcept>
#include <streambuf>
#include <string>
#include <typeinfo>
#include <utility>
#include <valarray>
#include <vector>


// bestlyg
# define X first
# define Y second
# define lb(x) ((x) & (-x))
# define mem(a,b) memset(a,b,sizeof(a))
# define debug freopen("r.txt","r",stdin)
# define pi pair<int,int>

#ifdef DEBUG
#define log(frm, args...) {\
    printf(frm, ##args);\
}
#else
#define log(frm, args...)
#endif

typedef long long ll;

using namespace std;

int main() {
    int cnt;
    cin >> cnt;
    stack<ll> sl, sr;
    vector<ll> sums(1005, 0), ans(1005, 0);
    ll idx = 1;
    string op;
    ll num;
    ans[0] = LLONG_MIN;
    for (int i = 0; i < cnt; i++) {
        cin >> op;
        switch(op[0]) {
            case 'I':
                cin >> num;
                sl.push(num);
                log("push %lld\n", num)
                sums[idx] = sums[idx - 1] + num;
                ans[idx] = max(ans[idx - 1], sums[idx]);
                idx++;
                break;
            case 'D':
                log("del %lld\n", (sl.size() ? sl.top() : -999));
                if (sl.size()) sl.pop(), idx--;
                break;
            case 'L':
                log("l move\n");
                if (sl.size()) sr.push(sl.top()), sl.pop(), idx--;
                break;
            case 'R':
                log("r move\n");
                if (!sr.size()) break;
                sl.push(sr.top()), sr.pop();
                sums[idx] = sums[idx - 1] + sl.top();
                ans[idx] = max(ans[idx - 1], sums[idx]);
                idx++;
                break;
            case 'Q':
                cin >> num;
                log("q %lld\n", num);
                printf("%lld\n", ans[num]);
                break;
        }
    }
    return 0;
}
