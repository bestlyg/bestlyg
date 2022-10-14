#include <iostream>
#include <typeinfo>
#include <string>

using namespace std;

template<typename T, typename... ARGS>
class N_ARG {
public:
    typedef T type;
    typedef N_ARG<ARGS...> next;
};
template<typename T>
class N_ARG<T> {
public:
    typedef T type;
    typedef T last;
};

template<int CNT, typename T, typename... ARGS>
class C_ARG {
public:
    typedef typename C_ARG<CNT - 1, ARGS...>::type type;
};
template<typename T>
class C_ARG<1, T> {
public:
    typedef T type;
};
template<typename T, typename... ARGS>
class C_ARG<1, T, ARGS...> {
public:
    typedef T type;
};

template<typename T, typename... ARGS>
class CNT_ARG {
public:
    static constexpr int cnt = CNT_ARG<ARGS...>::cnt + 1;
};
template<typename T>
class CNT_ARG<T> {
public:
    static constexpr int cnt = 1;
};

template<int V>
class Zero {
public:
    typedef int no;
};
template<>
class Zero<0> {
public:
    typedef int yes;
};

template<typename T, typename... ARGS>
class FnClass {};
template<typename T, typename... ARGS>
class FnClass<T(ARGS...)> {
public:
    typedef typename Zero<CNT_ARG<ARGS...>::cnt - 2>::yes yes;
    T operator()(
        typename C_ARG<1, ARGS...>::type v1,
        typename C_ARG<2, ARGS...>::type v2
    ) {
        return v1 + v2;
    }
};

template<int V>
struct sum {
    static constexpr int r = sum<V - 1>::r + V;
};
template<>
struct sum<1> {
    static constexpr int r = 1;
};

template<int V>
struct is_even {
    constexpr static const char* r = is_even<V & 1>::r;
};
template<>
struct is_even<1> {
    constexpr static const char* r = "no";
};
template<>
struct is_even<0> {
    constexpr static const char* r = "yes";
};

template<int V>
struct score_judge {
    constexpr static const char* r = score_judge<V >= 60 && V <= 100>::r;
};
template<>
struct score_judge<true> {
    constexpr static const char* r = "good";
};
template<>
struct score_judge<false> {
    constexpr static const char* r = "bad";
};

template<int V, int I>
struct dfs {
    static constexpr bool r = (V % I != 0) && dfs<V, I + 1>::r;
};
template<int V>
struct dfs<V, V> {
    static constexpr bool r = true;
};

template<bool T>
struct PrimeCheck {}; 
template<>
struct PrimeCheck<true> {
    constexpr static const char* r = "yes";
};
template<>
struct PrimeCheck<false> {
    constexpr static const char* r = "no";
};
template<int V>
struct is_prime {
    constexpr static const char* r = PrimeCheck<dfs<V, 2>::r>::r;
};

int main() {
    N_ARG<int, double>::next::type n1;
    cout << typeid(n1).name() << endl;
    N_ARG<int, double, long long, long double>::next::next::next::last n2;
    cout << typeid(n2).name() << endl;

    C_ARG<1, int, double>::type c1;
    cout << typeid(c1).name() << endl;
    C_ARG<2, int, double>::type c2;
    cout << typeid(c2).name() << endl;
    
    cout << CNT_ARG<int, double, long long, C_ARG<1, int>>::cnt << endl;

    FnClass<double(int, int)> f;
    cout << f(24, 2) << endl;

    // 累加
    cout << sum<10>::r << endl; // 10
    // // 奇偶
    cout << is_even<5>::r << endl; // no
    cout << is_even<6>::r << endl; // yes
    cout << is_even<99>::r << endl; // no
    // // 合格
    cout << score_judge<60>::r << endl; // good
    cout << score_judge<45>::r << endl; // bad
    // 素数
    cout << is_prime<2>::r << endl; // yes
    cout << is_prime<3>::r << endl; // yes
    cout << is_prime<5>::r << endl; // yes
    cout << is_prime<10>::r << endl; // no
    cout << is_prime<1021>::r << endl; // yes
    return 0;
}