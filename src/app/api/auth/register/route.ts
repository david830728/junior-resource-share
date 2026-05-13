import { NextRequest, NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import { pool } from '@/lib/db';

export async function POST(request: NextRequest) {
  try {
    const { username, password, displayName } = await request.json();

    if (!username || !password || !displayName) {
      return NextResponse.json({ success: false, message: '请填写所有必填字段' }, { status: 400 });
    }
    if (username.length < 3 || username.length > 50) {
      return NextResponse.json({ success: false, message: '账号长度需在3-50个字符之间' }, { status: 400 });
    }
    if (password.length < 6) {
      return NextResponse.json({ success: false, message: '密码至少6位' }, { status: 400 });
    }

    const [existing] = await pool.query('SELECT id FROM users WHERE email = ?', [username]);
    if ((existing as any[]).length > 0) {
      return NextResponse.json({ success: false, message: '账号已存在' }, { status: 409 });
    }

    const passwordHash = await bcrypt.hash(password, 10);
    await pool.query(
      'INSERT INTO users (email, password_hash, name, role) VALUES (?, ?, ?, ?)',
      [username, passwordHash, displayName, 'pending']
    );

    return NextResponse.json({ success: true, message: '申请已提交，等待管理员审核' }, { status: 201 });
  } catch (error) {
    console.error('Register error:', error);
    return NextResponse.json({ success: false, message: '注册失败' }, { status: 500 });
  }
}
