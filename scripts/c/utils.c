#include <stdio.h>
#include "utils.h"

void quick_sort(int *nums, int l, int r)
{
    // log("quick sort : l = %d, r = %d\n", l, r);
    // array_log(nums, l, r);
    if (l >= r)
        return;
    int mid = nums[l], pl = l, pr = r;
    while (pl < pr)
    {
        while (pl <= pr && nums[pr] >= mid)
            pr--;
        if (pl <= pr)
        {
            swap(nums[pl], nums[pr]);
            pl++;
        }
        while (pl <= pr && nums[pl] <= mid)
            pl++;
        if (pl <= pr)
        {
            swap(nums[pl], nums[pr]);
            pr--;
        }
    }
    // log("end loop mid = %d, pl = %d, pr = %d\n", mid, pl, pr);
    // array_log(nums, l, r);
    quick_sort(nums, l, pl);
    quick_sort(nums, pl + 1, r);
}
void array_log(int *nums, int l, int r)
{
    for (int i = l; i <= r; i++)
    {
        i != 0 && printf(",");
        printf("%d", nums[i]);
    }
    printf("\n");
}