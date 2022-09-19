#include <stdio.h>
#include <string.h>
typedef struct Student{
    char name[100];
    int score[5];
}Student;

void sort(Student stu[],int n, int idx){
    Student temp;
    for(int i = 0; i < n ; i++){
        for(int j = 0 ; j < n - 1 - i ; j++){
             if( 
				 		stu[j].score[idx] < stu[j+1].score[idx] || 
				      stu[j].score[idx] == stu[j+1].score[idx] && strcmp(stu[j].name,stu[j+1].name) > 0
			     ){
                 temp = stu[j];
                 stu[j] = stu[j+1];
                 stu[j+1] = temp;
             }
        }
    }
}
void print(Student stu[]){
    for(int i = 0; i < 4; i++){
        i != 0 && printf(" ");
        printf("%s", stu[i].name);
    }
    printf("\n");
}
int main(){
    Student stu[100];
    int n;
    scanf("%d", &n);
    for(int i = 0; i < n; i++){
        scanf("%s", stu[i].name);
        int sum = 0;
        for(int j = 0; j < 4; j++){
            scanf("%d", &stu[i].score[j]);
            sum += stu[i].score[j];
        }
        stu[i].score[4] = sum;
    }
    for(int i = 0; i < 5 ; i++){
       sort(stu, n, i);
       print(stu);
    }
    return 0;
}
