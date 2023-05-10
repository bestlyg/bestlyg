import { Markdown, Difficulty, Tag, Script } from '@/base';
import { backquote } from '@/utils';

const leetCodeMarkdown: Markdown = {
  exist: !true,
  name: '1015. 可被 K 整除的最小整数',
  url: 'https://leetcode.cn/problems/smallest-integer-divisible-by-k',
  difficulty: Difficulty.简单,
  tag: [],
  desc: `给定正整数 k ，你需要找出可以被 k 整除的、仅包含数字 1 的最 小 正整数 n 的长度。`,
  solutions: [
    //     {
    //       script: Script.TS,
    //       time: 184,
    //       memory: 48.3,
    //       desc: '遍历',
    //       code: `function isValid(s: string): boolean {
    //     while (s != "") {
    //         const n = s.replace("abc", "");
    //         if (n == s) return false;
    //         s = n;
    //     }
    //     return s == "";
    // };`,
    //     },
    {
      script: Script.CPP,
      time: 0,
      memory: 5.9,
      desc: '欧拉函数',
      code: `typedef long long ll;
ll gcd(ll a, ll b) {
    if (a < b) return gcd(b, a);
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
set<ll> get_factors(ll num) {
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
class Solution {
public:
    int smallestRepunitDivByK(int k) {
        if (gcd(10, 9 * k) != 1) return -1;
        k *= 9;
        ll n = phi(k);
        auto factors = get_factors(n);
        for (auto &num : factors) {
            if (quick_pow(10, num, k) == 1) return num;
        }
        return -1;
    }
};`,
    },
    // {
    //   script: Script.PY3,
    //   time: 2080,
    //   memory: 16.5,
    //   desc: '同上',
    //   code: ``,
    // },
    // {
    //   script: Script.RUST,
    //   time: 16,
    //   memory: 2.2,
    //   desc: '同上',
    //   code: ``,
    // },
  ],
};

export default leetCodeMarkdown;
