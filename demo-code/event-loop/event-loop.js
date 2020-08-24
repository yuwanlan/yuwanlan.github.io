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

setTimeout(() => {
  console.log('ywl')
}, 100)
// 100ms后执行，但是进入执行队列的时间是不确定的，极端长的情况下，并不能保证100ms后执行内部代码

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
