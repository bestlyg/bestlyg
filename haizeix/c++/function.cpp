#include <iostream>
#include "bestlyg.h"

BESTLYG_NP_BEGIN(bestlyg)
BESTLYG_NP_BEGIN(function)

int add(int a, int b) {
    return a + b;
}
class Add {
public:
    Add() {
        std::cout << "Add normal constructor" << std::endl;
    }
    Add(Add &add) {
        std::cout << "Add copy constructor" << std::endl;
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
        std::cout << "normal_function constructor" << std::endl;
    }
    T run(ARGS... args) override {
        return ptr(std::forward<ARGS>(args)...);
    }
    base_function<T, ARGS...> *copy() override {
        std::cout << "normal copy" << std::endl;
        return new normal_function(*this);
    }
    ~normal_function() {
        std::cout << "normal deconstructor" << std::endl;
    }
};
template<typename CLASS, typename T, typename... ARGS>
class class_function: public base_function<T, ARGS...> {
private:
    CLASS ptr;
public:
    class_function(CLASS &ptr): ptr(ptr) {
        std::cout << "class_function constructor" << std::endl;
    }
    T run(ARGS... args) override {
        return ptr(std::forward<ARGS>(args)...);
    }
    base_function<T, ARGS...> *copy() override {
        return new class_function(*this);
    }
    ~class_function() {
        std::cout << "class deconstructor" << std::endl;
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
        std::cout << "function normal constuctor" << std::endl;
    }
    template<typename CLASS>
    function(CLASS ptr): ptr(new class_function<CLASS, T, ARGS...>(ptr)) {
        std::cout << "function class constuctor" << std::endl;
    }
    T operator()(ARGS... args) {
        return ptr->run(std::forward<ARGS>(args)...);
    }
    function &operator=(const Add &a) {
        std::cout << "operator a" << std::endl;
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

void demo() {
    BESTLYG_PRINT(main_function);
    function<int(int, int)> func1 = add;
    std::cout << func1(1, 2) << std::endl;
    Add a;
    function<int(int, int)> func2 = a;
    std::cout << func2(12, 314) << std::endl;
    func2 = func1;
    std::cout << func2(1, 2) << std::endl;
}

BESTLYG_NP_END(function)
BESTLYG_NP_END(bestlyg)