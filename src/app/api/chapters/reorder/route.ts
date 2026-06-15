import { NextRequest, NextResponse } from 'next/server';
import { pool } from '@/lib/db';
import { getTokenFromRequest } from '@/lib/auth';

export async function PUT(request: NextRequest) {
  const user = getTokenFromRequest(request);
  if (!user || user.role !== 'admin') {
    return NextResponse.json({ success: false, message: '无权限' }, { status: 403 });
  }

  try {
    const { orderedIds } = await request.json();
    if (!Array.isArray(orderedIds) || orderedIds.length === 0) {
      return NextResponse.json({ success: false, message: '参数错误' }, { status: 400 });
    }

    const conn = await pool.getConnection();
    try {
      await conn.beginTransaction();
      for (let i = 0; i < orderedIds.length; i++) {
        await conn.query('UPDATE textbook_chapters SET sort_order = ? WHERE id = ?', [i + 1, orderedIds[i]]);
      }
      await conn.commit();
    } catch (e) {
      await conn.rollback();
      throw e;
    } finally {
      conn.release();
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Reorder chapters error:', error);
    return NextResponse.json({ success: false, message: '重排序失败' }, { status: 500 });
  }
}
