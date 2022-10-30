#include <vector>
#include <memory>
#include "bench.h"
#include "function.cpp"
#include "template.cpp"
#include "thread.cpp"
#include "rbtree.cpp"

int main() {
    // bestlyg::function::demo();
    // bestlyg::temp::demo();
    // bestlyg::thread::demo();
    bestlyg::rbtree::demo();
    return 0;
}