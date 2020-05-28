---
title: evnent-loop
description: evnent-loop
tags: [javascript, evennt-loop]
time: 2020-05-28
id: evnent-loop
---
# evennt-loop
参考链接：
https://juejin.im/post/59e85eebf265da430d571f89
https://juejin.im/post/5a6155126fb9a01cb64edb45
### 宏任务 - macro-task
包括整体代码script(同步)、setTimeout(异步)、setInterval(异步)、setImmediate、I/O、UI交互事件
### 微任务 - micro-task
Promise、process.nextTick、MutaionObserver


````javascript
setTimeout(function() {
    console.log('1');
    process.nextTick(function() {
        console.log('3');
    })
    new Promise(function(resolve) {
        console.log('2');
        resolve();
    }).then(function() {
        console.log('4')
    })
})

setTimeout(function() {
    console.log('5');
    new Promise(function(resolve) {
        console.log('6');
        resolve();
    }).then(function() {
        console.log('8')
    })
    process.nextTick(function() {
      console.log('7');
  })
})
正常执行顺序为 1-8
在node环境下存在另外一种情况 1256 37 48 混合了执行
````
````javascript
console.log(1)

setTimeout(() => {
  console.log(2)
  new Promise(resolve => {
    console.log(4)
    resolve()
  }).then(() => {
    console.log(5)
  })
  process.nextTick(() => {
    console.log(3)
  })
})

new Promise(resolve => {
  console.log(7)
  resolve()
}).then(() => {
  console.log(8)
})

process.nextTick(() => {
  console.log(6)
})

setTimeout(() => {
  console.log(9)
  process.nextTick(() => {
    console.log(10)
  })
  new Promise(resolve => {
    console.log(11)
    resolve()
  }).then(() => {
    console.log(12)
  })
})
不考虑node中的玄学情况
执行顺序为
第一遍 宏任务执行 1 7， 微任务队列有 6 8， 宏任务队列有 2 9
打印 1 7 6 8 然后执行宏任务队列
第二遍 宏任务执行 2 4 微任务队列 3 5 还有宏任务 9
打印 2 4 3 5 继续执行宏任务
第三遍 宏任务执行 9 11 微任务队列 10 12
打印 9 11 10 12 微任务完，宏任务完

````
````javascript
setTimeout(() => {
	console.log(2)
}, 2)

setTimeout(() => {
	console.log(1)
}, 1)

setTimeout(() => {
	console.log(0)
}, 0)
执行顺序是 1 0 2
// node环境下可能存在不同的情况，玄学timer
设置setTimeout 最低延迟4ms的情况是
If nesting level is greater than 5, and timeout is less than 4, then set timeout to 4.
否则传入 0 和 1 都是 1
````
