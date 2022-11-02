#include <iostream>
#include <vector>
#include <mutex>
#include <unordered_map>
#include <queue>
#include <functional>
#include <thread>
#include <condition_variable>
#include <numeric>
#include "bestlyg.h"
#include "bench.h"

const int BATCH = 500000;
const int CNT = 10;
int is_prime(int n) {
    if (n == 0 || n == 1) return false;
    for (int i = 2; i * i <= n; i++) {
        if (n % i == 0) return false;
    }
    return true;
}

BESTLYG_NP_BEGIN(sync)
int main() {
    int cnt = 0;
    for (int i = 0; i <= BATCH * CNT; i++) {
        if (is_prime(i)) cnt++;
    }
    std::cout << "cnt : " << cnt << std::endl;
    return 0;
}
BESTLYG_NP_END(sync)


BESTLYG_NP_BEGIN(async_thread_mutex)
std::mutex mtx;
int cnt = 0;
void worker(int start, int end) {
    std::thread::id id = std::this_thread::get_id();
    std::cout << "===START===" << std::endl
         << "start = " << start
         << ", end = " << end
         << ", id = " << std::this_thread::get_id()
         << std::endl;
    for (int i = start; i < end; i++) {
        if (is_prime(i)) {
            std::unique_lock<std::mutex> lock(mtx);
            cnt++;
        }
    }
    std::cout << "===END===" << std::endl
         << "start = " << start
         << ", end = " << end
         << ", id = " << std::this_thread::get_id()
         << std::endl;
}
int main() {
    std::vector<std::thread> list;
    for (int i = 0; i < CNT; i++) {
        std::thread t(worker, i * BATCH, (i + 1) * BATCH);
        list.push_back(move(t));
    }
    for (int i = 0; i < CNT; i++) list[i].join();
    std::cout << cnt << std::endl;
    return 0;
}
BESTLYG_NP_END(async_thread_mutex)

BESTLYG_NP_BEGIN(async_thread)
std::vector<int> res(CNT);
void worker(int idx, int start, int end) {
    std::thread::id id = std::this_thread::get_id();
    std::string str = "";
    std::cout << "===START===" << std::endl
         << "start = " << start
         << ", end = " << end
         << ", id = " << std::this_thread::get_id()
         << std::endl;
    for (int i = start; i < end; i++) {
        if (is_prime(i)) {
            res[idx]++;
        }
    }
    std::cout << "===END===" << std::endl
         << "start = " << start
         << ", end = " << end
         << ", id = " << std::this_thread::get_id()
         << std::endl;
}
int main() {
    std::vector<std::thread> list;
    for (int i = 0; i < CNT; i++) {
        std::thread t(worker, i, i * BATCH, (i + 1) * BATCH);
        list.push_back(move(t));
    }
    for (int i = 0; i < CNT; i++) list[i].join();
    int cnt = std::accumulate(res.begin(), res.end(), 0);
    std::cout << cnt << std::endl;
    return 0;
}
BESTLYG_NP_END(async_thread)


BESTLYG_NP_BEGIN(async_thread_pool)
std::vector<int> res(CNT);
class Task {
private:
    std::function<void()> func;
public: 
    template<typename FUNC_T, typename... ARGS>
    Task(FUNC_T f, ARGS... args) {
        func = std::bind(f, std::forward<ARGS>(args)...);
    }
    void run() {
        func();
    }
};
class ThreadPool {
private:
    std::vector<std::thread *> trr;
    std::unordered_map<std::thread::id, bool> running;
    std::queue<Task *> task_q;
    std::mutex mtx;
    std::condition_variable condi;
    bool starting;
    void stop_running() {
        auto id = std::this_thread::get_id();
        running[id] = false;
    }
    Task *get_task() {
        std::unique_lock<std::mutex> lock(mtx);
        while (task_q.empty()) {
            condi.wait(lock);
        }
        Task *t = task_q.front();
        task_q.pop();
        return t;
    }
public:
    ThreadPool(int n = 1): trr(n){
        start();
    }
    void worker() {
        std::thread::id id = std::this_thread::get_id();
        running[id] = true;
        while (running[id]) {
            Task *t = get_task();
            t->run();
            delete t;
        }
    }
    void start() {
        if (starting == true) return;
        for (int i = 0; i < trr.size(); i++) {
            trr[i] = new std::thread(&ThreadPool::worker, this);
        }
        starting = true;
    }
    void stop() {
        if (starting == false) return;
        for (int i = 0; i < trr.size(); i++) {
            add_task(&ThreadPool::stop_running, this);
        }
        for (int i = 0; i < trr.size(); i++) {
            trr[i]->join();
        }
        starting = false;
    }    
    template<typename FUNC_T, typename... ARGS>
    void add_task(FUNC_T f, ARGS... args) {
        std::unique_lock<std::mutex> lock(mtx);
        task_q.push(new Task(f, std::forward<ARGS>(args)...));
        condi.notify_one();
    }
    virtual ~ThreadPool() {
        stop();
        while (!task_q.empty()) {
            delete task_q.front();
            task_q.pop();
        }
    }
};
void worker(int idx, int start, int end) {
    std::thread::id id = std::this_thread::get_id();
    std::string str = "";
    std::cout << "===START===" << std::endl
         << "start = " << start
         << ", end = " << end
         << ", id = " << std::this_thread::get_id()
         << std::endl;
    for (int i = start; i < end; i++) {
        if (is_prime(i)) {
            res[idx]++;
        }
    }
    std::cout << "===END===" << std::endl
         << "start = " << start
         << ", end = " << end
         << ", id = " << std::this_thread::get_id()
         << std::endl;
}
int main() {
    ThreadPool tp(5);
    for (int i = 0; i < CNT; i++) {
        tp.add_task(worker, i, i * BATCH, (i + 1) * BATCH);
    }
    tp.stop();
    int cnt = std::accumulate(res.begin(), res.end(), 0);
    std::cout << cnt << std::endl;
    return 0;
}
BESTLYG_NP_END(async_thread_pool)

#define run(np) BESTLYG_BENCH_BEGIN \
np::main(); \
BESTLYG_BENCH_END \

int main() {
    run(sync);
    run(async_thread_mutex);
    run(async_thread);
    run(async_thread_pool);
    return 0;
}