#include <vector>
#include <memory>
#include "bench.h"
#include "function.cpp"
#include "template.cpp"
#include "thread.cpp"

int main() {
    bestlyg::function::demo();
    bestlyg::temp::demo();
    bestlyg::thread::demo();
    return 0;
}