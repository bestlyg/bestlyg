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
double f(double x, int p, int q){
    return x * p + q;
}
int main(){
    int p, q;
    scanf("%d %d", &p, &q);
    double l = -20, r = 20;
    while(r - l >= EPSILON){
        double m = (l + r) / 2,
               l_val = f(l, p, q),
               r_val = f(r, p, q),
               m_val = f(m, p, q);
        if(l_val * m_val < 0) r = m;
        else l = m;
    }
    printf("%.4lf", l);
    return 0;
}
