import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';
import { getUploadDir, generateFileName, getFileType } from '@/lib/storage';
import { pool } from '@/lib/db';

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const file = formData.get('file') as File;
    const title = formData.get('title') as string;
    const subject = formData.get('subject') as string;
    const grade = formData.get('grade') as string;
    const description = formData.get('description') as string;
    const uploader = formData.get('uploader') as string;

    // 验证必填字段
    if (!file || !title || !subject || !grade || !uploader) {
      return NextResponse.json(
        { success: false, message: '缺少必填字段' },
        { status: 400 }
      );
    }

    // 验证文件大小（限制 500MB）
    if (file.size > 500 * 1024 * 1024) {
      return NextResponse.json(
        { success: false, message: '文件过大，最大限制 500MB' },
        { status: 400 }
      );
    }

    // 生成唯一文件名
    const fileName = generateFileName(file.name);
    const uploadDir = getUploadDir();
    const filePath = path.join(uploadDir, fileName);

    // 保存文件
    const bytes = await file.arrayBuffer();
    fs.writeFileSync(filePath, Buffer.from(bytes));

    // 转换日期时间格式为MySQL可接受的格式：YYYY-MM-DD HH:MM:SS
    const mysqlDateTime = new Date().toISOString().slice(0, 19).replace('T', ' ');

    // 保存到MySQL数据库
    const [result] = await pool.query(
      `INSERT INTO resources (
        title, description, subject, grade, uploader, 
        file_name, file_type, file_size, download_count, uploaded_at
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        title,
        description || '',
        subject,
        grade,
        uploader,
        fileName,
        getFileType(file.name),
        file.size,
        0,
        mysqlDateTime
      ]
    );

    // 查询新创建的资源记录
    const [rows] = await pool.query(
      `SELECT 
        id,
        title,
        subject,
        grade,
        uploader,
        file_name AS fileName,
        file_type AS fileType,
        file_size AS fileSize,
        download_count AS downloadCount,
        uploaded_at AS uploadedAt
      FROM resources WHERE id = ?`,
      [(result as any).insertId]
    );

    const resource = (rows as any[])[0];

    return NextResponse.json(
      { success: true, data: resource, message: '上传成功' },
      { status: 201 }
    );
  } catch (error) {
    console.error('Upload error:', error);
    return NextResponse.json(
      { success: false, message: '上传失败' },
      { status: 500 }
    );
  }
}
