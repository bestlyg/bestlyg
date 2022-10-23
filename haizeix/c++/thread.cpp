#include <iostream>
#include <vector>
#include <mutex>
#include <unordered_map>
#include <queue>
#include <functional>
#include <thread>
#include <condition_variable>
#include <numeric>
#include "./bench.cpp"

using namespace std;
#define NP_START(np) namespace np {
#define NP_END  };
const int BATCH = 500000;
const int CNT = 10;
int is_prime(int n) {
    if (n == 0 || n == 1) return false;
    for (int i = 2; i * i <= n; i++) {
        if (n % i == 0) return false;
    }
    return true;
}

NP_START(sync)
int main() {
    int cnt = 0;
    for (int i = 0; i <= BATCH * CNT; i++) {
        if (is_prime(i)) cnt++;
    }
    cout << "cnt : " << cnt << endl;
    return 0;
}
NP_END


NP_START(async_thread_mutex)
mutex mtx;
int cnt = 0;
void worker(int start, int end) {
    thread::id id = this_thread::get_id();
    cout << "===START===" << endl
         << "start = " << start
         << ", end = " << end
         << ", id = " << this_thread::get_id()
         << endl;
    for (int i = start; i < end; i++) {
        if (is_prime(i)) {
            unique_lock<mutex> lock(mtx);
            cnt++;
        }
    }
    cout << "===END===" << endl
         << "start = " << start
         << ", end = " << end
         << ", id = " << this_thread::get_id()
         << endl;
}
int main() {
    vector<thread> list;
    for (int i = 0; i < CNT; i++) {
        thread t(worker, i * BATCH, (i + 1) * BATCH);
        list.push_back(move(t));
    }
    for (int i = 0; i < CNT; i++) list[i].join();
    cout << cnt << endl;
    return 0;
}
NP_END

NP_START(async_thread)
vector<int> res(CNT);
void worker(int idx, int start, int end) {
    thread::id id = this_thread::get_id();
    string str = "";
    cout << "===START===" << endl
         << "start = " << start
         << ", end = " << end
         << ", id = " << this_thread::get_id()
         << endl;
    for (int i = start; i < end; i++) {
        if (is_prime(i)) {
            res[idx]++;
        }
    }
    cout << "===END===" << endl
         << "start = " << start
         << ", end = " << end
         << ", id = " << this_thread::get_id()
         << endl;
}
int main() {
    vector<thread> list;
    for (int i = 0; i < CNT; i++) {
        thread t(worker, i, i * BATCH, (i + 1) * BATCH);
        list.push_back(move(t));
    }
    for (int i = 0; i < CNT; i++) list[i].join();
    int cnt = accumulate(res.begin(), res.end(), 0);
    cout << cnt << endl;
    return 0;
}
NP_END


NP_START(async_thread_pool)
vector<int> res(CNT);
class Task {
private:
    function<void()> func;
public: 
    template<typename FUNC_T, typename... ARGS>
    Task(FUNC_T f, ARGS... args) {
        func = bind(f, forward<ARGS>(args)...);
    }
    void run() {
        func();
    }
};
class ThreadPool {
private:
    vector<thread *> trr;
    unordered_map<thread::id, bool> running;
    queue<Task *> task_q;
    mutex mtx;
    condition_variable condi;
    bool starting;
    void stop_running() {
        auto id = this_thread::get_id();
        running[id] = false;
    }
    Task *get_task() {
        unique_lock<mutex> lock(mtx);
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
        thread::id id = this_thread::get_id();
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
            trr[i] = new thread(&ThreadPool::worker, this);
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
        unique_lock<mutex> lock(mtx);
        task_q.push(new Task(f, forward<ARGS>(args)...));
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
    thread::id id = this_thread::get_id();
    string str = "";
    cout << "===START===" << endl
         << "start = " << start
         << ", end = " << end
         << ", id = " << this_thread::get_id()
         << endl;
    for (int i = start; i < end; i++) {
        if (is_prime(i)) {
            res[idx]++;
        }
    }
    cout << "===END===" << endl
         << "start = " << start
         << ", end = " << end
         << ", id = " << this_thread::get_id()
         << endl;
}
int main() {
    ThreadPool tp(5);
    for (int i = 0; i < CNT; i++) {
        tp.add_task(worker, i, i * BATCH, (i + 1) * BATCH);
    }
    tp.stop();
    int cnt = accumulate(res.begin(), res.end(), 0);
    cout << cnt << endl;
    return 0;
}
NP_END

#define run(np) BEGINT \
 np::main(); \
ENDT \

int main() {
    run(sync);
    run(async_thread_mutex);
    run(async_thread);
    run(async_thread_pool);
    return 0;
}