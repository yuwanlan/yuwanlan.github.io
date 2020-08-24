---
title: data-structure-6.8
description: 数据结构与算法
tags: []
time: '2020-06-08'
id: data-structure-6.8
---
# 算法范例-通用策略
### 暴力穷尽搜索
首先想到 或者 最后的手段，查看所有的选择知道找到目标为止
### 贪婪算法
假设某个问题的解决方案要面对很多种选择，那么总是优先考虑当前代价最小的选择。\
然而，对于大多数问题，贪婪算法都是无效的。\
在某个节点确定的情况下，贪婪算法有效的情况\
1.往一个固定大小的背包里装金银铜币，则是优先金-银-铜\
2.排队等待时间 A需要1分钟完成，B需要10分钟，AB平均等待时间为(1+11)/2 = 6，而BA则是(10+11)/2 = 10.5
### 动态规划
基于解决有限子问题的策略，保存子问题的结果，然后在解决主问题的时候可以重复使用这些子问题的结果。\
通常会基于递归来将大问题转化为小问题。\
待理解补充......