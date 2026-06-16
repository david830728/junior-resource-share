import { NextRequest, NextResponse } from 'next/server';
import { pool } from '@/lib/db';
import { getTokenFromRequest } from '@/lib/auth';

export async function GET(request: NextRequest) {
  try {
    const chapterId = request.nextUrl.searchParams.get('chapterId');
    if (!chapterId) {
      return NextResponse.json({ success: false, message: '缺少 chapterId' }, { status: 400 });
    }
    const [rows] = await pool.query(
      `SELECT id, chapter_id AS chapterId, title, code, sort_order AS sortOrder
       FROM textbook_subsections WHERE chapter_id = ? ORDER BY sort_order ASC`,
      [Number(chapterId)]
    );
    return NextResponse.json({ success: true, data: rows });
  } catch (error) {
    console.error('Fetch subsections error:', error);
    return NextResponse.json({ success: false, message: '获取细目失败' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  const user = getTokenFromRequest(request);
  if (!user || user.role !== 'admin') {
    return NextResponse.json({ success: false, message: '无权限' }, { status: 403 });
  }
  try {
    const { chapterId, title, code } = await request.json();
    if (!chapterId || !title) {
      return NextResponse.json({ success: false, message: '缺少必要字段' }, { status: 400 });
    }
    const [maxRows] = await pool.query(
      'SELECT COALESCE(MAX(sort_order), 0) AS maxOrder FROM textbook_subsections WHERE chapter_id = ?',
      [chapterId]
    ) as any[];
    const sortOrder = (maxRows[0]?.maxOrder ?? 0) + 1;
    const [result] = await pool.query(
      'INSERT INTO textbook_subsections (chapter_id, title, code, sort_order) VALUES (?, ?, ?, ?)',
      [chapterId, title, code ?? null, sortOrder]
    ) as any[];
    return NextResponse.json({ success: true, id: result.insertId });
  } catch (error) {
    console.error('Create subsection error:', error);
    return NextResponse.json({ success: false, message: '创建细目失败' }, { status: 500 });
  }
}
