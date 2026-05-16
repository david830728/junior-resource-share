import { NextRequest, NextResponse } from 'next/server';
import { pool } from '@/lib/db';
import { getTokenFromRequest } from '@/lib/auth';

export async function POST(request: NextRequest) {
  const user = getTokenFromRequest(request);
  if (!user) return NextResponse.json({ success: false, message: '请先登录' }, { status: 401 });

  const { resourceId } = await request.json();
  if (!resourceId) return NextResponse.json({ success: false, message: '缺少 resourceId' }, { status: 400 });

  try {
    const [[maxRow]] = await pool.query(
      'SELECT COALESCE(MAX(sort_order), 0) AS maxOrder FROM user_collections WHERE user_id = ?',
      [user.id]
    ) as any;

    const [result] = await pool.query(
      'INSERT INTO user_collections (user_id, resource_id, sort_order) VALUES (?, ?, ?)',
      [user.id, resourceId, (maxRow.maxOrder as number) + 1]
    ) as any;

    return NextResponse.json({ success: true, collectionId: result.insertId });
  } catch (err: any) {
    if (err.code === 'ER_DUP_ENTRY') {
      return NextResponse.json({ success: false, message: '已经收藏过该资源' }, { status: 409 });
    }
    console.error('Collection add error:', err);
    return NextResponse.json({ success: false, message: '收藏失败' }, { status: 500 });
  }
}
