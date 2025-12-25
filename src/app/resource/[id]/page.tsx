import { Resource, Comment } from '@/types';
import { ArrowLeft } from 'lucide-react';
import { pool } from '@/lib/db';
import Link from 'next/link';
import ResourceDetailActions from '@/components/ResourceDetailActions';

export default async function ResourceDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  // 解包 params Promise
  const { id } = await params;
  const resourceId = id;

  // 获取资源详情
  const fetchResourceDetail = async (id: string) => {
    try {
      // 将ID转换为数字类型，确保与MySQL数据库中的ID字段类型匹配
      const resourceId = parseInt(id, 10);
      
      if (isNaN(resourceId)) {
        return null;
      }
      
      const [rows] = await pool.query(
        `SELECT 
          id,
          title,
          description,
          subject,
          grade,
          uploader,
          file_name AS fileName,
          file_type AS fileType,
          file_size AS fileSize,
          download_count AS downloadCount,
          uploaded_at AS uploadedAt
        FROM resources WHERE id = ?`,
        [resourceId]
      );

      const resource = (rows as any[])[0];
      return resource;
    } catch (error) {
      console.error('Fetch resource error:', error);
      return null;
    }
  };

  // 获取评论
  const fetchComments = async (id: string) => {
    try {
      // 将ID转换为数字类型，确保与MySQL数据库中的ID字段类型匹配
      const resourceId = parseInt(id, 10);
      if (isNaN(resourceId)) {
        return [];
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

      return rows as Comment[];
    } catch (error) {
      console.error('Fetch comments error:', error);
      return [];
    }
  };

  // 预获取数据
  const resource = await fetchResourceDetail(resourceId);
  const comments = await fetchComments(resourceId);

  // 如果资源不存在，返回404
  if (!resource) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
        <div className="text-center">
          <p className="text-gray-600 mb-4">资源不存在</p>
          <Link
            href="/"
            className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
          >
            返回
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 pt-2 md:pt-0">
      {/* 头部导航 */}
      <div className="bg-white shadow-md">
        <div className="max-w-7xl mx-auto px-6 py-3 flex items-center justify-between">
          <Link
            href="/"
            className="flex items-center gap-2 text-blue-600 hover:text-blue-800 font-semibold"
          >
            <ArrowLeft className="w-5 h-5" />
            返回
          </Link>
          <h1 className="text-2xl font-bold text-gray-800 flex-1 text-center">
            资源详情
          </h1>
          <ResourceDetailActions 
            resourceId={resourceId} 
            resource={resource} 
            comments={comments} 
            variant="button-only"
          />
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* 左侧：预览内容 */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow-lg overflow-hidden">
              {/* 预览区域 */}
              <div className="bg-gray-100 min-h-96 flex items-center justify-center">
                {['image', 'pdf', 'video', 'word', 'ppt', 'excel'].includes(resource.fileType) ? (
                  <div className="w-full h-full">
                    {resource.fileType === 'image' ? (
                      <img
                        src={`/uploads/${resource.fileName}`}
                        alt={resource.title}
                        className="w-full h-full object-contain"
                      />
                    ) : resource.fileType === 'pdf' ? (
                      <iframe
                        src={`/uploads/${resource.fileName}#toolbar=0`}
                        className="w-full h-96"
                        title={resource.title}
                      />
                    ) : resource.fileType === 'video' ? (
                      <video
                        controls
                        className="w-full h-96 object-contain"
                      >
                        <source src={`/uploads/${resource.fileName}`} />
                        你的浏览器不支持视频播放
                      </video>
                    ) : ['word', 'ppt', 'excel'].includes(resource.fileType) ? (
                      <div className="w-full h-full flex flex-col items-center justify-center p-8">
                        <div className="text-8xl mb-6">
                          {resource.fileType === 'word' && '📝'}
                          {resource.fileType === 'ppt' && '📊'}
                          {resource.fileType === 'excel' && '📈'}
                        </div>
                        <h3 className="text-2xl font-bold text-gray-800 mb-2">
                          {resource.title}
                        </h3>
                        <p className="text-gray-600 mb-6">
                          {resource.fileType.toUpperCase()} 文件预览
                        </p>
                        <p className="text-gray-500 text-center mb-8">
                          点击下方按钮在新窗口中预览或下载文件
                        </p>
                        <div className="flex gap-4">
                      <a
                        href={`/uploads/${resource.fileName}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition font-semibold"
                      >
                        在新窗口打开
                      </a>
                      <ResourceDetailActions 
                        resourceId={resourceId} 
                        resource={resource} 
                        comments={comments} 
                        variant="button-only"
                      />
                        </div>
                      </div>
                    ) : null}
                  </div>
                ) : (
                  <div className="text-center p-8">
                    <div className="text-6xl mb-4">📄</div>
                    <p className="text-gray-600 text-lg">
                      暂不支持 {resource.fileType.toUpperCase()} 文件预览
                    </p>
                    <p className="text-gray-500 text-sm mt-2">
                      请下载文件后在本地查看
                    </p>
                  </div>
                )}
              </div>

              {/* 资源信息 */}
              <div className="p-8">
                <h2 className="text-3xl font-bold text-gray-800 mb-4">
                  {resource.title}
                </h2>
                <div className="flex flex-wrap gap-3 mb-6">
                  <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium">
                    {resource.subject}
                  </span>
                  <span className="bg-indigo-100 text-indigo-800 px-3 py-1 rounded-full text-sm font-medium">
                    {resource.grade}
                  </span>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6 p-4 bg-gray-50 rounded-lg">
                  <div>
                    <p className="text-gray-600 text-sm">上传者</p>
                    <p className="font-semibold text-gray-800">{resource.uploader}</p>
                  </div>
                  <div>
                    <p className="text-gray-600 text-sm">文件大小</p>
                    <p className="font-semibold text-gray-800">
                      {(resource.fileSize / 1024 / 1024).toFixed(2)} MB
                    </p>
                  </div>
                  <div>
                    <p className="text-gray-600 text-sm">下载次数</p>
                    <p className="font-semibold text-gray-800">{resource.downloadCount}</p>
                  </div>
                  <div>
                    <p className="text-gray-600 text-sm">上传时间</p>
                    <p className="font-semibold text-gray-800">
                      {new Date(resource.uploadedAt).toLocaleDateString('zh-CN')}
                    </p>
                  </div>
                </div>

                {resource.description && (
                  <div>
                    <h3 className="text-lg font-semibold text-gray-800 mb-2">
                      资源描述
                    </h3>
                    <p className="text-gray-700 leading-relaxed whitespace-pre-wrap">
                      {resource.description}
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* 右侧：评分和评论 */}
          <ResourceDetailActions 
            resourceId={resourceId} 
            resource={resource} 
            comments={comments} 
          />
        </div>
      </div>
    </div>
  );
}
