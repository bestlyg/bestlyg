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

int n, nlist[25];

bool check() {
    stack<int> s;
    for (int i = 0, cur = 1; i < n; i++) {
        if (s.size() && s.top() == nlist[i]) { s.pop(); continue; }
        while (cur <= n && nlist[i] != cur) s.push(cur), cur++;
        if (nlist[i] != cur) return false;
        cur++;
    }
    return s.empty();
}

int main() {
    cin >> n;
    for (int i = 0; i < n; i++) nlist[i] = i + 1;
    int cnt = 20;
    do {
		if (!check()) continue;
        for (int i = 0; i < n; i++) cout << nlist[i];
        cout << endl;
        cnt--;
	} while (cnt && next_permutation(nlist, nlist + n));
    return 0;
}

