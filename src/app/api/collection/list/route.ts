import { NextRequest, NextResponse } from 'next/server';
import { pool } from '@/lib/db';
import { getTokenFromRequest } from '@/lib/auth';

export async function GET(request: NextRequest) {
  const user = getTokenFromRequest(request);
  if (!user) return NextResponse.json({ success: false, message: '请先登录' }, { status: 401 });

  const [rows] = await pool.query(
    `SELECT
       uc.id AS collectionId,
       uc.resource_id AS resourceId,
       uc.custom_name AS customName,
       uc.sort_order AS sortOrder,
       r.title,
       r.subject,
       r.grade,
       r.file_size AS fileSize,
       r.uploader,
       r.description,
       r.difficulty,
       r.chapter_id AS chapterId,
       r.pdf_path AS pdfPath,
       r.file_name AS fileName,
       r.file_type AS fileType
     FROM user_collections uc
     JOIN resources r ON r.id = uc.resource_id
     WHERE uc.user_id = ?
     ORDER BY uc.sort_order ASC`,
    [user.id]
  );

  return NextResponse.json({ success: true, data: rows });
}
