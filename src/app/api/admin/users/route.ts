import { NextRequest, NextResponse } from 'next/server';
import { getTokenFromRequest } from '@/lib/auth';
import { pool } from '@/lib/db';

export async function GET(request: NextRequest) {
  const user = getTokenFromRequest(request);
  if (!user || user.role !== 'admin') {
    return NextResponse.json({ success: false, message: '无权限' }, { status: 403 });
  }

  const [rows] = await pool.query(
    'SELECT id, email AS username, name AS displayName, role, created_at AS createdAt FROM users ORDER BY created_at DESC'
  );
  return NextResponse.json({ success: true, data: rows });
}
