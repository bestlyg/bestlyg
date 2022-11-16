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

string str;
int nlist[100005], ans = 0, cur = 0;
stack<int> s;

int main() {
    cin >> str;
    for (int i = 0; i < str.size(); i++) nlist[i] = -1;
    for (int i = 0; i < str.size(); i++) {
        switch(str[i]) {
            case '(':
            case '[':
            case '{': s.push(i); break;
            case ')': 
                if (s.size() && str[s.top()] == '(') nlist[i] = s.top(), s.pop();
                else s.push(i);
                break;
            case ']': 
                if (s.size() && str[s.top()] == '[') nlist[i] = s.top(), s.pop();
                else s.push(i);
                break;
            case '}': 
                if (s.size() && str[s.top()] == '{') nlist[i] = s.top(), s.pop();
                else s.push(i);
                break;
        }
    }
    log("%s, %d\n", str.c_str(), (int)str.size());
    for (int i = 0; i < str.size(); i++) {log("i = %d, prev = %d, c = %c\n", i, nlist[i], str[i]);}
    for (int i = str.size() - 1; i >= 0; i--, cur = 0) {
        if (nlist[i] == -1) continue;
        log("===i=%d===\n", i);
        while (i >= 0 && nlist[i] != -1) {
            log("i = %d, cur = %d, add = %d, next = %d\n", i, cur, i - nlist[i] + 1, nlist[i] - 1);
            cur += i - nlist[i] + 1, i = nlist[i] - 1;
        }
        ans = max(ans, cur);
    }
    cout << ans << endl;
    return 0;
}

