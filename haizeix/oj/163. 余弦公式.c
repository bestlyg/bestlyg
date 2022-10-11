#include <stdio.h>
#include <math.h>
#include <stdlib.h>
#include <string.h>

#define PI acos(-1)

int main(){
    double a,b,theta;
    scanf("%lf %lf %lf", &a, &b, &theta);
    printf("%.6lf", sqrt(a*a+b*b-2*a*b*cos(theta/180*PI)));
    return 0;
}
