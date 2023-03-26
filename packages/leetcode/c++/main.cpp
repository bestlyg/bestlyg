#include <vector>
#include <iostream>
#include <algorithm>
#include <numeric>
#include <cstdio>
#include <unordered_set>
#include <unordered_map>
#include <queue>

// bestlyg
# define X first
# define Y second
# define lb(x) ((x) & (-x))
# define mem(a,b) memset(a,b,sizeof(a))
# define debug freopen("input","r",stdin)
// # define pii pair<int,int>

#ifdef DEBUG
#define log(frm, args...) {\
    printf(frm, ##args);\
}
#else
#define log(frm, args...)
#endif

typedef long long ll;
using namespace std;

#ifdef LOCAL
struct ListNode {
    int val;
    ListNode *next;
    ListNode() : val(0), next(nullptr) {}
    ListNode(int x) : val(x), next(nullptr) {}
    ListNode(int x, ListNode *next) : val(x), next(next) {}
};
auto cmp = [&](node x, node y) -> bool { return x.second < y.second; };
priority_queue<node, vector<node>, decltype(cmp)> q(cmp);
void binary(unsigned n, int lastbit = 31) {
    unsigned i;
    for (i = 1 << lastbit; i > 0; i >>= 1)
        printf("%u", !!(n & i));
}
#endif

class UnionFind {
public:
    int n;
    vector<int> data, cnt;
    UnionFind(int n): n(n), data(vector<int>(n, 0)), cnt(vector<int>(n, 1)) {
        iota(data.begin(), data.end(), 0);
    } 
    int size(int v) { return cnt[find(v)]; }
    int find(int v) {
        if (data[v] == v) return v;
        return data[v] = find(data[v]);
    }
    void uni(int v1, int v2) {
        int p1 = find(v1), p2 = find(v2);
        if (p1 != p2) cnt[p1] += cnt[p2], data[p2] = p1;
    }
    bool same(int v1, int v2) { return find(v1) == find(v2); }
};
int pos2Idx(int x, int y, int size) { 
    return x * size + y; 
}
void idx2Pos(int idx, int size, int &x, int &y) {
    x = idx / size;
    y = idx % size;
}
vector<vector<int>> dirs = { {0, 1}, {0, -1}, {1, 0}, {-1, 0} };
// START

struct TrieNode {
    char val;
    bool end;
    TrieNode *fail, *children[26];
    TrieNode(char val, bool end): val(val), end(end), fail(nullptr) {
        memset(children, 0, sizeof(children));
    }
};

class StreamChecker {
public:
    TrieNode *root, *current;
    StreamChecker(vector<string>& words): root(new TrieNode('\0', false)), cur(root) {
        for (auto &word : words) {
            TrieNode *node = root;
            for (auto &c : word) {
                int idx = c - 'a';
                if (!node->children[idx]) node->children[idx] = new TrieNode(c, false);
                node = node->children[idx];
            }
            node->end = true;
        }
        queue<TrieNode *> q;
        for (int i = 0; i < 26; i++) {
            if (root->children[i]) root->children[i]->fail = root, q.push(root->children[i]);
            else root->children[i] = root;
        }
        while (q.size()) {
            TrieNode *node = q.front();
            q.pop();
            node->end = node->end || node->fail->end;
            for (int i = 0; i < 26; i++) {
                if (node->children[i]) q.push(node->children[i]), node->children[i]->fail = node->fail->children[i];
                else node->children[i] = node->fail;
            }
        }
    }

    bool query(char letter) {
        current = current->children[letter - 'a'];
        return current->end;
    }
};

/**
 * Your StreamChecker object will be instantiated and called as such:
 * StreamChecker* obj = new StreamChecker(words);
 * bool param_1 = obj->query(letter);
 */






// END
#ifdef LOCAL
int main() {
    Solution s;
    auto res = s.alphabetBoardPath("leet");
    return 0;
}
#endif