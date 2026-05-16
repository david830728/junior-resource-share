import { NextRequest, NextResponse } from 'next/server';
import { pool } from '@/lib/db';

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const subject = searchParams.get('subject');
    const semester = searchParams.get('semester');

    const conditions: string[] = [];
    const params: any[] = [];

    if (subject) { conditions.push('subject = ?'); params.push(subject); }
    if (semester) { conditions.push('semester = ?'); params.push(semester); }

    const where = conditions.length > 0 ? ' WHERE ' + conditions.join(' AND ') : '';

    const [rows] = await pool.query(
      `SELECT id, subject, semester, chapter_num AS chapterNum, chapter_title AS chapterTitle,
              section_num AS sectionNum, section_title AS sectionTitle,
              code, sort_order AS sortOrder, is_special AS isSpecial
       FROM textbook_chapters${where} ORDER BY sort_order ASC`,
      params
    );

    return NextResponse.json({ success: true, data: rows });
  } catch (error) {
    console.error('Fetch chapters error:', error);
    return NextResponse.json({ success: false, message: '获取章节失败' }, { status: 500 });
  }
}
