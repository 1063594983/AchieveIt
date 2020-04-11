## Achieve It 软件开发实践

### 关于

本项目分为前端和后端两部分，都基于`Node.js`开发，使用`yarn`进行包管理（支持 workspace，可以共享 node_modules，以及使用公共库等）
如果遇到安装问题的话，请务必使用 Yarn！

**安装方法**

```shell script
npm install -g yarn
// 切淘宝源
yarn config set registry https://registry.npm.taobao.org
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

后端api开发书写标准
例: 在server/src/api/projectApi.ts写了如下api:
```typescript
// get /project/:project_id
router.get('/:project_id', (req, res: Response<GetProjectResult>) => {...})
```
要相应的在contract/namespace/project.ts中添加如下内容:
```typescript
/**
 * api: get /project/:project_id
 */

// request
export interface ProjectGetBody extends Authorization {}

// result
export interface GetProjectResult extends ResultCommon {
  project: Project;
}
```
其中request是请求体格式，result为返回结果格式，一般只有get方法有返回体格式，其他方法默认格式为ResultCommon，可省略不写
建议: namespace里最好按get, post, put, delete顺序将api分类写
TODO


## TODO LIST
#### 通用
- [x] 初始化所有页面
- [x] 为页面设置目录权限
- [x] 登录/退出登录
- [ ] 从系统录入（注册）
- [x] 封装接口为API agent（建议使用agent对象提供的参数来进行api访问）
- [x] 布局、路由、夜间模式等
- [x] 个人主页

#### 项目相关
- [x] 查看所有项目
- [x] 查看单个项目详情（以Dialog的形式）
- [x] 项目经理：创建新的项目 (创建项目后会向项目上级发送通知邮件)
- [x] 项目经理：修改单个项目详情/删除单个项目 
- [ ] 项目上级：通过/拒绝项目创建 (审核结果会发送通知邮件给相关人员)
- [ ] 项目经理：分配成员角色（项目审核通过后）
- [ ] EPG Leader：分配EPG成员角色（项目审核通过后）
- [ ] QA Manager：分配QA成员角色（项目审核通过后）
- [ ] 项目经理：修改成员角色（项目审核通过后）
- [ ] 组织级配置管理员: 为项目建立基本配置库（项目审核通过后）
- [ ] 项目经理：为项目人员分配访问权限（项目审核通过后）
- [ ] 项目经理：修改项目状态为“进行中” (人员信息、权限、功能列表全部设定完毕)
- [ ] 项目经理：修改项目状态为“已交付” (项目的产品已经按合同正式交付给客户)
- [ ] 项目经理：修改项目状态为“结束” (项目结束)
- [ ] 项目经理：提交相关需归档的各种资料后，申请项目归档
- [ ] 组织配置管理员：修改项目状态为“已归档” (项目成果完成归档)
- [x] 项目草稿箱

#### 功能相关
- [X] 上传功能excel表
- [X] 下载功能excel表
- [X] 查看项目功能列表

#### 缺陷管理
- [X] 查看所有缺陷（可以通过项目进行筛选）
- [X] 增加缺陷
- [X] 修改缺陷状态 

#### 风险管理
- [ ] 查看所有风险
- [ ] 增加风险
- [ ] 修改风险
- [ ] 删除风险

#### 工时相关
- [x] 查看所有工时登记
- [x] 创建工时登记
- [ ] 修改工时登记
- [ ] 项目经理：批准工时登记

#### 活动相关
- [X] 查看所有活动
- [X] 添加活动

#### 风险相关
- [ ] 查看所有风险
- [ ] 创建风险
- [ ] 修改风险

#### 设备管理
- [x] 查看所有设备
- [ ] 修改设备可用性
- [x] 修改设备名
- [x] 登记新设备
- [x] 删除设备名

#### 配置相关
- [ ]
