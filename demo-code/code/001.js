
/*
  找出有序数组（从小到大排列）中和为sum的两个数，要求复杂度为O(n)，找到一组即可
  第一行：数组长度
  第二行：数组各项的值
  第三行：sum
  若存在，输出和为sum的两个数，以空格分隔；若不存在，输出notfound
*/
function fn(length, arr, sum) {
  let a = 0, b = 0;
  let i=0,j=length-1;
  if(arr[length-1] + arr[length - 2] < sum || arr[0] + arr[1] > sum) return 'notfound';
  while(a + b !== sum) {
    a = arr[i];
    b = arr[j];
    if(a + b < sum) {
      i ++
    }else {
      j--
    }
  }
  return `${a} ${b}`;
}
console.time()
let len = 5;
let list = [1,3,4,6,8];
let sum = 10;
let res= fn(len, list, sum)
console.log(res)
console.timeEnd()