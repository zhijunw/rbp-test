
## 如何设置以及启动项目

### 安装依赖

```bash
yarn install
```

### 启动本地开发环境（自带热启动）

```bash
yarn serve
```

### 构建生产环境 (自带压缩)

```bash
yarn build
```

### 代码格式检查以及自动修复

```bash
yarn lint
```


### 自定义 Vue 配置

看这里 [Configuration Reference](https://cli.vuejs.org/config/).

### 前端规范
 [前端规范](https://note.youdao.com/group/#/64936963/(full:md/448233601)).


### 代码检测

eslint 检测 参考 eslintrc.js
prettier 格式化 参考 prettierrc.js

### VSCODE 设置

文件 => 首选项 => 设置 => 搜 eslint 

配置如下

```
{
    "git.ignoreMissingGitWarning": true,
    "workbench.colorTheme": "One Dark Pro",
    "editor.fontSize": 16,
    // "editor.formatOnSave": true,
    "files.autoSave": "off",
    "eslint.autoFixOnSave": true,
    "eslint.validate": [
        "javascript",
        "javascriptreact",
        {
            "language": "vue",
            "autoFix": true
        },
        {
            "language": "typescript",
            "autoFix": true
        },
        {
            "language": "typescriptreact",
            "autoFix": true
        }
    ],
    "eslint.options": {
        "plugins": [
            "html"
        ]
    },
    "breadcrumbs.enabled": true,
    "terminal.integrated.rendererType": "dom",
    "window.zoomLevel": 0,
    "files.associations": {
        "*.cjson": "jsonc",
        "*.wxss": "css",
        "*.wxs": "javascript"
    },
    "emmet.includeLanguages": {
        "wxml": "html"
    },
    "minapp-vscode.disableAutoConfig": true,
    "[javascript]": {
        "editor.defaultFormatter": "esbenp.prettier-vscode"
    },
    "workbench.iconTheme": "vscode-icons",
    "[typescript]": {
        "editor.defaultFormatter": "esbenp.prettier-vscode"
    },
    "vetur.format.defaultFormatter.html": "js-beautify-html",
}
```
