#include <chrono>
#include <iostream>
#include "bestlyg.h"
#ifndef BESTLYG_BENCH
#define BESTLYG_BENCH

#define BESTLYG_BENCH_BEGIN { \
bestlyg::Timer t;
#define BESTLYG_BENCH_END }

BESTLYG_NP_BEGIN(bestlyg)

class Timer {
    using hrc = std::chrono::high_resolution_clock;
    using mcs = std::chrono::microseconds;
    std::chrono::time_point<hrc> startTimePoint;
public:
    Timer();
    void stop();
    ~Timer();
};

BESTLYG_NP_END(bestlyg)

#endif