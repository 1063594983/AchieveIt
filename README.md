## Achieve It 软件开发实践


### 关于
本项目分为前端和后端两部分，都基于`Node.js`开发，使用`yarn`进行包管理（支持workspace，可以共享node_modules）如果用npm的话，可以用lerna，应该也是支持的，大家可以查一下。

**安装方法**
```shell script
npm install -g yarn
# cnpm install -g yarn
```

```shell script
# 安装 package.json 中的依赖，等于npm install
yarn
# 增加新的依赖，等于 npm install ...
yarn add ...
```

**启动方法**
```shell script
# 在根目录下运行
# 启动前后端
yarn start

# 只开发后端
yarn dev:server

# 只开发前端
yarn dev:client
```

如果使用yarn下载慢的话，最好设置一下淘宝源

### Git 相关
提交的时候，最好使用以下格式（为啥要用呢？因为报告里已经这么写了呀QWQ）

[类型] 内容

例如：
```shell script
[fix] 修复...问题
[feature] 前端完成登录界面
[chore] 更改 Readme 描述
[restructure] 后端重构了登录模块的代码
```

TODO

### 前端看这里
简单设置了一下vue

TODO

### 后端看这里
简单设置了一下express
用`nodemon`实现脚本的自动更新
TODO
