import fs from 'fs';
import path from 'path';

// 获取上传文件的存储目录
export function getUploadDir(): string {
  const uploadDir = path.join(process.cwd(), 'public', 'uploads');
  
  // 确保目录存在
  if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir, { recursive: true });
  }
  
  return uploadDir;
}

// 获取资源数据库文件路径
export function getResourcesDbPath(): string {
  const dataDir = path.join(process.cwd(), 'data');
  
  // 确保目录存在
  if (!fs.existsSync(dataDir)) {
    fs.mkdirSync(dataDir, { recursive: true });
  }
  
  return path.join(dataDir, 'resources.json');
}

// 读取所有资源
export function readResources() {
  const dbPath = getResourcesDbPath();
  
  if (!fs.existsSync(dbPath)) {
    return [];
  }
  
  try {
    const data = fs.readFileSync(dbPath, 'utf-8');
    return JSON.parse(data);
  } catch (error) {
    console.error('Error reading resources:', error);
    return [];
  }
}

// 保存资源
export function saveResources(resources: any[]) {
  const dbPath = getResourcesDbPath();
  fs.writeFileSync(dbPath, JSON.stringify(resources, null, 2));
}

// 生成唯一的文件名
export function generateFileName(originalFileName: string): string {
  const timestamp = Date.now();
  const random = Math.random().toString(36).substring(2, 15);
  const ext = path.extname(originalFileName);
  return `${timestamp}-${random}${ext}`;
}

// 获取文件类型
export function getFileType(fileName: string): string {
  if (!fileName) return 'other';
  const ext = path.extname(fileName).toLowerCase();
  
  const typeMap: { [key: string]: string } = {
    // PDF
    '.pdf': 'pdf',
    
    // PowerPoint
    '.ppt': 'ppt',
    '.pptx': 'ppt',
    '.pptm': 'ppt',
    '.pps': 'ppt',
    '.ppsx': 'ppt',
    
    // Word
    '.doc': 'word',
    '.docx': 'word',
    '.docm': 'word',
    '.dot': 'word',
    '.dotx': 'word',
    
    // Excel
    '.xls': 'excel',
    '.xlsx': 'excel',
    '.xlsm': 'excel',
    '.xlt': 'excel',
    '.xltx': 'excel',
    '.csv': 'excel',
    
    // Video
    '.mp4': 'video',
    '.avi': 'video',
    '.mov': 'video',
    '.webm': 'video',
    '.flv': 'video',
    '.wmv': 'video',
    '.mkv': 'video',
    '.3gp': 'video',
    
    // Image
    '.jpg': 'image',
    '.jpeg': 'image',
    '.png': 'image',
    '.gif': 'image',
    '.webp': 'image',
    '.bmp': 'image',
    '.svg': 'image',
    '.tiff': 'image',
    '.tif': 'image',
  };
  
  return typeMap[ext] || 'other';
}
