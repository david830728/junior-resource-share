import { NextRequest, NextResponse } from 'next/server';
import { pool } from '@/lib/db';
import { getTokenFromRequest } from '@/lib/auth';

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const user = getTokenFromRequest(request);
  if (!user || user.role !== 'admin') {
    return NextResponse.json({ success: false, message: '无权限' }, { status: 403 });
  }

  const { id } = await params;
  const chapterId = Number(id);

  try {
    const body = await request.json();
    const { chapterTitle, sectionTitle, code, sortOrder } = body;

    if (chapterTitle !== undefined) {
      const [rows] = await pool.query(
        'SELECT subject, semester, chapter_num FROM textbook_chapters WHERE id = ?',
        [chapterId]
      ) as any[];
      if (rows.length === 0) {
        return NextResponse.json({ success: false, message: '章节不存在' }, { status: 404 });
      }
      const { subject, semester, chapter_num } = rows[0];
      if (chapter_num !== null) {
        await pool.query(
          'UPDATE textbook_chapters SET chapter_title = ? WHERE subject = ? AND semester = ? AND chapter_num = ?',
          [chapterTitle, subject, semester, chapter_num]
        );
      }
    }

    const updates: string[] = [];
    const updateParams: any[] = [];
    if (sectionTitle !== undefined) { updates.push('section_title = ?'); updateParams.push(sectionTitle); }
    if (code !== undefined) { updates.push('code = ?'); updateParams.push(code); }
    if (sortOrder !== undefined) { updates.push('sort_order = ?'); updateParams.push(sortOrder); }

    if (updates.length > 0) {
      updateParams.push(chapterId);
      await pool.query(
        `UPDATE textbook_chapters SET ${updates.join(', ')} WHERE id = ?`,
        updateParams
      );
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Update chapter error:', error);
    return NextResponse.json({ success: false, message: '更新失败' }, { status: 500 });
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const user = getTokenFromRequest(request);
  if (!user || user.role !== 'admin') {
    return NextResponse.json({ success: false, message: '无权限' }, { status: 403 });
  }

  const { id } = await params;
  const chapterId = Number(id);

  try {
    const [countRows] = await pool.query(
      'SELECT COUNT(*) AS cnt FROM resources WHERE chapter_id = ?',
      [chapterId]
    ) as any[];
    const affectedResources = Number(countRows[0]?.cnt ?? 0);

    await pool.query('UPDATE resources SET chapter_id = NULL WHERE chapter_id = ?', [chapterId]);
    await pool.query('DELETE FROM textbook_chapters WHERE id = ?', [chapterId]);

    return NextResponse.json({ success: true, affectedResources });
  } catch (error) {
    console.error('Delete chapter error:', error);
    return NextResponse.json({ success: false, message: '删除失败' }, { status: 500 });
  }
}
