---
title: 作用域与this
description: JavaScript静态作用域与this
tags: [javascript,this,静态作用域]
time: 2020-5-20
id: scope&this
---
# 作用域 
词法作用域 基于定义的位置,静态的\
需要明确的是，事实上 JavaScript 并不具有动态作用域。它只有词法作用域，简单明了。 但是 this 机制某种程度上很像动态作用域。
````javascript
let a = 'global-a';
let foo = function(){
    console.log(a)
}

let bar = function(){
    let a = 'bar-a'
    foo()
}
// 静态的词法作用域,只在定义的时候影响
bar() // global-a


````
# 动态作用域
this 是在运行的时候绑定的


需要明确的是，this 在任何情况下都不指向函数的词法作用域。
函数的htis可以指向自己 fn.call(fn)


调用位置
调用栈
从调用栈 分析出调用位置


## 4条绑定规则
#### 默认绑定
绑定window
#### 隐式绑定
存在调用上下文,且只有最后一个上下文有用
````javascript
 let a = 'global-a'
 function foo(){
    console.log(this.a)
 }
 let obj = {
    a: 'obj.a',
    foo
 }
 obj.foo() // obj.a
 
 //  第一类隐式this丢失问题,  this应用了默认绑定
 let bar = obj.foo;
 bar(); // global.a  此处引用的是foo本身,而bar应用了默认绑定 this === window
 
 // 第二类丢失问题, callback, 函数当做参数的时候
 setTimeout(obj.foo, 100);
````
#### 显式绑定
call apply bind
#### new 绑定
使用 new 来调用函数，或者说发生构造函数调用时，会自动执行下面的操作。
1. 创建（或者说构造）一个全新的对象。
2. 这个新对象会被执行 [[ 原型 ]] 连接。
3. 这个新对象会绑定到函数调用的 this。
4. 如果函数没有返回其他对象，那么 new表达式中的函数调用会自动返回这个新对象。
5. 

#### 判断this 现在我们可以根据优先级来判断函数在某个调用位置应用的是哪条规则。
可以按照下面的 顺序来进行判断： 
1. 函数是否在 new 中调用（new 绑定）？如果是的话 this 绑定的是新创建的对象。 var bar = new foo()
2. 函数是否通过 call、apply（显式绑定）或者硬绑定调用？如果是的话，this 绑定的是 指定的对象。 var bar = foo.call(obj2) 
3. 函数是否在某个上下文对象中调用（隐式绑定）？如果是的话，this 绑定的是那个上 下文对象。 var bar = obj1.foo() 
4. 如果都不是的话，使用默认绑定。如果在严格模式下，就绑定到 undefined，否则绑定到 全局对象。 var bar = foo() 就是这样。对于正常的函数调用来说，理解了这些知识你就可以明白 this 的绑定原理了。