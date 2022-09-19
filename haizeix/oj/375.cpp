#include <algorithm>
#include <iostream>

using namespace std;

struct student {
    int no, score[3], sum;
};

bool comp(const student &s1, const student &s2) {
    return s1.sum != s2.sum             ? s1.sum > s2.sum
           : s1.score[0] != s2.score[0] ? s1.score[0] > s2.score[0]
                                        : s1.no < s2.no;
}

int main() {
    student stu[305];
    int n;
    cin >> n;
    for (int i = 1; i <= n; i++) {
        stu[i].no = i;
        cin >> stu[i].score[0] >> stu[i].score[1] >> stu[i].score[2];
        stu[i].sum = stu[i].score[0] + stu[i].score[1] + stu[i].score[2];
    }
    sort(stu + 1, stu + 1 + n, comp);
    for (int i = 1; i <= 5; i++) {
        cout << stu[i].no << " " << stu[i].sum << endl;
    }
    return 0;
}
