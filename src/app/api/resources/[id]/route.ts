import { NextRequest, NextResponse } from 'next/server';
import { pool } from '@/lib/db';

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const [rows] = await pool.query(
      `SELECT 
        id,
        title,
        description,
        subject,
        grade,
        uploader,
        file_name AS fileName,
        file_type AS fileType,
        file_size AS fileSize,
        download_count AS downloadCount,
        uploaded_at AS uploadedAt
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

    return NextResponse.json(
      { success: true, data: resource },
      { status: 200 }
    );
  } catch (error) {
    console.error('Fetch resource error:', error);
    return NextResponse.json(
      { success: false, message: '获取资源失败' },
      { status: 500 }
    );
  }
}
