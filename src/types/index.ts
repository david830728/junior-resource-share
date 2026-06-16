// 学科类型
export type Subject = '语文' | '数学' | '英语' | '科学' | '历史' | '地理' | '道法';

// 学段类型
export type Grade = '七上' | '七下' | '八上' | '八下' | '九上' | '九下';

// 文件类型
export type FileType = 'pdf' | 'ppt' | 'word' | 'excel' | 'video' | 'image' | 'other';

// 难度类型
export type Difficulty = '基础' | '提高' | '拓展';

// 评论接口
export interface Comment {
  id: string;
  resourceId: string;
  author: string;
  userId?: number;
  parentId?: number | null;
  content: string;
  rating: number; // 1-5
  createdAt: string;
  replies?: Comment[];
}

// 资源接口
export interface Resource {
  id: string;
  title: string;
  subject: Subject;
  grade: Grade;
  description?: string;
  fileName: string;
  fileType: FileType;
  fileSize: number;
  uploader: string;
  userId?: number;
  uploadedAt: string;
  downloadCount: number;
  chapterId?: number;
  subsectionId?: number | null;
  difficulty?: Difficulty;
  pdfPath?: string;
  averageRating?: number;
  commentCount?: number;
}

// 章节接口
export interface TextbookChapter {
  id: number;
  subject: string;
  semester: string;
  chapterNum: number | null;
  chapterTitle: string | null;
  sectionNum: number | null;
  sectionTitle: string;
  code: string | null;
  sortOrder: number;
  isSpecial: boolean;
}

// 细目接口
export interface TextbookSubsection {
  id: number;
  chapterId: number;
  title: string;
  code: string | null;
  sortOrder: number;
}

// 收藏条目接口
export interface CollectionItem {
  collectionId: number;
  resourceId: number;
  customName: string | null;
  sortOrder: number;
  title: string;
  subject: string;
  grade: string;
  fileSize: number;
  uploader: string;
  description?: string;
  difficulty: Difficulty;
  chapterId?: number;
  pdfPath?: string;
  fileName: string;
  fileType: string;
}

// 上传请求体
export interface UploadRequest {
  title: string;
  subject: Subject;
  grade: Grade;
  description: string;
  chapterId?: number;
  difficulty: Difficulty;
}

// API 响应
export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  message?: string;
}
