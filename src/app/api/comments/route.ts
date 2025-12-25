import { NextRequest, NextResponse } from 'next/server';
import { pool } from '@/lib/db';

// 获取资源的评论
export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const resourceId = searchParams.get('resourceId');

    if (!resourceId) {
      return NextResponse.json(
        { success: false, message: '缺少 resourceId 参数' },
        { status: 400 }
      );
    }

    const [rows] = await pool.query(
      `SELECT 
        id,
        resource_id AS resourceId,
        author,
        content,
        rating,
        created_at AS createdAt
      FROM comments WHERE resource_id = ? ORDER BY created_at DESC`,
      [resourceId]
    );

    const comments = rows as any[];

    return NextResponse.json(
      { success: true, data: comments },
      { status: 200 }
    );
  } catch (error) {
    console.error('Fetch comments error:', error);
    return NextResponse.json(
      { success: false, message: '获取评论失败' },
      { status: 500 }
    );
  }
}

// 添加评论
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { resourceId, author, content, rating } = body;

    if (!resourceId || !author || !content || !rating) {
      return NextResponse.json(
        { success: false, message: '缺少必填字段' },
        { status: 400 }
      );
    }

    if (rating < 1 || rating > 5) {
      return NextResponse.json(
        { success: false, message: '评分必须在 1-5 之间' },
        { status: 400 }
      );
    }

    // 转换日期时间格式为MySQL可接受的格式：YYYY-MM-DD HH:MM:SS
    const mysqlDateTime = new Date().toISOString().slice(0, 19).replace('T', ' ');
    
    const comment = {
      resourceId,
      author,
      content,
      rating,
      createdAt: mysqlDateTime,
    };

    await pool.query(
      'INSERT INTO comments (resource_id, author, content, rating, created_at) VALUES (?, ?, ?, ?, ?)',
      [comment.resourceId, comment.author, comment.content, comment.rating, comment.createdAt]
    );

    return NextResponse.json(
      { success: true, data: comment, message: '评论成功' },
      { status: 201 }
    );
  } catch (error) {
    console.error('Add comment error:', error);
    return NextResponse.json(
      { success: false, message: '添加评论失败' },
      { status: 500 }
    );
  }
}
