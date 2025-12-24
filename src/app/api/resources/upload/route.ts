import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';
import { v4 as uuidv4 } from 'uuid';
import { getUploadDir, getResourcesDbPath, generateFileName, getFileType, readResources, saveResources } from '@/lib/storage';

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const file = formData.get('file') as File;
    const title = formData.get('title') as string;
    const subject = formData.get('subject') as string;
    const grade = formData.get('grade') as string;
    const description = formData.get('description') as string;
    const uploader = formData.get('uploader') as string;

    // 验证必填字段
    if (!file || !title || !subject || !grade || !uploader) {
      return NextResponse.json(
        { success: false, message: '缺少必填字段' },
        { status: 400 }
      );
    }

    // 验证文件大小（限制 500MB）
    if (file.size > 500 * 1024 * 1024) {
      return NextResponse.json(
        { success: false, message: '文件过大，最大限制 500MB' },
        { status: 400 }
      );
    }

    // 生成唯一文件名
    const fileName = generateFileName(file.name);
    const uploadDir = getUploadDir();
    const filePath = path.join(uploadDir, fileName);

    // 保存文件
    const bytes = await file.arrayBuffer();
    fs.writeFileSync(filePath, Buffer.from(bytes));

    // 创建资源记录
    const resourceId = uuidv4();
    const resource = {
      id: resourceId,
      title,
      subject,
      grade,
      description,
      fileName,
      fileType: getFileType(file.name),
      fileSize: file.size,
      uploader,
      uploadedAt: new Date().toISOString(),
      downloadCount: 0,
    };

    // 保存到数据库
    const resources = readResources();
    resources.push(resource);
    saveResources(resources);

    return NextResponse.json(
      { success: true, data: resource, message: '上传成功' },
      { status: 201 }
    );
  } catch (error) {
    console.error('Upload error:', error);
    return NextResponse.json(
      { success: false, message: '上传失败' },
      { status: 500 }
    );
  }
}
