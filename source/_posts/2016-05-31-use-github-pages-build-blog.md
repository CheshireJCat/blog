---
title:  用github pages搭建博客
categories: 
- config
tags: 
- git jekyll 配置 blog 搭建
---

#### github pages  
---     

1. 注册一个github账号，并验证邮箱；  
2. 创建一个repo `Create a new repository`  
创建一级域名网站，填写 `username.github.io` ,例如 `CheshireJCat.github.io`  
创建子域名网站，填写任意想取的名字即可  
3. 勾选`Initialize this repository with a README`（可选，建议勾选）  
4. 点击`Create repository`按钮，生成repo
5. 进入repo页面，点击`Settings`按钮进入设置  
6. 在 `GitHub Pages` 项目，点击`Launch automatic page generator`，然后选择模板，确认即可  
7. 在地址栏 输入 `username.github.io`或者`username.github.io/repoName` 即可进入创建好的网站主页  
<!--more-->
#### git管理
---  
可以在web页面进行代码管理，或者下载客户端，lz比较喜欢用黑窗口  

##### 1. 下载安装  
git [https://git-scm.com/download/](https://git-scm.com/download/)  

> Windows下要使用很多Linux/Unix的工具时，需要Cygwin这样的模拟环境，Git也一样。Cygwin的安装和配置都比较复杂，就不建议你折腾了。不过，有高人已经把模拟环境和Git都打包好了，名叫msysgit，只需要下载一个单独的exe安装程序，其他什么也不用装，绝对好用。  

> msysgit是Windows版的Git，从https://git-for-windows.github.io下载（网速慢的同学请移步国内镜像），按默认选项安装即可。  

> 安装完成后，在开始菜单里找到“Git”->“Git Bash”，蹦出一个类似命令行窗口的东西，就说明Git安装成功 

git命令行也可以使用`tab`键自动补全命令  

###### 成功后，设置全局参数  
`git config --global user.name "Your Name"` 

`git config --global user.email "email@example.com"`  

###### 让git显示颜色  
`git config --global color.ui true`  

(如需更新git  `git clone https://github.com/git/git`)   

详细git教程推荐  [廖雪峰的git教程](http://www.liaoxuefeng.com/wiki/0013739516305929606dd18361248578c67b8067c8c017b000)  

##### 2. 克隆远程仓库代码到本地  
`mkdir blog`  

`cd blog`    

`git clone https://github.com/CheshireJCat/blog`  

本地Git仓库和GitHub仓库之间的传输是通过SSH加密的，需要一点设置 ：

##### 3. 创建SSH Key  
 `ssh-keygen -t rsa -C "youremail@example.com"`    

登录github，`点击右上角头像 > settings > SSH and GPG keys `  

或者进入[https://github.com/settings/keys](https://github.com/settings/keys)    

在你用户主目录里找到`.ssh`目录，打开公钥`id_rsa.pub`,将内容添加到Key里，就可以向git托管推送本地代码了  

##### 4. 推送本地更新到远程仓库

将工作去代码修改部分转移到暂存区  

`git add .`  

将暂存区内容提交到当前分支  

`git commit -m "update info"`  

提交到远程仓库  

如果是`CheshireJCat.github.io`  根域名

`git push origin master`  

子域名默认会将网站代码建立到 `gh-pages` 分支,提交需使用  

`git push origin gh-pages`

会提示输入验证信息（github的登录邮箱和密码）  

常见报错处理请参考[http://www.open-open.com/lib/view/open1366080269265.html](http://www.open-open.com/lib/view/open1366080269265.html)


#### jekyll  
---  

###### 确保电脑安装了`ruby、pyhon、easy_install` 并配置好了环境变量  

测试代码如下：  

`python -V`  

`easy_install --version`  

`ruby -v`  

###### 安装python  

下载[https://www.python.org/downloads/](https://www.python.org/downloads/)
安装，添加到环境变量  

###### 安装easy_install   
下载[{{site.baseurl}}/sources/python/ez_setup.py]({{site.baseurl}}/sources/python/ez_setup.py)  

使用python运行ez_setup.py文件  

`python ez_setup.py`  

python文件夹下面多了个scripts的目录,表示安装成功了  

`右键我的电脑--高级系统设置--高级--环境变量--系统变量--path--编辑--后面加上  ;C:\Python27\Scripts`设置好全局变量，保存  

cmd控制台输入 `easy_install --version`测试安装

###### 安装ruby  
下载[http://rubyinstaller.org/downloads/](http://rubyinstaller.org/downloads/)    

解压，双击运行，next。。。出现` Add Ruby executables to your PATH`时勾选，最后将`C:\Ruby\bin`添加到环境变量  

cmd控制台输入 `ruby -v`测试安装

###### 安装 Pygments 语法高亮的插件  
需要安装 Python 并在网站的配置文件 _config.yml 里将 highlighter 的值设置为 pygments  

`easy_install Pygments`

###### 安装Jekyll  
`gem install jekyll`  

由于墙的原因，这里一般会报错  解决办法[解决国内gem不能用的问题](http://www.haorooms.com/post/gem_not_use)  

`gem sources --remove https://rubygems.org/`  

`gem sources -a https://ruby.taobao.org/`  

`gem sources -l`  


安装之后，用命令行进入一个文件夹，新建一个站点  

`jekyll new myblog`  

进入目录  

`cd myblog`  

开启服务  

`jekyll serve`  

默认端口为4000，如报错，可能原因为端口被占用时，修改站点根目录下面的 `_config.yml`,添加  

`port: 5001`  

重新`jekyll serve`  运行即可  


测试成功后，将此站点的文件拷贝替换到之前的blog文件夹  

```  
    git add .  
    git commit -m "update"  
    git push origin gh-pages  
```  
更新到远程仓库即可   

#### 发表博客  
--- 

在`_post`文件夹，复制或新建一个html或者markdown文件，命名为`年-月-日-标题.markdown`（如`2016-05-30-new-blog.markdown`）格式  

头部输入：  

```ruby
---
layout: default
title:  "My First Blog"
category: daisy
excerpt: my first daisy in 2016. 
tags: daisy
---
```  
`layout`    表示模板文件  

`title`     博客标题  

`category`  博客分类  

`excerpt`   博客摘要  

`tags`      博客标签  

 
然后再下面输入博客的内容,然后用git提交，就可以了  
[markdown语法](http://www.bluesdream.com/blog/markdown-cheatsheet-syntax-manual.html) 
[markdown语法详解](http://www.markdown.cn/)

#### 域名绑定  
---  

以我自己的域名为例`lmaomaoz.com`  

在blog根目录下新建一个文件  `CNAME`   

在里面输入自己的顶级域名  

`lmaomaoz.com`  

然后用git提交到远程  

在域名解析控制台解析域名，lz用的万网（和阿里云合作了）解析的  

##### 添加两条A记录：  

记录类型是`A`  

主机记录是`@`  

解析线路`默认`  

记录值一个用`192.30.252.154`  

另一个用`192.30.252.153`    

##### 添加一条CNAME记录：  

记录类型是`CNAME`  

主机记录是`www`  

解析线路`默认`  

记录值用`CheshireJCat.github.io`  

也就是你自己要解析的重定向的域名 

等一段时间，等官方解析服务器记录后就可以通过域名来直接访问博客或者网站 

#### 其他  
---  

* 域名解析也有网友推荐`dnspos`,[https://www.dnspod.cn/](https://www.dnspod.cn/),教程自行百度    
* 此方案同样适用于搭建静态网站    
* jekyll详细配置适用文档[http://jekyll.bootcss.com/](http://jekyll.bootcss.com/)  
* 博客的评论可以用 国外的 disqus，或者国内的 友言或者多说等其他评论系统 简单配置即可  

转载请注明出处   
 


