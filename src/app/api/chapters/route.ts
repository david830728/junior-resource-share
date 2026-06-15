import { NextRequest, NextResponse } from 'next/server';
import { pool } from '@/lib/db';
import { getTokenFromRequest } from '@/lib/auth';

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const subject = searchParams.get('subject');
    const semester = searchParams.get('semester');

    if (!subject) {
      const [rows] = await pool.query(
        `SELECT id, subject, semester, chapter_num AS chapterNum, chapter_title AS chapterTitle,
                section_num AS sectionNum, section_title AS sectionTitle,
                code, sort_order AS sortOrder, is_special AS isSpecial
         FROM textbook_chapters ORDER BY subject, semester, sort_order ASC`
      ) as any[];
      const grouped: Record<string, Record<string, any[]>> = {};
      for (const row of rows) {
        if (!grouped[row.subject]) grouped[row.subject] = {};
        if (!grouped[row.subject][row.semester]) grouped[row.subject][row.semester] = [];
        grouped[row.subject][row.semester].push(row);
      }
      return NextResponse.json({ success: true, data: grouped });
    }

    const conditions: string[] = ['subject = ?'];
    const params: any[] = [subject];

    if (semester) { conditions.push('semester = ?'); params.push(semester); }

    const where = ' WHERE ' + conditions.join(' AND ');

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

export async function POST(request: NextRequest) {
  const user = getTokenFromRequest(request);
  if (!user || user.role !== 'admin') {
    return NextResponse.json({ success: false, message: '无权限' }, { status: 403 });
  }

  try {
    const body = await request.json();
    const { subject, semester, chapterNum, chapterTitle, sectionNum, sectionTitle, code, isSpecial } = body;

    if (!subject || !semester || !sectionTitle) {
      return NextResponse.json({ success: false, message: '缺少必要字段' }, { status: 400 });
    }

    const [maxRows] = await pool.query(
      'SELECT COALESCE(MAX(sort_order), 0) AS maxOrder FROM textbook_chapters WHERE subject = ? AND semester = ?',
      [subject, semester]
    ) as any[];
    const sortOrder = (maxRows[0]?.maxOrder ?? 0) + 1;

    const [result] = await pool.query(
      `INSERT INTO textbook_chapters (subject, semester, chapter_num, chapter_title, section_num, section_title, code, sort_order, is_special)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [subject, semester, chapterNum ?? null, chapterTitle ?? null, sectionNum ?? null, sectionTitle, code ?? null, sortOrder, isSpecial ? 1 : 0]
    ) as any[];

    return NextResponse.json({ success: true, id: result.insertId });
  } catch (error) {
    console.error('Create chapter error:', error);
    return NextResponse.json({ success: false, message: '创建章节失败' }, { status: 500 });
  }
}
