title: 开始使用
date: 2016-06-20 20:47:46
tags: [hexo,editor,markdown]
categories: [文档]
---
## 安装依赖
* [Node.js](https://nodejs.org) v4.0+
* [Git](https://git-scm.com/)

## 下载
```
git clone https://github.com/tajpure/hexo-editor.git
```

## 初始化
进入hexo-editor目录，执行
```
npm install --production
```

## 配置_config.yml
_config.yml位于hexo-editor根目录，提供了一些简单的配置选项给用户设置。

#### *设置环境*
1. 如果在桌面环境使用，将local改为true，此时无需登录即可使用。
2. 如果部署在服务器，请使用local的默认值false，此时需要配置用户名和密码。

#### *设置用户名和密码*
> 如果在桌面环境使用，请忽略此配置

将要使用的用户名和密码依次填到username和password中，请不要使用默认值。

#### *设置博客目录*(使用绝对路径)
将hexo博客的目录路径配置到base_dir, 例:如果你的博客目录为"/home/user/blog"，则将base_dir设为该地址。

> 如果需要使用hexo-editor提供的deploy功能，你需要设好hexo的deploy配置，并添加你的ssh key至deploy服务器的authorized_keys。使其不用密码即可deploy。

#### *设置端口*
默认端口为2048，如果想自定义端口，直接修改即可。

### 启动
```
npm start
```
