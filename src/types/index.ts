// 学科类型
export type Subject = '语文' | '数学' | '英语' | '科学' | '历史' | '地理' | '道法';

// 学段类型
export type Grade = '七上' | '七下' | '八上' | '八下' | '九上' | '九下';

// 文件类型
export type FileType = 'pdf' | 'ppt' | 'word' | 'excel' | 'video' | 'image' | 'other';

// 评论接口
export interface Comment {
  id: string;
  resourceId: string;
  author: string;
  content: string;
  rating: number; // 1-5
  createdAt: string;
}

// 资源接口
export interface Resource {
  id: string;
  title: string;
  subject: Subject;
  grade: Grade;
  description: string;
  fileName: string;
  fileType: FileType;
  fileSize: number;
  uploader: string;
  uploadedAt: string;
  downloadCount: number;
  averageRating?: number;
  commentCount?: number;
}

// 上传请求体
export interface UploadRequest {
  title: string;
  subject: Subject;
  grade: Grade;
  description: string;
  uploader: string;
}

// API 响应
export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  message?: string;
}
