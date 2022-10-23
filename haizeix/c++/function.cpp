#include <iostream>
using namespace std;

#define NP_BEGIN(np) namespace np {
#define NP_END }

NP_BEGIN(demo)


int add(int a, int b) {
    return a + b;
}
class Add {
public:
    Add() {
        cout << "Add normal constructor" << endl;
    }
    Add(Add &add) {
        cout << "Add copy constructor" << endl;
    }
    int operator()(int a, int b) {
        return a + b * 2;
    }
};


template<typename T, typename... ARGS>
class base_function {
public:
    virtual T run(ARGS... args) = 0;
    virtual base_function<T, ARGS...> *copy() = 0;
    virtual ~base_function() {}
};
template<typename T, typename... ARGS>
class normal_function: public base_function<T, ARGS...> {
private:
    T (*ptr)(ARGS...);
public:
    normal_function(T (*ptr)(ARGS...)): ptr(ptr) {
        cout << "normal_function constructor" << endl;
    }
    T run(ARGS... args) override {
        return ptr(forward<ARGS>(args)...);
    }
    base_function<T, ARGS...> *copy() override {
        cout << "normal copy" << endl;
        return new normal_function(*this);
    }
    ~normal_function() {
        cout << "normal deconstructor" << endl;
    }
};
template<typename CLASS, typename T, typename... ARGS>
class class_function: public base_function<T, ARGS...> {
private:
    CLASS ptr;
public:
    class_function(CLASS &ptr): ptr(ptr) {
        cout << "class_function constructor" << endl;
    }
    T run(ARGS... args) override {
        return ptr(forward<ARGS>(args)...);
    }
    base_function<T, ARGS...> *copy() override {
        return new class_function(*this);
    }
    ~class_function() {
        cout << "class deconstructor" << endl;
    }
};


template<typename T, typename... ARGS>
class function;

template<typename T, typename... ARGS>
class function<T(ARGS...)> {
private:
    base_function<T, ARGS...> *ptr;
public:
    function(T (*ptr)(ARGS...)): ptr(new normal_function<T, ARGS...>(ptr)) {
        cout << "function normal constuctor" << endl;
    }
    template<typename CLASS>
    function(CLASS ptr): ptr(new class_function<CLASS, T, ARGS...>(ptr)) {
        cout << "function class constuctor" << endl;
    }
    T operator()(ARGS... args) {
        return ptr->run(forward<ARGS>(args)...);
    }
    function &operator=(const Add &a) {
        cout << "operator a" << endl;
        return *this;
    }
    function &operator=(const function &f) {
        delete ptr;
        ptr = f.ptr->copy();
        return *this;
    }
    virtual ~function() {
        delete ptr;
    }
};



int main() {
    demo::function<int(int, int)> func1 = add;
    cout << func1(1, 2) << endl;
    Add a;
    demo::function<int(int, int)> func2 = a;
    cout << func2(12, 314) << endl;
    func2 = func1;
    cout << func2(1, 2) << endl;
    return 0;
}
NP_END

int main() {
    demo::main();
    return 0;
}