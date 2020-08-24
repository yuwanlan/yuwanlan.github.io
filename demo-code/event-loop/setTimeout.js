setTimeout(()=>{
  console.log(1)
},1)
setTimeout(()=>{
  console.log(2)
},2)
setTimeout(()=>{
  console.log(3)
},3)
setTimeout(()=>{
  console.log(4)
},4)
setTimeout(()=>{
  console.log(5)
},5)
setTimeout(()=>{
  console.log(6)
},6)
setTimeout(()=>{
  console.log(7)
},7)

每个异步行为都会进入Event Table并注册函数
当函数完成后，会去Event Queue读取对应的函数，进入主线程执行