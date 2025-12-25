import { NextRequest, NextResponse } from 'next/server';
import { pool } from '@/lib/db';

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const subject = searchParams.get('subject');
    const grade = searchParams.get('grade');

    let query = `
      SELECT 
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
      FROM resources
    `;
    const params: any[] = [];

    // 按学科和学段筛选
    if (subject || grade) {
      query += ' WHERE';
      if (subject) {
        query += ' subject = ?';
        params.push(subject);
        if (grade) query += ' AND';
      }
      if (grade) {
        query += ' grade = ?';
        params.push(grade);
      }
    }

    // 按上传时间倒序排列
    query += ' ORDER BY uploaded_at DESC';

    const [rows] = await pool.query(query, params);
    const resources = rows as any[];

    return NextResponse.json(
      { success: true, data: resources },
      { status: 200 }
    );
  } catch (error) {
    console.error('Fetch resources error:', error);
    return NextResponse.json(
      { success: false, message: '获取资源失败' },
      { status: 500 }
    );
  }
}
