import { NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import { pool } from '@/lib/db';

export async function POST() {
  try {
    const [existing] = await pool.query("SELECT id FROM users WHERE email = 'admin'");
    if ((existing as any[]).length > 0) {
      return NextResponse.json({ success: false, message: '管理员账号已存在，请勿重复初始化' }, { status: 409 });
    }

    const passwordHash = await bcrypt.hash('Admin@123456', 10);
    await pool.query(
      'INSERT INTO users (email, password_hash, name, role) VALUES (?, ?, ?, ?)',
      ['admin', passwordHash, '管理员', 'admin']
    );

    return NextResponse.json({
      success: true,
      message: '初始化成功！管理员账号: admin，密码: Admin@123456，请登录后立即修改密码',
    });
  } catch (error) {
    console.error('Setup error:', error);
    return NextResponse.json({ success: false, message: `初始化失败: ${error}` }, { status: 500 });
  }
}
