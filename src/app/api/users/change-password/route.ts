import { NextRequest, NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import { getTokenFromRequest } from '@/lib/auth';
import { pool } from '@/lib/db';

export async function PUT(request: NextRequest) {
  const currentUser = getTokenFromRequest(request);
  if (!currentUser) {
    return NextResponse.json({ success: false, message: '未登录' }, { status: 401 });
  }

  const { currentPassword, newPassword } = await request.json();

  if (!currentPassword || !newPassword) {
    return NextResponse.json({ success: false, message: '参数缺失' }, { status: 400 });
  }
  if (newPassword.length < 6) {
    return NextResponse.json({ success: false, message: '新密码至少6位' }, { status: 400 });
  }

  const [rows] = await pool.query('SELECT password_hash FROM users WHERE id = ?', [currentUser.id]) as any;
  if (!rows.length) {
    return NextResponse.json({ success: false, message: '用户不存在' }, { status: 404 });
  }

  const valid = await bcrypt.compare(currentPassword, rows[0].password_hash);
  if (!valid) {
    return NextResponse.json({ success: false, message: '当前密码错误' }, { status: 400 });
  }

  const hash = await bcrypt.hash(newPassword, 10);
  await pool.query('UPDATE users SET password_hash = ? WHERE id = ?', [hash, currentUser.id]);

  return NextResponse.json({ success: true });
}
