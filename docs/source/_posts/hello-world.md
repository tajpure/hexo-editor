title: Getting Started
date: 2016-06-20 20:43:49
tags: [hexo,editor,markdown]
categories: [docs]
---
## Dependencies 
* [Node.js](https://nodejs.org) v4.0+
* [Redis](http://redis.io/download)
* [Git](https://git-scm.com/)

## How to Get Hexo Editor?
```
git clone -b v1.x https://github.com/tajpure/hexo-editor.git
```

## Initialization
```
cd hexo-editor
npm install --production
```

## Configuration
You can change the variables in _config.yml to config.

#### *local*
1. If you use it in desktop, change the "local" to be true, and then you can use it without login.
2. If deploy it in server side, please use the default value "false". You will need to authorize.

#### *username & password*
> If you use it in desktop, please skip this step.

Please use your own username and password, Do not use the defaults.

#### *base_dir*
Set your hexo blog directory to the "base_dir".
> If you need to deploy, you should add the SSH key to authorized_keys of target machine.

#### *port*
The default port is 2048

#### *redis host and port*
The redis host is your local host.
The redis port is the default port: 6379.

### start
```
npm start
```