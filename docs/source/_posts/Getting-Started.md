title: Getting Started
date: 2016-06-20 20:43:49
tags: [hexo,editor,markdown]
categories: [docs]
---
## Dependencies
* [Node.js](https://nodejs.org) v4.0+
* [Git](https://git-scm.com/)

## How to Get Hexo Editor?
```
git clone https://github.com/tajpure/hexo-editor.git
```

## Initialization
```
cd hexo-editor
npm install --production
```

## Configuration
You can change these variables in _config.yml for configuration.

#### *local*
1. If you use it in desktop, change the "local" to be true, and then you can use it without login.
2. If deploy it on server, please use the default value "false". You will need to authorize.

#### *username & password*
> If you use it in desktop, please skip this step.

Please use your own username and password, Do not use the defaults.

#### *base_dir*(absolute path)
Set your hexo blog directory to the "base_dir".
> If you need to deploy a hexo blog, you should add the SSH key to the authorized_keys of the target machine.

#### *port*
The default port of Hexo Editor is 2048

### start
```
npm start
```
