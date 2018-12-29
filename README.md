# Demo-Electron

#### 项目介绍
简易的任务管理系统，使用桌面框架**electron-vue**、UI框架**vuetify**构建。
;
- [x] 基础功能：使用**UI框架vuetify**构建
- [x] 基础功能：使用无边框窗口，自定义“最大、最小、关闭、标题栏拖曳”功能
- [x] 基础功能：关闭最小化、系统托盘及右键菜单
- [x] 基础功能：开机自动启动
- [x] 业务功能：登录页-主页面窗口切换、token状态保存
- [x] 业务功能：vue、axios、vue-router、vuex

![Alt text](https://raw.githubusercontent.com/hilanmiao/Demo-Electron/master/Screen/screen2.png)
![Alt text](https://raw.githubusercontent.com/hilanmiao/Demo-Electron/master/Screen/screen1.png)

#### 软件架构
    "vue": "^2.4.2",
    "axios": "^0.16.1",
    "vue-electron": "^1.0.6",
    "vue-router": "^2.5.3",
    "vuex": "^2.3.1",
    "vuetify": "1.2.1",
    "js-cookie": "2.2.0",
    "winreg": "^1.2.4",
    "electron": "^1.7.5",

#### 安装教程

``` bash
cd vuetify-electron

# install dependencies
npm install

# serve with hot reload at localhost:9080
npm run dev

# build electron application for production
npm run build


# lint all JS/Vue component files in `src/`
npm run lint

```

#### 使用说明

release中可以下载exe安装包。目前只是演示版，没有添加具体业务，后面可能会结合api做个简单的例子。安装包美化可以参考另一个项目[NSIS-UI](https://github.com/hilanmiao/NSIS-UI)

#### 参与贡献

1. Fork 本项目
2. 新建 Feat_xxx 分支
3. 提交代码
4. 新建 Pull Request