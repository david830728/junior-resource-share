import { NextRequest, NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import { getTokenFromRequest } from '@/lib/auth';
import { pool } from '@/lib/db';

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const currentUser = getTokenFromRequest(request);
  if (!currentUser || currentUser.role !== 'admin') {
    return NextResponse.json({ success: false, message: '无权限' }, { status: 403 });
  }

  const { id } = await params;
  const { newPassword } = await request.json();

  if (!newPassword || newPassword.length < 6) {
    return NextResponse.json({ success: false, message: '密码至少6位' }, { status: 400 });
  }

  const hash = await bcrypt.hash(newPassword, 10);
  await pool.query('UPDATE users SET password_hash = ? WHERE id = ?', [hash, id]);

  return NextResponse.json({ success: true });
}
