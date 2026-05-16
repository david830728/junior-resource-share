import { NextRequest, NextResponse } from 'next/server';
import { pool } from '@/lib/db';
import { getTokenFromRequest } from '@/lib/auth';

export async function DELETE(request: NextRequest) {
  const user = getTokenFromRequest(request);
  if (!user) return NextResponse.json({ success: false, message: '请先登录' }, { status: 401 });

  const { resourceId } = await request.json();
  if (!resourceId) return NextResponse.json({ success: false, message: '缺少 resourceId' }, { status: 400 });

  await pool.query(
    'DELETE FROM user_collections WHERE user_id = ? AND resource_id = ?',
    [user.id, resourceId]
  );

  return NextResponse.json({ success: true });
}
