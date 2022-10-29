#include <chrono>
#include <iostream>
#include <vector>
#include <memory>
#include "bestlyg.h"
#include "bench.h"

BESTLYG_NP_BEGIN(bestlyg)

Timer::Timer() {
    startTimePoint = hrc::now(); 
}

void Timer::stop() {
    auto endTimePoint = hrc::now();
    auto start = std::chrono::time_point_cast<mcs>(startTimePoint);
    auto end = std::chrono::time_point_cast<mcs>(endTimePoint);
    auto duration = end - start;
    std::cout << "耗时: " << (duration * 0.001).count() << "毫秒(" << duration.count() << "微妙)" << std::endl;
}

Timer::~Timer() {
    stop();
}

BESTLYG_NP_END(bestlyg)