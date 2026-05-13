import { NextRequest, NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import { getTokenFromRequest } from '@/lib/auth';
import { pool } from '@/lib/db';

export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const currentUser = getTokenFromRequest(request);
  if (!currentUser || currentUser.role !== 'admin') {
    return NextResponse.json({ success: false, message: '无权限' }, { status: 403 });
  }

  const { id } = await params;
  const body = await request.json();
  const { role, password } = body;

  const updates: string[] = [];
  const values: any[] = [];

  if (role) {
    updates.push('role = ?');
    values.push(role);
  }
  if (password) {
    if (password.length < 6) {
      return NextResponse.json({ success: false, message: '密码至少6位' }, { status: 400 });
    }
    updates.push('password_hash = ?');
    values.push(await bcrypt.hash(password, 10));
  }

  if (updates.length === 0) {
    return NextResponse.json({ success: false, message: '没有可更新的字段' }, { status: 400 });
  }

  values.push(id);
  await pool.query(`UPDATE users SET ${updates.join(', ')} WHERE id = ?`, values);
  return NextResponse.json({ success: true, message: '更新成功' });
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const currentUser = getTokenFromRequest(request);
  if (!currentUser || currentUser.role !== 'admin') {
    return NextResponse.json({ success: false, message: '无权限' }, { status: 403 });
  }

  const { id } = await params;

  if (String(currentUser.id) === String(id)) {
    return NextResponse.json({ success: false, message: '不能删除自己的账号' }, { status: 400 });
  }

  await pool.query('DELETE FROM users WHERE id = ?', [id]);
  return NextResponse.json({ success: true, message: '删除成功' });
}
