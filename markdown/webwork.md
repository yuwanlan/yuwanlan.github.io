---
title: Web Worker基础
description: Web Worker基础知识了解
tags: [web-worker,javascript,nuxt]
related_blog: null,
time: 2020-5-25,
id: webwork
---
# Web Worker
<!-- web api -->
## 简介
浏览器提供一个供js运行的环境，在主线程之外
## 线程通信
主线程 -> (子线程) -> 主线程：  postMessage --> ( 子线程 onMessage --> doWork --> finishWork --> postMessage ) --> onMessage
<!--
  console.time('tag') code console.timeEnd('tag')
-->
````javascript
  // 浏览器兼容
  if(typeof(Worker) !== "undefined") {
    let w =  new Worker("demo.js"); // 此处文件不能使用file协议访问，需要静态服务
  }
  w.onmessage=function(event){
    console.log(event.data, "event.data")
  };

  w.terminate();// 终止
````
````javascript
let i = 1;
timeoutFun() {
  postMessage(i); // 通信主线程
  setTimeout("timeoutFun()", 500);
}
timeoutFun()
````

### 注意事项
- 同源限制
- 与主线程上下文不同（如：操作dom）
- 无法读取本地的文件 file协议

## 解决上述限制
### 1. script标签
````javascript
// 1.基础版本
<script id="worker" type="javascript/worker">
  ~~~~~
  postMessage('result')
</script>
<script>
  let workerScript = document.querySelector("#id").textContent;
  let blob = new Blob([workerScript], { type: "text/javascript" });
  let worker = new Worker(window.url.createObjectUrl(blob));
  // window.url.createObjectUrl(blob) 生成一个链接，打开是workerScript的代码
  worker.onmessage = function(e){
    console.log(e)
  }
</script>
````
````javascript
// 2.模块化 插件 - webworkify


````