import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';
import { getUploadDir } from '@/lib/storage';
import { pool } from '@/lib/db';

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    
    // 查询资源信息
    const [rows] = await pool.query(
      `SELECT 
        id,
        title,
        file_name AS fileName,
        file_type AS fileType
      FROM resources WHERE id = ?`,
      [id]
    );

    const resource = (rows as any[])[0];

    if (!resource) {
      return NextResponse.json(
        { success: false, message: '资源不存在' },
        { status: 404 }
      );
    }

    const uploadDir = getUploadDir();
    const filePath = path.join(uploadDir, resource.fileName);

    // 检查文件是否存在
    if (!fs.existsSync(filePath)) {
      return NextResponse.json(
        { success: false, message: '文件不存在' },
        { status: 404 }
      );
    }

    // 更新下载计数
    await pool.query(
      'UPDATE resources SET download_count = download_count + 1 WHERE id = ?',
      [id]
    );

    // 读取文件
    const fileBuffer = fs.readFileSync(filePath);

    // 返回文件
    return new NextResponse(fileBuffer, {
      headers: {
        'Content-Type': 'application/octet-stream',
        'Content-Disposition': `attachment; filename="${encodeURIComponent(resource.title)}"`,
      },
    });
  } catch (error) {
    console.error('Download error:', error);
    return NextResponse.json(
      { success: false, message: '下载失败' },
      { status: 500 }
    );
  }
}
