#include <vector>
#include <memory>

#include "./bench.cpp"

int main() {
using namespace std;
BEGINT
    vector<shared_ptr<int>> shared_vector;
    for (int i = 0; i < 1000; ++i) {
        shared_vector.push_back(make_shared<int>());
    }
ENDT
BEGINT
    vector<shared_ptr<int>> shared_vector2;
    for (int i = 0; i < 1000; ++i) {
        shared_vector2.push_back(shared_ptr<int>(new int));
    }
ENDT
BEGINT
    vector<unique_ptr<int>> unique_vector;
    for (int i = 0; i < 1000; ++i) {
        unique_vector.push_back(unique_ptr<int>(new int));
    }
ENDT
    return 0;
}