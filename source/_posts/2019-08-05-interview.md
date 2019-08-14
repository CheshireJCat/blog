---
title: interview
date: 2019-08-05 11:28:02
tags: 
- daisy
---

总结一下最近的面试问题，暂不公开（表面上的）
<!--more-->

<div id="contentMM" style="display: none">  

- 这个项目中的难点痛点，如何解决的
- 优化之后如何看出性能优化了，具体优化了多少
- 手写 Vue 观察订阅者模式
- 手写 bind() 实现方法
- 闭包是什么，用代码举个例子
- Vue nextTick 的底层实现及其他vue相关底层实现原理
- 上传多个文件夹里的图片，要求文件夹是异步，内部图片是同步，要注意些什么
- BFC布局相关
- 多列自适应布局，尽可能列出两/三栏布局的css方法
- 移动端适配方案，各种
- HTML5 无法自动播放的处理
- 微信劫持video的解决方法
- 架构师应该具有的能力
- webGL 旋转渲染是如何实现的
- 解释一下着色器是什么
- nodejs相关
- 斐波那契数列实现及优化(递归与优化)
- 搜索匹配，编辑器autoComplete实现各项要点
- 手写promise.all
- 手写vue router 
- 长列表问题的处理
- 下拉刷新保持原位置的实现
- http缓存
- 状态码
- Es6 extend 实现
- js事件循环机制
- 背包问题算法

</div>
<button id="want">想查看的话414吧</button>
<div id="dotttt"></div>
<script type="text/javascript">
    (function() {
        Array.from(document.querySelectorAll('[name="description"],[property="og:description"],[name="twitter:description"]')).forEach(function(item){item.content=""})
        var ctn = document.getElementById('contentMM');
        var btn = document.getElementById('want');
        var mc = encodeURIComponent(encodeURIComponent(ctn.innerHTML));
        ctn.innerHTML = '';
        var dots = document.getElementById('dotttt');
        var s = 0,lastTime = 0;
        want.onclick = function(){
            var newTime = new Date(),m = newTime - lastTime;
            (m > 2000) ? s = '' :  s += (m > 1000 ? '-' : '0');
            dots.innerHTML = s;
            lastTime = newTime;
            if(s == '0000-0000'){
                ctn.innerHTML = decodeURIComponent(decodeURIComponent(mc));
                ctn.removeAttribute('style');
            }
        }
    })();
</script>
