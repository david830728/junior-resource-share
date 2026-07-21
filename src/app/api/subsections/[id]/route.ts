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
  try {
    const body = await request.json();
    const { title, code, sortOrder } = body;
    const updates: string[] = [];
    const values: any[] = [];
    if (title !== undefined) { updates.push('title = ?'); values.push(title); }
    if (code !== undefined) { updates.push('code = ?'); values.push(code); }
    if (sortOrder !== undefined) { updates.push('sort_order = ?'); values.push(sortOrder); }
    if (updates.length === 0) {
      return NextResponse.json({ success: false, message: '无可更新字段' }, { status: 400 });
    }
    values.push(Number(id));
    await pool.query(`UPDATE textbook_subsections SET ${updates.join(', ')} WHERE id = ?`, values);
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Update subsection error:', error);
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
  const subsectionId = Number(id);
  try {
    const [countRows] = await pool.query(
      'SELECT COUNT(*) AS cnt FROM resources WHERE subsection_id = ?',
      [subsectionId]
    ) as any[];
    const affectedResources = Number(countRows[0]?.cnt ?? 0);
    const [childRows] = await pool.query('SELECT id FROM textbook_subsections WHERE parent_id = ?', [subsectionId]) as any[];
    for (const child of childRows) {
      await pool.query('UPDATE resources SET subsection_id = NULL WHERE subsection_id = ?', [child.id]);
    }
    await pool.query('DELETE FROM textbook_subsections WHERE parent_id = ?', [subsectionId]);
    await pool.query('UPDATE resources SET subsection_id = NULL WHERE subsection_id = ?', [subsectionId]);
    await pool.query('DELETE FROM textbook_subsections WHERE id = ?', [subsectionId]);
    return NextResponse.json({ success: true, affectedResources });
  } catch (error) {
    console.error('Delete subsection error:', error);
    return NextResponse.json({ success: false, message: '删除失败' }, { status: 500 });
  }
}
