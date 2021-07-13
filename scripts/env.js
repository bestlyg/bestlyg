const arrSort = arr => arr.sort((a, b) => (a[0] != b[0] ? a[0] - b[0] : a[1] - b[1]));

const remove = (arr, tar) => {
  console.log('remover', arr, tar);
  //删除选定的高度
  let idx = -1;
  arr.some((val, index) => {
    if (val === tar) {
      idx = index;
      return true;
    }
  });
  arr.splice(idx, 1);
};

const getSkyline = buildings => {
  let res = [],
    pq = [],
    pre = null;
  for (let b of buildings) {
    pq.push([b[0], -b[2]]); //左端点
    pq.push([b[1], b[2]]); //右端点
  }
  arrSort(pq); //按照坐标大小进行排序
  let heights = [0]; //端点最低为0;
  console.log(pq);
  for (let h of pq) {
    console.log('====================');
    console.log(h);
    if (h[1] < 0) {
      heights.push(-h[1]);
    } //加入左端点
    else {
      remove(heights, h[1]);
    } // 删除右端点
    console.log(heights);
    let maxHeight = Math.max(...heights);
    if (pre !== maxHeight) {
      res.push([h[0], maxHeight]);
      pre = maxHeight;
    }
  }
  return res;
};
console.log(
  getSkyline([
    [0, 2, 3],
    [2, 5, 3],
  ])
);
