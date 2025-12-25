import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

export async function GET(req: NextRequest, { params }: { params: Promise<{ path: string[] }> }) {
  // 解包 params Promise
  const resolvedParams = await params;
  try {
    // 获取请求的文件名（合并多级路径）
    const fileName = resolvedParams.path.join('/');
    // 解析文件路径
    const filePath = path.join(process.cwd(), 'public', 'uploads', fileName);
    
    // 验证文件是否存在
    if (!fs.existsSync(filePath) || !fs.statSync(filePath).isFile()) {
      return NextResponse.json({ error: 'File not found' }, { status: 404 });
    }
    
    // 读取文件内容
    const fileContent = fs.readFileSync(filePath);
    // 获取 MIME 类型
    const mimeType = getMimeType(fileName);
    
    // 返回文件响应
    return new NextResponse(fileContent, {
      headers: {
        'Content-Type': mimeType || 'application/octet-stream',
        'Content-Disposition': `inline; filename="${encodeURIComponent(fileName)}"`,
      },
    });
  } catch (error) {
    console.error('Error serving file:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

// MIME 类型检测
function getMimeType(fileName: string): string | undefined {
  const ext = path.extname(fileName).toLowerCase();
  const mimeMap: Record<string, string> = {
    '.pdf': 'application/pdf',
    '.mp4': 'video/mp4',
    '.avi': 'video/x-msvideo',
    '.mov': 'video/quicktime',
    '.webm': 'video/webm',
    '.flv': 'video/x-flv',
    '.wmv': 'video/x-ms-wmv',
    '.mkv': 'video/x-matroska',
    '.jpg': 'image/jpeg',
    '.jpeg': 'image/jpeg',
    '.png': 'image/png',
    '.gif': 'image/gif',
    '.webp': 'image/webp',
    '.bmp': 'image/bmp',
    '.svg': 'image/svg+xml',
    '.tiff': 'image/tiff',
    '.tif': 'image/tiff',
    '.doc': 'application/msword',
    '.docx': 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
    '.docm': 'application/vnd.ms-word.document.macroEnabled.12',
    '.dot': 'application/msword',
    '.dotx': 'application/vnd.openxmlformats-officedocument.wordprocessingml.template',
    '.ppt': 'application/vnd.ms-powerpoint',
    '.pptx': 'application/vnd.openxmlformats-officedocument.presentationml.presentation',
    '.pptm': 'application/vnd.ms-powerpoint.presentation.macroEnabled.12',
    '.pps': 'application/vnd.ms-powerpoint',
    '.ppsx': 'application/vnd.openxmlformats-officedocument.presentationml.slideshow',
    '.xls': 'application/vnd.ms-excel',
    '.xlsx': 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
    '.xlsm': 'application/vnd.ms-excel.sheet.macroEnabled.12',
    '.xlt': 'application/vnd.ms-excel',
    '.xltx': 'application/vnd.openxmlformats-officedocument.spreadsheetml.template',
    '.csv': 'text/csv',
    '.txt': 'text/plain',
  };
  return mimeMap[ext];
}