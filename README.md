## React Vite Template

### 基本功能

- 多语言
- 路由鉴权
- 代码格式化

### 技术栈

- React
- Vite
- Ant Design
- Zustand
- Husky
- ESLint
- Prettier
- Less
- i18next

### 项目结构

```
├── public
├── src
│   ├── api
│   ├── assets
│   ├── config
│   ├── context
│   │   └── AuthContext.js
│   ├── i18n
│   │   ├── index.js
│   │   └── locales
│   │       ├── en_US.json
│   │       └── zh_CN.json
│   ├── pages
│   │   ├── 404.jsx
│   │   ├── home
│   │   │   ├── index.jsx
│   │   │   └── style.module.less
│   │   ├── login
│   │   │   ├── index.jsx
│   │   │   └── style.module.less
│   ├── router
│   │   ├── AuthProvider.jsx
│   │   └── index.jsx
│   ├── store
│   │   └── useAuthStore.js
│   ├── utils
│   │   ├── constant.js
│   │   └── request.js
│   ├── index.css
│   └── main.jsx
├── .gitignore
├── .lintstagedrc.json
├── .prettierignore
├── .prettierrc
├── bun.lockb
├── eslint.config.js
├── index.html
├── package.json
├── README.md
├── vercel.json
└── vite.config.js

```

### 使用方法

```shell
git clone https://github.com/z9956/react-vite-template.git

cd react-vite-template

// 安装依赖
bun i

// 启动
bun dev

// 打包
bun run build
```
