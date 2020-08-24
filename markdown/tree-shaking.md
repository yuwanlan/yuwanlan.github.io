---
title: tree-shaking
description: 去除代码中没必要的模块
tags: ['tree-shaking','webpack']
time: '2020-08-24'
id: tree-shaking
---
# tree-shaking是什么
DCE的一种新的实现，把项目中没必要的模块全部抖掉，用于在不同的模块之间消除无用的代码。\
tree shaking 是 rollup 作者首先提出的：
````javascript
如果把代码打包比作制作蛋糕。传统的方式是把鸡蛋(带壳)全部丢进去搅拌，然后放入烤箱，最后把(没有用的)蛋壳全部挑选并剔除出去。
而 treeshaking 则是一开始就把有用的蛋白蛋黄放入搅拌，最后直接作出蛋糕
````
因此，相比于排除不使用的代码，tree shaking 其实是找出使用的代码。
## DCE(dead code elimination)
删除满足以下条件的代码
* 代码不会被执行，不可到达
* 代码执行的结果不会被用到
* 代码只会影响死变量（只写不读）

传统编译型的语言中，都是由编译器将Dead Code从AST（抽象语法树）中删除，使用代码压缩优化工具uglify
# tree-shaking实现
tree-shaking的消除原理是依赖于ES6的模块特性。
* 只能作为模块顶层的语句出现
* import 的模块名只能是字符串常量
* import binding 是 immutable的

ES6模块依赖关系是确定的，和运行时的状态无关，可以进行可靠的静态分析，这就是tree-shaking的基础。\
静态分析：就是不执行代码，从字面量上对代码进行分析，ES6之前的模块化，比如我们可以动态require一个模块，只有执行后才知道引用的什么模块，这个就不能通过静态分析去做优化。

[webpack关于three-shaking介绍](https://webpack.docschina.org/guides/tree-shaking/#root)
[Tree-Shaking性能优化实践 - 原理篇](https://juejin.im/post/6844903544756109319)