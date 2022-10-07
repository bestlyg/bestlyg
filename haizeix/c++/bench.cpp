#include <chrono>
#include <iostream>

#define BEGINT { \
Timer t;
#define ENDT }

class Timer {
using hrc = std::chrono::high_resolution_clock;
using mcs = std::chrono::microseconds;
    std::chrono::time_point<hrc> startTimePoint;
public:
    Timer() { 
        startTimePoint = hrc::now(); 
    }
    void stop() {
        auto endTimePoint = hrc::now();
        auto start = std::chrono::time_point_cast<mcs>(startTimePoint);
        auto end = std::chrono::time_point_cast<mcs>(endTimePoint);
        auto duration = end - start;
        std::cout << "耗时: " << (duration * 0.001).count() << "毫秒(" << duration.count() << "微妙)" << std::endl;
    }
    ~Timer() {
        stop();
    }
};