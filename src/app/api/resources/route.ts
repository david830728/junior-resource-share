import { NextRequest, NextResponse } from 'next/server';
import { readResources } from '@/lib/storage';

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const subject = searchParams.get('subject');
    const grade = searchParams.get('grade');

    let resources = readResources();

    // 按学科和学段筛选
    if (subject) {
      resources = resources.filter((r: any) => r.subject === subject);
    }
    if (grade) {
      resources = resources.filter((r: any) => r.grade === grade);
    }

    // 按上传时间倒序排列
    resources.sort((a: any, b: any) => 
      new Date(b.uploadedAt).getTime() - new Date(a.uploadedAt).getTime()
    );

    return NextResponse.json(
      { success: true, data: resources },
      { status: 200 }
    );
  } catch (error) {
    console.error('Fetch resources error:', error);
    return NextResponse.json(
      { success: false, message: '获取资源失败' },
      { status: 500 }
    );
  }
}
