# 解析某音视频及刷步数小程序

## 前言

小程序二次开发，设计UI和修改MD5原帖子已找不到，只有最初的作者的帖子，**作者看到请联系我加上！**

原帖子链接：*[抖音无水印视频下载小程序源码 使用云函数无需购买服务器](https://www.52pojie.cn/thread-1274669-1-1.html)*

### 修改内容

* 1.修改UI
* 2.修改视频下载规则

  下载视频需要在后台配置 downloadFile 合法域名，抖音域名频繁更换，导致没有配置的域名不会下载，而后台最对可以配置 200 个，于是用php先把视频下载到自己服务器再用自己的链接返回，只需配一个域名即可！

  * 需搭建php环境，没有服务器的则用内置的下载地址

### 增加内容

* 小米运动刷步数

  需自己配置api（软件或php任选其一），没有服务器的则用内置的api

  软件和源码在“php”目录下
  
  

## 使用方法

### 导入项目

导入项目，初始化云开发，不会的看**原帖子**教程
后台配置域名不需要填抖音的，填自己的，没有则填写图片里的
![修改域名配置](https://s3.ax1x.com/2021/01/04/sPazND.png)

### 上传php文件并修改

如果都用我的域名则跳过这步
源码和刷步软件在“php”目录下载：<https://github.com/oddfar/FMiniProgram/php>



> **某米刷步搭建**（若用内置的api，可以跳过这步，不过内置api不保证一直稳定）

上传“index.php”（需要自行刷步数api，上传软件或者php源码都可）

下载刷步数软件(下载地址在最上面)，并挂在服务器上，**把php文件里面的api地址替换成自己的**，修改源码里的链接

![修改链接](https://s3.ax1x.com/2021/01/04/sPaXB6.png)



> **某音水印解析搭建**（若用内置的api，可以跳过这步，不过内置api不保证一直稳定）



**1、上传“q.php”（下载并返回视频链接文件）**

* 修改源码里的链接

  ![修改链接](https://s3.ax1x.com/2021/01/04/sPajHK.png)
* 更新云函数文件

  ![上传](https://s3.ax1x.com/2021/01/04/sPaxAO.png)

**2、上传“del.php”（删除下载视频文件）**

默认删除下载10分钟后的视频，加个定时任务访问此文件，否则下载的视频不会被删除，导致服务器磁盘爆满





最后上传发布小程序即可，“php”目录不上传！



## 体验小程序



体验小程序
[![小程序](https://s3.ax1x.com/2021/01/05/sFBTI0.jpg)](https://imgchr.com/i/sFBTI0)

小程序被人恶意举报已封，可能是有别的平台名字，建议在小程序里把“抖音”改成“某音”，“小米”改成“某米”

