# 初中资源分享网站 - API 文档

## 基础信息

- **基础 URL**: `http://localhost:3000/api`
- **请求格式**: JSON / FormData
- **响应格式**: JSON

## 数据类型

### Subject（学科）
```
'语文' | '数学' | '英语' | '科学' | '历史' | '地理' | '道法'
```

### Grade（学段）
```
'七上' | '七下' | '八上' | '八下' | '九上' | '九下'
```

### FileType（文件类型）
```
'pdf' | 'ppt' | 'word' | 'video' | 'image' | 'other'
```

### Resource（资源对象）
```json
{
  "id": "uuid",
  "title": "资源标题",
  "subject": "学科",
  "grade": "学段",
  "description": "资源描述",
  "fileName": "存储的文件名",
  "fileType": "文件类型",
  "fileSize": 1024,
  "uploader": "上传者名称",
  "uploadedAt": "2024-01-01T00:00:00.000Z",
  "downloadCount": 0
}
```

## API 端点

### 1. 获取资源列表
**GET** `/resources`

#### 查询参数
| 参数 | 类型 | 必需 | 说明 |
|------|------|------|------|
| subject | string | 否 | 按学科筛选 |
| grade | string | 否 | 按学段筛选 |

#### 示例请求
```
GET /resources?subject=数学&grade=七上
```

#### 响应
```json
{
  "success": true,
  "data": [
    {
      "id": "uuid-1",
      "title": "七年级上册数学第一章",
      "subject": "数学",
      "grade": "七上",
      "description": "包含知识点总结和习题",
      "fileName": "1234567890-abc123.pdf",
      "fileType": "pdf",
      "fileSize": 2097152,
      "uploader": "张老师",
      "uploadedAt": "2024-01-01T10:00:00.000Z",
      "downloadCount": 5
    }
  ]
}
```

---

### 2. 获取单个资源详情
**GET** `/resources/{id}`

#### 路径参数
| 参数 | 类型 | 必需 | 说明 |
|------|------|------|------|
| id | string | 是 | 资源 ID |

#### 响应
```json
{
  "success": true,
  "data": {
    "id": "uuid-1",
    "title": "七年级上册数学第一章",
    "subject": "数学",
    "grade": "七上",
    "description": "包含知识点总结和习题",
    "fileName": "1234567890-abc123.pdf",
    "fileType": "pdf",
    "fileSize": 2097152,
    "uploader": "张老师",
    "uploadedAt": "2024-01-01T10:00:00.000Z",
    "downloadCount": 5
  }
}
```

---

### 3. 上传资源
**POST** `/resources/upload`

#### 请求体（FormData）
| 字段 | 类型 | 必需 | 说明 |
|------|------|------|------|
| file | File | 是 | 上传的文件（最大 500MB） |
| title | string | 是 | 资源标题 |
| subject | string | 是 | 学科 |
| grade | string | 是 | 学段 |
| description | string | 否 | 资源描述 |
| uploader | string | 是 | 上传者名称 |

#### 示例请求（使用 curl）
```bash
curl -X POST http://localhost:3000/api/resources/upload \
  -F "file=@/path/to/file.pdf" \
  -F "title=七年级上册数学第一章" \
  -F "subject=数学" \
  -F "grade=七上" \
  -F "description=包含知识点总结和习题" \
  -F "uploader=张老师"
```

#### 响应
```json
{
  "success": true,
  "data": {
    "id": "uuid-1",
    "title": "七年级上册数学第一章",
    "subject": "数学",
    "grade": "七上",
    "description": "包含知识点总结和习题",
    "fileName": "1234567890-abc123.pdf",
    "fileType": "pdf",
    "fileSize": 2097152,
    "uploader": "张老师",
    "uploadedAt": "2024-01-01T10:00:00.000Z",
    "downloadCount": 0
  },
  "message": "上传成功"
}
```

#### 错误响应
```json
{
  "success": false,
  "message": "文件过大，最大限制 500MB"
}
```

---

### 4. 下载资源
**GET** `/resources/{id}/download`

#### 路径参数
| 参数 | 类型 | 必需 | 说明 |
|------|------|------|------|
| id | string | 是 | 资源 ID |

#### 响应
- 返回文件二进制数据
- 自动增加资源的下载计数
- Content-Type: `application/octet-stream`
- Content-Disposition: `attachment; filename="资源标题"`

#### 示例请求
```bash
curl -O http://localhost:3000/api/resources/uuid-1/download
```

---

### 5. 删除资源
**DELETE** `/resources/{id}/delete`

#### 路径参数
| 参数 | 类型 | 必需 | 说明 |
|------|------|------|------|
| id | string | 是 | 资源 ID |

#### 响应
```json
{
  "success": true,
  "message": "删除成功"
}
```

#### 错误响应
```json
{
  "success": false,
  "message": "资源不存在"
}
```

#### 示例请求
```bash
curl -X DELETE http://localhost:3000/api/resources/uuid-1/delete
```

#### 说明
- 删除资源会同时删除文件和数据库记录
- 如果文件已被删除，仍会删除数据库记录
- 此操作无法撤销

---

## 错误处理

所有错误响应都遵循以下格式：

```json
{
  "success": false,
  "message": "错误描述"
}
```

### 常见错误码

| 状态码 | 说明 |
|--------|------|
| 400 | 请求参数错误 |
| 404 | 资源不存在 |
| 500 | 服务器错误 |

---

## 本地存储结构

```
project-root/
├── data/
│   └── resources.json          # 资源元数据数据库
├── public/
│   └── uploads/                # 上传的文件存储目录
│       ├── 1234567890-abc123.pdf
│       ├── 1234567891-def456.pptx
│       └── ...
```

### resources.json 格式
```json
[
  {
    "id": "uuid-1",
    "title": "资源标题",
    "subject": "数学",
    "grade": "七上",
    "description": "资源描述",
    "fileName": "1234567890-abc123.pdf",
    "fileType": "pdf",
    "fileSize": 2097152,
    "uploader": "上传者",
    "uploadedAt": "2024-01-01T10:00:00.000Z",
    "downloadCount": 5
  }
]
```

---

## 使用示例

### JavaScript/TypeScript

```typescript
import axios from 'axios';

// 获取资源列表
const getResources = async (subject?: string, grade?: string) => {
  const response = await axios.get('/api/resources', {
    params: { subject, grade }
  });
  return response.data.data;
};

// 上传资源
const uploadResource = async (formData: FormData) => {
  const response = await axios.post('/api/resources/upload', formData, {
    headers: { 'Content-Type': 'multipart/form-data' }
  });
  return response.data;
};

// 下载资源
const downloadResource = async (resourceId: string, title: string) => {
  const response = await axios.get(`/api/resources/${resourceId}/download`, {
    responseType: 'blob'
  });
  const url = window.URL.createObjectURL(new Blob([response.data]));
  const link = document.createElement('a');
  link.href = url;
  link.setAttribute('download', title);
  document.body.appendChild(link);
  link.click();
};
```

---

## 部署说明

### 本地开发运行
```bash
npm install --legacy-peer-deps
npm run dev
# 访问 http://localhost:3000
```

### Docker 运行
```bash
docker-compose up --build
# 访问 http://localhost:3000
```

### 文件持久化
- 上传的文件存储在 `public/uploads/` 目录
- 资源元数据存储在 `data/resources.json` 文件
- Docker 运行时，这两个目录已配置为卷挂载，确保数据持久化
