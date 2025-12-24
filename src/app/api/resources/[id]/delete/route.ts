import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';
import { getUploadDir, readResources, saveResources } from '@/lib/storage';

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const resources = readResources();
    const resourceIndex = resources.findIndex((r: any) => r.id === id);

    if (resourceIndex === -1) {
      return NextResponse.json(
        { success: false, message: '资源不存在' },
        { status: 404 }
      );
    }

    const resource = resources[resourceIndex];

    // 删除文件
    const uploadDir = getUploadDir();
    const filePath = path.join(uploadDir, resource.fileName);
    
    if (fs.existsSync(filePath)) {
      try {
        fs.unlinkSync(filePath);
      } catch (error) {
        console.error('Failed to delete file:', error);
        // 继续删除数据库记录，即使文件删除失败
      }
    }

    // 从数据库中删除记录
    resources.splice(resourceIndex, 1);
    saveResources(resources);

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
