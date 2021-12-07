#include <stdio.h>
#include <stdlib.h>
#include <time.h>

#include "utils.h"
#include "unionfind.h"
#include "stack.h"

int main()
{
    srand(time(0));
    int n = 10;
    int *nums = (int *)calloc(n, sizeof(int));
    for (int i = 0; i < n; i++)
        nums[i] = rand() % 100;
    // int nums[] = {90, 29, 38, 18, 73, 2, 72, 41, 26, 5};
    array_log(nums, 0, n - 1);
    quick_sort(nums, 0, n - 1);
    array_log(nums, 0, n - 1);
    free(nums);
    return 0;
}