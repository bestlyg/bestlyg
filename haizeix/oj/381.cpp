#include <algorithm>
#include <iostream>

using namespace std;

struct student {
    char name[25];
    char check1, check2;
    int idx, score1, score2, paper, money;
};

int money(student &stu) {
    int sum = 0;
    if (stu.score1 > 80 && stu.paper >= 1) sum += 8000;
    if (stu.score1 > 85 && stu.score2 > 80) sum += 4000;
    if (stu.score1 > 90) sum += 2000;
    if (stu.score1 > 85 && stu.check2 == 'Y') sum += 1000;
    if (stu.score2 > 80 && stu.check1 == 'Y') sum += 850;
    return sum;
}

int comp(const student &a, const student &b) {
    return a.money != b.money ? a.money > b.money : a.idx < b.idx;
}

int main() {
    int n, sum = 0;
    cin >> n;
    student stu[n];
    for (int i = 0; i < n; i++) {
        cin >> stu[i].name >> stu[i].score1 >> stu[i].score2 >> stu[i].check1 >>
            stu[i].check2 >> stu[i].paper;
        stu[i].idx = i;
        stu[i].money = money(stu[i]);
        sum += stu[i].money;
    }
    sort(stu, stu + n, comp);
	/*
    for (int i = 0; i < n; i++) {
        cout << "下标 : " << stu[i].idx << ", 姓名 : " << stu[i].name
             << ", 期末平均成绩 : " << stu[i].score1
             << ", 班级评议成绩 : " << stu[i].score2
             << ", 是否是学生干部 : " << stu[i].check1
             << ", 是否是西部省份学生 : " << stu[i].check2
             << ", 发表论文数 : " << stu[i].paper << ", 下标 : " << stu[i].idx
             << ", 钱 : " << stu[i].money << endl;
    }*/
    cout << stu[0].name << endl << stu[0].money << endl << sum << endl;
    return 0;
}
