import { NextRequest, NextResponse } from 'next/server';
import { pool } from '@/lib/db';

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const subject = searchParams.get('subject');
    const grade = searchParams.get('grade');
    const uploader = searchParams.get('uploader');

    let query = `
      SELECT 
        id,
        title,
        subject,
        grade,
        uploader,
        user_id AS userId,
        file_name AS fileName,
        file_type AS fileType,
        file_size AS fileSize,
        download_count AS downloadCount,
        uploaded_at AS uploadedAt
      FROM resources
    `;
    const params: any[] = [];
    const conditions: string[] = [];

    if (subject) { conditions.push('subject = ?'); params.push(subject); }
    if (grade) { conditions.push('grade = ?'); params.push(grade); }
    if (uploader) { conditions.push('uploader LIKE ?'); params.push(`%${uploader}%`); }

    if (conditions.length > 0) {
      query += ' WHERE ' + conditions.join(' AND ');
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
