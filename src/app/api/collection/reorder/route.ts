import { NextRequest, NextResponse } from 'next/server';
import { pool } from '@/lib/db';
import { getTokenFromRequest } from '@/lib/auth';

export async function PUT(request: NextRequest) {
  const user = getTokenFromRequest(request);
  if (!user) return NextResponse.json({ success: false, message: '请先登录' }, { status: 401 });

  const { orderedIds } = await request.json();
  if (!Array.isArray(orderedIds)) return NextResponse.json({ success: false, message: '参数错误' }, { status: 400 });

  const updates = orderedIds.map((id: number, idx: number) =>
    pool.query(
      'UPDATE user_collections SET sort_order = ? WHERE id = ? AND user_id = ?',
      [idx + 1, id, user.id]
    )
  );
  await Promise.all(updates);

  return NextResponse.json({ success: true });
}
