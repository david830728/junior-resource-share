import { NextRequest, NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import { pool } from '@/lib/db';
import { signToken, SESSION_COOKIE, UserPayload } from '@/lib/auth';

export async function POST(request: NextRequest) {
  try {
    const { username, password } = await request.json();

    if (!username || !password) {
      return NextResponse.json({ success: false, message: '请输入账号和密码' }, { status: 400 });
    }

    const [rows] = await pool.query(
      'SELECT id, email, password_hash, name, role FROM users WHERE email = ?',
      [username]
    );
    const users = rows as any[];
    if (users.length === 0) {
      return NextResponse.json({ success: false, message: '账号或密码错误' }, { status: 401 });
    }

    const user = users[0];
    const valid = await bcrypt.compare(password, user.password_hash);
    if (!valid) {
      return NextResponse.json({ success: false, message: '账号或密码错误' }, { status: 401 });
    }

    if (user.role === 'pending' || user.role === 'student') {
      return NextResponse.json({ success: false, message: '账号待审核，请等待管理员批准' }, { status: 403 });
    }

    const payload: UserPayload = {
      id: user.id,
      username: user.email,
      displayName: user.name,
      role: user.role,
    };
    const token = signToken(payload);

    const response = NextResponse.json({ success: true, user: payload });
    response.cookies.set(SESSION_COOKIE, token, {
      httpOnly: true,
      path: '/',
      maxAge: 60 * 60 * 24 * 7,
      sameSite: 'lax',
    });
    return response;
  } catch (error) {
    console.error('Login error:', error);
    return NextResponse.json({ success: false, message: '登录失败' }, { status: 500 });
  }
}
