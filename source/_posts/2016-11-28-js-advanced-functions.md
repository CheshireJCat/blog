---
title: 高级函数
date: 2016-11-28 15:20:52
tags:
- javascript
categories:
- javascript
---

> 《javascript高级程序设计》

## 安全类型检测

javascript内置的类型检测机制并非完全可靠。

- 比如`safari`(直至第四版)对正则表达式的`typeof`操作符会返回`function`。  
- `instanceof`操作符存在多个全局作用域（一个页面多个frame），的情况下也有问题。例如：  
```javascript
var isArray = value instanceof Array;
```
当`value`是一个数组，且与`Array构造函数`在同个作用域时，才会返回`true`,如果`value`在别的`frame`，就会返回`false`
。
- 