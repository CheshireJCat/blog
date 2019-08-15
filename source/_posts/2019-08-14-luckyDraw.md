---
title: luckyDraw
date: 2019-08-14 10:24:35
tags:
- javascript
---

之前有个需求要做个抽奖系统，由于时间赶，只是单纯的实现通过随机更改用户头像和名字的方式实现,大致代码如下：
```javascript
var data = [1,2,3,4,5],now = 0;
setInterval(function(){
    now++;
    (now >= data.length) && (now = 0);
    show(data[now]);
},100);
```

当时也尝试在网上找个现成的滚动抽奖，但基本都不尽人意，有些demo还是通过`background-repeat:repeat`,然后无限增加`background-position-y`的方式滚动实现，只能静态固定数据抽奖，局限性太大。  

最近忽然想起来，趁着有空，写个插件方便以后优化和另做他用。  

---  

实现思路其实很简单：  
  
1. 循环滚动；  
2. 慢入，慢出。  

##### 布局  

```html
<div class="rollbox" id="rollbox">
    <div class="luckyBox">
        <ul class="rolls" id="rolls">
            <li>1</li>
            <li>2</li>
            <li>3</li>
        </ul>
    </div>
</div>
```
- `luckyBox` 作为主体，并设置具体宽高；  
- `rolls` 作为存放被抽奖元素的容器，使用`absolute` 的定位方式，相对于父级定位  
- `rollbox` 作为抽奖器的外壳，并设置`overflow:hidden`等样式，这样就不会影响内部的主体  

![html布局](html.jpg)  

##### 动起来

- 用`setTimeout`配合递归的方式实现循环滚动;  
- 观看动画比较舒服的效果是`60帧/s`以上，`1000ms/60 ≈ 16ms`，所以速度默认设置为16;  
- 位移方面，支持`transform`时，用css3移动可以利用硬件加速的优势，不支持的情况也可以使用`top`；

##### 循环

- 首先，我们克隆一些顶部元素，放在容器的后面，  
- 当抽奖容器向上移动的距离超过元素自身高度时`Math.abs(nowTop) >= originHeight`，  
- 瞒天过海，将`nowTop`上移距离复位为`0`，这样就可以实现循环。

```JavaScript
let timer = null,speed = 16,nowTop = 0;
function move() {
    if(!timer) updatePosition();
    timer = setTimeout(function(){
        updatePosition();
        move();
    },speed);
}

function updatePosition() {
    nowTop = (Math.abs(nowTop) >= originHeight ? 0 : nowTop - step) + 'px';

    if(opt.noCss3){
        container.style.top = nowTop;
    }else{
        container.style.transform = container.style.webkitTransform = 'translateY('+nowTop+')';
    }
}
```

##### 慢入慢出

这里，我尝试过css3的`transition`实现，但是由于js单线程的原因，`setTimeout`不可以完全控制，css和js难以同步，兼容性方面也需要考虑，最终还是放弃了这种方案，当然如果控制的精确一点还是可以的，有兴趣的可以尝试一下

根据公式`d=vt`，这里的`d`就是单位时间内位移的距离，`t`我们保持恒定，通过改变速度`v`来改变单位时间的位移距离，从而实现变速效果。
整个变速过程分为三个阶段：  
- 开始阶段，速度递增
- 循环阶段，保持匀速状态，速度保持不变
- 结束阶段，速度递减  

每一帧里，位移变化为`nowTop = nowTop - step`,这里的`step`就是单位时间内的位移距离，这里要实现速度变化，位移计算就变成了：
```
nowTop = nowTop - step.now();
```
所以需要将step变成一个对象，  
提供一个`now`方法，来返回当前的速度；
提供一个`start`方法，表示开始阶段；  
提供一个`end`方法，表示在结束阶段；

