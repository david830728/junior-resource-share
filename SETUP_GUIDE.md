# 初中资源分享网站 - 完整设置指南

## ✅ 项目初始化完成

你的"初中资源分享网站"已经完全搭建完成！以下是详细的设置和运行指南。

---

## 📋 项目概览

### 已完成的工作

1. ✅ **Next.js 项目初始化** - 使用 TypeScript + Tailwind CSS
2. ✅ **后端 API 设计和实现**
   - 资源上传接口 (`POST /api/resources/upload`)
   - 资源列表接口 (`GET /api/resources`)
   - 资源详情接口 (`GET /api/resources/{id}`)
   - 资源下载接口 (`GET /api/resources/{id}/download`)
3. ✅ **前端页面和组件**
   - 资源列表页面（带筛选功能）
   - 上传表单模态框
   - 响应式设计（桌面 + 移动）
4. ✅ **本地文件存储方案**
   - 文件存储在 `public/uploads/` 目录
   - 元数据存储在 `data/resources.json`
5. ✅ **容器化配置**
   - Dockerfile 多阶段构建
   - docker-compose.yml 配置
6. ✅ **完整文档**
   - API 文档 (API_DOCS.md)
   - 项目说明 (README_PROJECT.md)

---

## 🚀 运行项目

### 方式 1: 本地开发（推荐用于开发）

```bash
# 进入项目目录
cd /Users/david/CascadeProjects/junior-resource-share

# 安装依赖（首次运行）
npm install --legacy-peer-deps

# 启动开发服务器
npm run dev
```

**访问地址**: http://localhost:3000

**特点**:
- 热重载（修改代码自动刷新）
- 快速开发体验
- 完整的错误信息和调试信息

---

### 方式 2: Docker 容器运行（推荐用于生产）

```bash
# 进入项目目录
cd /Users/david/CascadeProjects/junior-resource-share

# 构建并启动容器
docker-compose up --build

# 后台运行（可选）
docker-compose up -d --build
```

**访问地址**: http://localhost:3000

**特点**:
- 环境隔离
- 易于部署
- 数据持久化

**停止容器**:
```bash
docker-compose down
```

---

### 方式 3: 使用 Orbstack（Mac 用户推荐）

Orbstack 是 Mac 上的轻量级容器运行时，比 Docker Desktop 更快。

```bash
# 确保 Orbstack 已安装并运行

# 启动容器
docker-compose up --build

# 访问应用
open http://localhost:3000
```

---

## 📝 使用说明

### 上传资源

1. 打开网站 http://localhost:3000
2. 点击右下角的绿色 **"上传资源"** 按钮
3. 填写表单：
   - **选择文件**: 支持 PDF、PPT、Word、视频、图片等（最大 500MB）
   - **资源标题**: 例如"七年级上册数学第一章"
   - **学科**: 选择一个学科（语文、数学、英语、科学、历史、地理、道法）
   - **学段**: 选择一个学段（七上、七下、八上、八下、九上、九下）
   - **资源描述**: 可选，简要描述资源内容
   - **上传者名称**: 你的名字或昵称
4. 点击 **"上传"** 按钮

### 浏览资源

1. 在主页面查看所有资源
2. 使用顶部的筛选器：
   - 点击学科按钮筛选特定学科
   - 点击学段按钮筛选特定学段
   - 可以同时筛选学科和学段
3. 点击 **"全部"** 按钮清除筛选

### 下载资源

1. 找到想要的资源卡片
2. 点击卡片下方的 **"下载"** 按钮
3. 文件会自动下载到你的计算机

---

## 📁 文件结构详解

```
junior-resource-share/
│
├── src/
│   ├── app/
│   │   ├── api/                    # 后端 API 路由
│   │   │   └── resources/
│   │   │       ├── route.ts        # GET 获取列表、POST 上传
│   │   │       ├── upload/
│   │   │       │   └── route.ts    # POST 上传资源
│   │   │       └── [id]/
│   │   │           ├── route.ts    # GET 获取详情
│   │   │           └── download/
│   │   │               └── route.ts # GET 下载文件
│   │   ├── layout.tsx              # 全局布局
│   │   └── page.tsx                # 主页面（整合所有组件）
│   │
│   ├── components/
│   │   ├── ResourceList.tsx        # 资源列表组件（含筛选）
│   │   └── UploadForm.tsx          # 上传表单组件（模态框）
│   │
│   ├── lib/
│   │   └── storage.ts              # 文件存储工具函数
│   │
│   └── types/
│       └── index.ts                # TypeScript 类型定义
│
├── public/
│   └── uploads/                    # 上传文件存储目录（自动创建）
│
├── data/
│   └── resources.json              # 资源元数据数据库（自动创建）
│
├── Dockerfile                      # Docker 镜像配置
├── docker-compose.yml              # Docker Compose 配置
├── API_DOCS.md                     # API 接口文档
├── README_PROJECT.md               # 项目说明文档
├── SETUP_GUIDE.md                  # 本文件
├── package.json                    # 项目依赖配置
└── tsconfig.json                   # TypeScript 配置
```

