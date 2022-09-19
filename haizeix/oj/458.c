#include <stdio.h>
#include <math.h>
#include <stdlib.h>
#include <string.h>
#include <ctype.h>

#define PI acos(-1)
#define MAX 100000
#define EPSILON 1e-7

void swap(int *a, int *b){
    *a = *a + *b;
    *b = *a - *b;
    *a = *a - *b;
}

typedef struct Student{
    char name[1000];
    char sex[6];
    int year;
    int month;
} Student;

int main(){
    int n;
    scanf("%d", &n);
    Student stu[n];
    for(int i = 0; i < n; i++){
        // stu[i] = (struct Student *)malloc(sizeof(Student));
        scanf("%s %s %d %d", stu[i].name, stu[i].sex, &stu[i].year, &stu[i].month);
    }
    for(int i = 0; i < n ; i++){
        for(int j = 0; j < n - 1 - i; j++){
            if(stu[j].year < stu[j+1].year || stu[j].year == stu[j+1].year && stu[j].month < stu[j+1].month){
                Student temp = stu[j];
                stu[j] = stu[j+1];
                stu[j+1] = temp;
            }
        }
    }
    for(int i = 0; i < n; i++){
        printf("%s %s %d %d\n", stu[i].name, stu[i].sex, stu[i].year, stu[i].month);
    }
    return 0;
}
