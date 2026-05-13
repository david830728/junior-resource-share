import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';
import { getUploadDir } from '@/lib/storage';
import { pool } from '@/lib/db';
import { getTokenFromRequest } from '@/lib/auth';

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const currentUser = getTokenFromRequest(request);
    if (!currentUser || (currentUser.role !== 'teacher' && currentUser.role !== 'admin')) {
      return NextResponse.json({ success: false, message: '请先登录' }, { status: 401 });
    }

    const { id } = await params;
    
    // 从数据库中查询资源
    const [resourceRows] = await pool.query(
      'SELECT file_name, user_id FROM resources WHERE id = ?',
      [id]
    );
    
    const resources = resourceRows as any[];
    if (resources.length === 0) {
      return NextResponse.json(
        { success: false, message: '资源不存在' },
        { status: 404 }
      );
    }

    const resource = resources[0];
    const fileName = resource.file_name;

    // 权限检查：教师只能删除自己的资源
    if (currentUser.role !== 'admin' && resource.user_id !== currentUser.id) {
      return NextResponse.json({ success: false, message: '无权限删除此资源' }, { status: 403 });
    }

    // 删除文件
    const uploadDir = getUploadDir();
    const filePath = path.join(uploadDir, fileName);
    
    if (fs.existsSync(filePath)) {
      try {
        fs.unlinkSync(filePath);
      } catch (error) {
        console.error('Failed to delete file:', error);
        // 继续删除数据库记录，即使文件删除失败
      }
    }

    // 从数据库中删除记录
    await pool.query('DELETE FROM resources WHERE id = ?', [id]);

    return NextResponse.json(
      { success: true, message: '删除成功' },
      { status: 200 }
    );
  } catch (error) {
    console.error('Delete error:', error);
    return NextResponse.json(
      { success: false, message: '删除失败' },
      { status: 500 }
    );
  }
}