`step`实现如下:
```javascript
    let step = (function () {
        let max = 50; // 最大速度
        let min = 1; // 最小速度
        let maxAc = 0.2; // 最大加速度
        let minAc = 0.1; // 最小加速度
        let status = ''; // 速度变化阶段 starting running ending
        let acceleration =  minAc; // 加速度，默认使用最小加速度
        let value = min; // 加速度

        let endCallback = null;

        function now() {
            if(status == 'running'){
                // 匀速运动阶段，直接返回当前速度
                return value;
            }else if(status == 'starting'){
                // 开始阶段，加速
                if(value >= max){
                    // 当速度达到最大值时，进入匀速阶段
                    status = 'running';
                    value = max;
                    return value;
                }
                value += acceleration;
            }else if(status == 'ending'){
                // 停止阶段，减速
                if(value <= min){
                    // 减速达到最小速度时调用回调函数
                    (typeof endCallback == 'function') && endCallback();
                    endCallback = null;
                    value = min;
                    return value;
                }
                value -= acceleration;
            }
            return value;
        }

        function reset(){
            endCallback = null;
            value = min;
            status = '';
            acceleration = minAc;
        }

        return {
            now: now,
            start: function () {
                reset();
                status = 'starting';
            },
            end: function (callback) {
                status = 'ending';
                acceleration = maxAc;
                callback && (endCallback = callback);
            }
        }
    })();
```
以上设置最大最小加速度，是为了在结束时候，可以更快的减速，可根据具体需求设置。
另外，结束的时候没有设置最小速度为0，是因为很大概率停止的时候，抽奖项不会在对齐的位置，比如上下各一半的情况，所以需要减速结束后，保持一个低速，继续运动到合适的位置。  
处理如下：
- 点击停止按钮后，触发`step.stop()`方法，并传入减速到最低时的回调函数；  
- 达到最低速时，计算多出来的距离，并递归，持续保持运动，直到满足条件；
- 对齐时，完全停止滚动，并调用`rollEnd`方法计算出当前抽奖结果。
```javascript
    let stopping = false;
    function stop() {
        // 使频繁点击失效
        if(stopping) return;
        stopping = true;
        step.end(function () {
            afterStop();
        });
    }

    function afterStop() {
        if((Math.abs(nowTop) % childHeight) > 5){
            moving = true;
            if(!timer){
                updatePosition();
            }
            clearTimeout(timer);
            timer = setTimeout(function(){
                updatePosition();
                // 继续运动直到打到指定误差范围内
                afterStop();
            },speed);
        }else{
            moving = false;
            stopping = false;
            rollEnd();
        }
    }
```
计算抽奖结果很简单，根据`nowTop`即可轻松算出:
```javascript
    function rollEnd() {
        let index = Math.floor(Math.abs(nowTop) / childHeight);
        index = index >= data.length ? 0 : index;
        var item = data[index];
        //(typeof opt.end == 'function') && opt.end(item);
    }
```

##### 关于内定抽奖的方式 ，暂不实现了，提供几个思路
- 1.对于普通的抽奖，可以在`afterStop`里作文章，停止在指定位置，且为了保证不会太假，如果候选抽奖项过多时候，建议在中间多插入几个 【谢谢惠顾】，这样就不会减速后有时候滚动很久才停，有时候很快就停，不过这个只是个折中方案；  
- 2.如果要精确实现的话，点击按钮的时候，当前位置已知，结束位置已知，由此可得距离；点击按钮时候的速度已知，停止时间已知，则可以计算出加速度的大小，所以只需在点击停止按钮的时候，改变设定加速度，再做细节处理，即可停止在指定位置；  
- 3.还有一种方案，就是在减速完成后，再匀速移动固定格数，并降要停止的位置，提前替换成内定结果，这个方案更加精确且简单，但是也容易被看出来；
- 4.最后一种方案，然后在点击停止按钮时，不立即减速，而是从结果利用减速时间和位移倒推，计算出开始减速的位置，先以最大速度运动到计算的减速位置，再走正常流程减速，并且最后微调到内定结果，这样每次减速的时间都不会相差太多。
- 5.以上只是写作时暂时想出来的方法，实际情况结合一下这几个方案会更好，这里也是作一个抛砖引玉，也相信大家有更好更精确的方案。

这个插件的逻辑比较简单，大家可以直接copy源码并根据自身需求修改

---
##### 谢绝转载