---

## 🔌 API 接口快速参考

### 获取资源列表
```bash
curl "http://localhost:3000/api/resources?subject=数学&grade=七上"
```

### 上传资源
```bash
curl -X POST http://localhost:3000/api/resources/upload \
  -F "file=@/path/to/file.pdf" \
  -F "title=七年级上册数学" \
  -F "subject=数学" \
  -F "grade=七上" \
  -F "description=包含知识点和习题" \
  -F "uploader=张老师"
```

### 下载资源
```bash
curl -O "http://localhost:3000/api/resources/{resource-id}/download"
```

详见 [API_DOCS.md](./API_DOCS.md)

---

## 💾 数据持久化

### 本地开发模式
- 上传的文件存储在 `public/uploads/` 目录
- 资源元数据存储在 `data/resources.json` 文件
- 重启服务器后数据不会丢失

### Docker 容器模式
- `public/uploads/` 和 `data/` 目录已配置为卷挂载
- 容器停止后数据仍然保留
- 可以在宿主机上直接访问这些目录

---

## 🔧 常见问题

### Q: 如何修改支持的学科或学段？

**A**: 编辑 `src/types/index.ts` 文件中的类型定义，然后在 `src/components/ResourceList.tsx` 和 `src/components/UploadForm.tsx` 中更新对应的常量数组。

### Q: 上传文件大小限制是多少？

**A**: 默认限制为 500MB。可以在 `src/app/api/resources/upload/route.ts` 中修改 `500 * 1024 * 1024` 这个值。

### Q: 如何备份数据？

**A**: 只需备份以下两个目录：
- `public/uploads/` - 上传的文件
- `data/` - 资源元数据

### Q: 如何在生产环境部署？

**A**: 使用 Docker Compose：
```bash
docker-compose up -d --build
```

然后配置反向代理（如 Nginx）指向 http://localhost:3000

### Q: 如何重置所有数据？

**A**: 删除以下目录和文件：
```bash
rm -rf public/uploads/*
rm -rf data/resources.json
```

---

## 🎨 自定义样式

项目使用 Tailwind CSS，你可以直接修改组件中的 `className` 来自定义样式。

### 修改主题色

编辑组件中的颜色类名：
- `from-blue-500` - 蓝色
- `from-green-500` - 绿色
- `from-indigo-600` - 靛蓝色

### 修改布局

编辑 `src/components/ResourceList.tsx` 中的网格布局：
```typescript
// 修改这一行来改变卡片数量
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
```

---

## 📚 扩展功能建议

以下是一些可以添加的功能：

1. **用户认证** - 添加登录/注册功能
2. **资源搜索** - 按标题或描述搜索
3. **资源评分** - 用户可以给资源评分
4. **评论功能** - 用户可以评论资源
5. **资源预览** - 在线预览 PDF 和图片
6. **批量上传** - 一次上传多个文件
7. **资源分享** - 生成分享链接
8. **统计分析** - 查看热门资源和下载统计
9. **权限管理** - 不同用户有不同权限
10. **全文搜索** - 使用 Elasticsearch 等搜索引擎

---

## 🐛 故障排除

### 问题: 服务器无法启动

**解决方案**:
1. 检查端口 3000 是否被占用：`lsof -i :3000`
2. 杀死占用端口的进程：`kill -9 <PID>`
3. 重新启动服务器

### 问题: 上传文件失败

**解决方案**:
1. 检查文件大小是否超过 500MB
2. 检查 `public/uploads/` 目录是否存在且有写权限
3. 查看浏览器控制台的错误信息

### 问题: Docker 容器无法启动

**解决方案**:
1. 检查 Docker 是否运行：`docker ps`
2. 查看容器日志：`docker-compose logs`
3. 检查端口 3000 是否被占用

---

## 📞 获取帮助

- 查看 [API_DOCS.md](./API_DOCS.md) 了解 API 接口
- 查看 [README_PROJECT.md](./README_PROJECT.md) 了解项目详情
- 检查浏览器控制台的错误信息
- 查看服务器日志

---

## ✨ 下一步

1. **测试上传功能** - 尝试上传一个测试文件
2. **测试筛选功能** - 尝试按学科和学段筛选
3. **测试下载功能** - 尝试下载一个资源
4. **自定义样式** - 根据需要修改颜色和布局
5. **部署到生产** - 使用 Docker Compose 部署

---

**祝你使用愉快！** 🎉

如有任何问题或建议，欢迎反馈。
