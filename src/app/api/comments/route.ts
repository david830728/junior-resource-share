import { NextRequest, NextResponse } from 'next/server';
import { pool } from '@/lib/db';
import { getTokenFromRequest } from '@/lib/auth';

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
        id, resource_id AS resourceId, user_id AS userId,
        parent_id AS parentId, author, content, rating,
        created_at AS createdAt
      FROM comments WHERE resource_id = ? ORDER BY created_at ASC`,
      [resourceId]
    );

    const all = rows as any[];
    // Build nested structure: top-level + replies
    const topLevel = all.filter(c => !c.parentId);
    const replyMap: Record<number, any[]> = {};
    all.filter(c => c.parentId).forEach(c => {
      if (!replyMap[c.parentId]) replyMap[c.parentId] = [];
      replyMap[c.parentId].push(c);
    });
    const nested = topLevel.map(c => ({ ...c, replies: replyMap[c.id] || [] }));

    return NextResponse.json({ success: true, data: nested }, { status: 200 });
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
    const sessionUser = getTokenFromRequest(request);
    if (!sessionUser) {
      return NextResponse.json({ success: false, message: '请先登录' }, { status: 401 });
    }

    const body = await request.json();
    const { resourceId, content, rating, parentId } = body;

    if (!resourceId || !content) {
      return NextResponse.json({ success: false, message: '缺少必填字段' }, { status: 400 });
    }

    // rating required only for top-level comments
    const effectiveRating = parentId ? null : (rating ?? 5);
    if (!parentId && (effectiveRating < 1 || effectiveRating > 5)) {
      return NextResponse.json({ success: false, message: '评分必须在 1-5 之间' }, { status: 400 });
    }

    const mysqlDateTime = new Date().toISOString().slice(0, 19).replace('T', ' ');

    const [result] = await pool.query(
      'INSERT INTO comments (resource_id, user_id, parent_id, author, content, rating, created_at) VALUES (?, ?, ?, ?, ?, ?, ?)',
      [resourceId, sessionUser.id, parentId || null, sessionUser.displayName, content, effectiveRating, mysqlDateTime]
    ) as any;

    return NextResponse.json({
      success: true,
      message: '评论成功',
      data: {
        id: result.insertId,
        resourceId,
        userId: sessionUser.id,
        parentId: parentId || null,
        author: sessionUser.displayName,
        content,
        rating: effectiveRating,
        createdAt: mysqlDateTime,
        replies: [],
      },
    }, { status: 201 });
  } catch (error) {
    console.error('Add comment error:', error);
    return NextResponse.json(
      { success: false, message: '添加评论失败' },
      { status: 500 }
    );
  }
}
