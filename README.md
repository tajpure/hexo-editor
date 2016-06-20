# Hexo Editor
  Hexo Editor is a web editor for hexo blog platform. You can use it to edit, generate and deploy posts over the web. This editor will auto save your post to the server side by [TextSync](https://github.com/tajpure/TextSync). If you have any questions, the [Wiki](https://github.com/tajpure/hexo-editor/wiki) may be helpful.

## Requirements
* Node.js > v5.9.1
* Redis > v3.2.0

## Installation
```
npm install hexo-editor
```

## Config

You can modify these variables in '_config.yml'.

### local
  * false: When you deploy it in the server side, it will need to authenticate.
  * true: When you just want to use it in desktop environment.

### username & password
  * The username and password for the server side authentication.

### base_dir
  * The root directory of your blog.

License
----
[MIT](http://opensource.org/licenses/MIT)
