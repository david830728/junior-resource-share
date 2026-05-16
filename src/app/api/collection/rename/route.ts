import { NextRequest, NextResponse } from 'next/server';
import { pool } from '@/lib/db';
import { getTokenFromRequest } from '@/lib/auth';

export async function PUT(request: NextRequest) {
  const user = getTokenFromRequest(request);
  if (!user) return NextResponse.json({ success: false, message: '请先登录' }, { status: 401 });

  const { collectionId, customName } = await request.json();
  if (!collectionId) return NextResponse.json({ success: false, message: '缺少 collectionId' }, { status: 400 });

  await pool.query(
    'UPDATE user_collections SET custom_name = ? WHERE id = ? AND user_id = ?',
    [customName || null, collectionId, user.id]
  );

  return NextResponse.json({ success: true });
}
