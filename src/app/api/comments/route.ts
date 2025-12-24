import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';
import { v4 as uuidv4 } from 'uuid';

function getCommentsDbPath(): string {
  const dataDir = path.join(process.cwd(), 'data');
  if (!fs.existsSync(dataDir)) {
    fs.mkdirSync(dataDir, { recursive: true });
  }
  return path.join(dataDir, 'comments.json');
}

function readComments() {
  const dbPath = getCommentsDbPath();
  if (!fs.existsSync(dbPath)) {
    return [];
  }
  try {
    const data = fs.readFileSync(dbPath, 'utf-8');
    return JSON.parse(data);
  } catch (error) {
    console.error('Error reading comments:', error);
    return [];
  }
}

function saveComments(comments: any[]) {
  const dbPath = getCommentsDbPath();
  fs.writeFileSync(dbPath, JSON.stringify(comments, null, 2));
}

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

    const comments = readComments();
    const resourceComments = comments
      .filter((c: any) => c.resourceId === resourceId)
      .sort((a: any, b: any) => 
        new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      );

    return NextResponse.json(
      { success: true, data: resourceComments },
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

    const comment = {
      id: uuidv4(),
      resourceId,
      author,
      content,
      rating,
      createdAt: new Date().toISOString(),
    };

    const comments = readComments();
    comments.push(comment);
    saveComments(comments);

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
