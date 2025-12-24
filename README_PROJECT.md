# 初中资源分享网站

一个现代化的初中教学资源分享平台，支持多学科、多学段的资源上传、下载和管理。

## 🎯 功能特性

- ✅ **多学科分类**: 语文、数学、英语、科学、历史、地理、道法
- ✅ **多学段分类**: 七上、七下、八上、八下、九上、九下
- ✅ **资源上传**: 支持 PDF、PPT、Word、视频、图片等多种格式
- ✅ **资源下载**: 快速下载，自动统计下载次数
- ✅ **智能筛选**: 按学科和学段组合筛选资源
- ✅ **本地存储**: 无需第三方云服务，文件存储在本地
- ✅ **响应式设计**: 完美适配桌面和移动设备
- ✅ **容器化部署**: 支持 Docker 和 Orbstack 部署

## 🛠️ 技术栈

- **前端**: React 19 + Next.js 16 + TypeScript + Tailwind CSS
- **后端**: Next.js API Routes
- **存储**: 本地文件系统 + JSON 数据库
- **容器**: Docker + docker-compose
- **UI 组件**: Lucide React 图标库

## 📁 项目结构

```
junior-resource-share/
├── src/
│   ├── app/
│   │   ├── api/
│   │   │   └── resources/
│   │   │       ├── route.ts              # 获取资源列表
│   │   │       ├── upload/
│   │   │       │   └── route.ts          # 上传资源
│   │   │       └── [id]/
│   │   │           ├── route.ts          # 获取资源详情
│   │   │           └── download/
│   │   │               └── route.ts      # 下载资源
│   │   ├── layout.tsx
│   │   └── page.tsx                      # 主页面
│   ├── components/
│   │   ├── ResourceList.tsx              # 资源列表组件
│   │   └── UploadForm.tsx                # 上传表单组件
│   ├── lib/
│   │   └── storage.ts                    # 文件存储工具函数
│   └── types/
│       └── index.ts                      # TypeScript 类型定义
├── public/
│   └── uploads/                          # 上传文件存储目录
├── data/
│   └── resources.json                    # 资源元数据数据库
├── Dockerfile                            # Docker 镜像配置
├── docker-compose.yml                    # Docker Compose 配置
├── API_DOCS.md                           # API 文档
└── package.json
```

## 🚀 快速开始

### 前置要求

- Node.js 20+
- npm 或 yarn
- Docker & Docker Compose（可选，用于容器化部署）

### 本地开发

1. **进入项目目录**
   ```bash
   cd /Users/david/CascadeProjects/junior-resource-share
   ```

2. **安装依赖**
   ```bash
   npm install --legacy-peer-deps
   ```

3. **启动开发服务器**
   ```bash
   npm run dev
   ```

4. **打开浏览器**
   访问 `http://localhost:3000`

### Docker 部署

1. **构建并运行容器**
   ```bash
   docker-compose up --build
   ```

2. **访问应用**
   访问 `http://localhost:3000`

3. **停止容器**
   ```bash
   docker-compose down
   ```

## 📖 使用指南

### 上传资源

1. 点击右下角的 **"上传资源"** 按钮
2. 选择要上传的文件（支持 PDF、PPT、Word、视频、图片等）
3. 填写资源信息：
   - **标题**: 资源的名称
   - **学科**: 选择所属学科
   - **学段**: 选择所属学段
   - **描述**: 简要描述资源内容（可选）
   - **上传者**: 你的名字或昵称
4. 点击 **"上传"** 按钮

### 浏览和下载资源

1. 在主页面查看所有资源
2. 使用筛选器按学科和学段筛选资源
3. 点击资源卡片上的 **"下载"** 按钮下载文件

## 🔌 API 接口

详见 [API_DOCS.md](./API_DOCS.md)

### 主要端点

- `GET /api/resources` - 获取资源列表
- `POST /api/resources/upload` - 上传资源
- `GET /api/resources/{id}` - 获取资源详情
- `GET /api/resources/{id}/download` - 下载资源

## 📊 数据存储

### 文件存储
- 上传的文件存储在 `public/uploads/` 目录
- 文件名采用时间戳 + 随机字符串的方式生成，避免重名

### 元数据存储
- 资源元数据存储在 `data/resources.json` 文件
- 采用 JSON 格式，易于备份和迁移

## 🔒 安全特性

- ✅ 文件大小限制（最大 500MB）
- ✅ 文件类型验证
- ✅ 表单数据验证
- ✅ 错误处理和日志记录

## 📝 开发笔记

### 添加新的学科或学段

编辑 `src/types/index.ts` 中的 `Subject` 和 `Grade` 类型定义：

```typescript
export type Subject = '语文' | '数学' | '英语' | '科学' | '历史' | '地理' | '道法' | '新学科';
export type Grade = '七上' | '七下' | '八上' | '八下' | '九上' | '九下' | '新学段';
```

然后在 `src/components/ResourceList.tsx` 和 `src/components/UploadForm.tsx` 中更新对应的常量数组。

### 自定义样式

项目使用 Tailwind CSS，可以直接在组件中修改 className 来自定义样式。

### 扩展功能建议

- [ ] 添加用户认证系统
- [ ] 实现资源搜索功能
- [ ] 添加资源评分和评论
- [ ] 实现资源分享功能
- [ ] 添加资源预览功能
- [ ] 实现批量上传
- [ ] 添加资源分类管理后台

## 🐛 故障排除

### 上传失败

- 检查文件大小是否超过 500MB
- 确保网络连接正常
- 查看浏览器控制台的错误信息

### 下载失败

- 确保文件仍然存在于 `public/uploads/` 目录
- 检查文件权限
- 查看服务器日志

### 容器启动失败

- 确保 Docker 已安装并运行
- 检查端口 3000 是否被占用
- 查看 Docker 日志：`docker-compose logs`

## 📞 支持

如有问题或建议，请提出 Issue 或 Pull Request。

## 📄 许可证

MIT License

---

**最后更新**: 2024 年 12 月
