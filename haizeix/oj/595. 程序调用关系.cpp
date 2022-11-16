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
    int n;
    cin >> n;
    vector<string> list(n);
    for (int i = 0; i < n; i++) cin >> list[i];
    string find;
    cin >> find;
    vector<string> s;
    for (int i = 0; i < n; i++) {
        if (list[i] == "return") s.pop_back();
        else s.push_back(list[i]);
        if (list[i] == find) break;
    }
    log("%s\n", s.back().c_str());
    if (s.back() != find) {
        cout << "NOT REFERENCED" << endl;
        return 0;
    }
    for (int i = 0; i < s.size(); i++) {
        if (i != 0) cout << "->";
        cout << s[i];
    }
    cout << endl;
    return 0;
}

