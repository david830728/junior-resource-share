import { NextRequest, NextResponse } from 'next/server';
import { pool } from '@/lib/db';
import { getTokenFromRequest } from '@/lib/auth';

export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const user = getTokenFromRequest(request);
  if (!user) return NextResponse.json({ success: false, message: '请先登录' }, { status: 401 });

  const { id } = await params;
  const { description } = await request.json();

  const [rows] = await pool.query('SELECT user_id FROM resources WHERE id = ?', [id]) as any;
  if (!rows.length) return NextResponse.json({ success: false, message: '资源不存在' }, { status: 404 });
  if (rows[0].user_id !== user.id && user.role !== 'admin') {
    return NextResponse.json({ success: false, message: '无权限' }, { status: 403 });
  }

  await pool.query('UPDATE resources SET description = ? WHERE id = ?', [description ?? '', id]);
  return NextResponse.json({ success: true });
}
