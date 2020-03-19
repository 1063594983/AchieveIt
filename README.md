## Achieve It 软件开发实践

### 关于

本项目分为前端和后端两部分，都基于`Node.js`开发，使用`yarn`进行包管理（支持 workspace，可以共享 node_modules，以及使用公共库等）
如果遇到安装问题的话，请务必使用 Yarn！

**安装方法**

```shell script
npm install -g yarn
```

```shell script
# 安装 package.json 中的依赖，等于npm install
yarn
# 在子项目文件夹中：增加新的依赖，等于 npm install ...
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

如果使用 yarn 下载慢的话，最好设置一下淘宝源

### 项目结构

前端后端不提了，主要是 contract！

这个子项目仅仅用作编写接口声明，前后端项目都通过引入这个库中的类型来实现类型检查。

好处是可以避免拼写错误之类的问题，便于重构和增加条目，另外也可以增加沟通的效率。

后端

```typescript
import { DemoResult } from "achieve-it-contract";

router.get("/hello", (req, res: Response<DemoResult>) => {
  res.json({
    project: "AchieveIt",
    msg: "Test",
    status: "ok"
  });
});
```

前端

```typescript
import { DemoResult } from "achieve-it-contract";

const result = await axios.get<DemoResult>(`${baseURL}/hello`);
const data = result.data;
data.msg; // 这里有类型检查和代码提示
```

声明（目前大概是类似这样，可以）

```typescript
export interface ResultCommon {
  msg: string;
  status: "err" | "ok";
}
// demo/hello
export interface DemoResult extends ResultCommon {
  project: string;
}
```

### Git 相关

提交的时候，最好使用以下格式（为啥要用呢？因为报告里已经这么写了呀 QWQ）

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

简单设置了一下 vue

TODO

### 后端看这里

简单设置了一下 express

用`nodemon`实现脚本的自动更新

TODO
