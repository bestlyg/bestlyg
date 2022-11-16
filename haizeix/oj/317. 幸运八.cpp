#include <iostream>
#include <set>

using namespace std;

typedef long long ll;

ll ans = 0, n;

ll quick_mul(ll a, ll b, ll mod) {
    ll ans = 0, temp = a;
    while (b) {
        if (b & 1) ans = (ans + temp) % mod;
        temp = (temp + temp) % mod;
        b >>= 1;
    }
    return ans;
}

ll quick_pow(ll a, ll b, ll mod) {
    ll ans = 1, temp = a;
    while (b) {
        if (b & 1) ans = quick_mul(ans, temp, mod) % mod;
        temp = quick_mul(temp, temp, mod) % mod;
        b >>= 1;
    }
    return ans;
}

ll gcd(ll a, ll b) {
    if (b == 0) return a;
    return gcd(b, a % b);
}

ll phi(ll n) {
    ll i = 2, x = n;
    while (i * i <= n) {
        if (x % i == 0) n -= n / i;
        while (x % i == 0) x /= i;
        i += 1;
    }
    if (x != 1) n -= n / x;
    return n;
}

set<ll> getSet(ll num) {
    set<ll> s;
    ll i = 1;
    for (; i * i <= num; i++) {
        if (num % i == 0) {
            s.insert(i);
            s.insert(num / i);
        }
    }
    return s;
}

int main() {
    cin >> n;
    n *= 9;
    n /= gcd(n, 8);
    if (gcd(10, n) != 1) ans = 0;
    else {
        ll maxv = phi(n);
        for (auto num : getSet(maxv)) {
            if (quick_pow(10, num, n) == 1) {
                ans = num;
                break;
            }
        }
    }
    cout << ans << endl;
    return 0;
}

/**
 * num % n == 0
 * num = (10^x - 1) / 9 * 8 即全8
 * 8 * (10^x - 1) / 9 - k * n == 0
 * 8 * (10^x - 1) - 9 * k * n == 0
 * (10^x - 1) - 9 * k * n / 8 == 0
 * 要使得 左式 == 0，k * n 一定为8的倍数
 * 9n' = 9 * n / gcd(n , 8)
 * 10^x - 1 == 0 (mod 9n')
 * 10^x == 1 (mod 9n')
 * x == phi(9n') 且 10 和9n'互质， 否则无解
 */
