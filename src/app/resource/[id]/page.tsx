import { Comment } from '@/types';
import { ArrowLeft } from 'lucide-react';
import { pool } from '@/lib/db';
import Link from 'next/link';
import ResourceDetailActions from '@/components/ResourceDetailActions';
import ResourceDetailInfo from '@/components/ResourceDetailInfo';

export default async function ResourceDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const resourceId = id;

  const fetchResourceDetail = async (id: string) => {
    try {
      const rid = parseInt(id, 10);
      if (isNaN(rid)) return null;
      const [rows] = await pool.query(
        `SELECT id, title, description, subject, grade, uploader, user_id AS userId,
                file_name AS fileName, file_type AS fileType, file_size AS fileSize,
                download_count AS downloadCount, uploaded_at AS uploadedAt,
                chapter_id AS chapterId, difficulty, pdf_path AS pdfPath
         FROM resources WHERE id = ?`,
        [rid]
      );
      return (rows as any[])[0] || null;
    } catch { return null; }
  };

  const fetchComments = async (id: string) => {
    try {
      const rid = parseInt(id, 10);
      if (isNaN(rid)) return [];
      const [topRows] = await pool.query(
        `SELECT id, resource_id AS resourceId, author, user_id AS userId,
                parent_id AS parentId, content, rating, created_at AS createdAt
         FROM comments WHERE resource_id = ? AND (parent_id IS NULL OR parent_id = 0)
         ORDER BY created_at DESC`,
        [rid]
      ) as any;
      const [replyRows] = await pool.query(
        `SELECT id, resource_id AS resourceId, author, user_id AS userId,
                parent_id AS parentId, content, rating, created_at AS createdAt
         FROM comments WHERE resource_id = ? AND parent_id IS NOT NULL AND parent_id != 0
         ORDER BY created_at ASC`,
        [rid]
      ) as any;
      const replyMap: Record<number, any[]> = {};
      for (const r of replyRows) {
        if (!replyMap[r.parentId]) replyMap[r.parentId] = [];
        replyMap[r.parentId].push(r);
      }
      return topRows.map((c: any) => ({ ...c, replies: replyMap[c.id] || [] }));
    } catch { return []; }
  };

  const resource = await fetchResourceDetail(resourceId);
  const comments = await fetchComments(resourceId);

  if (!resource) {
    return (
      <div className="min-h-screen bg-[#F5F7FA] flex items-center justify-center">
        <div className="text-center">
          <p className="text-gray-600 mb-4">资源不存在</p>
          <Link href="/" className="px-4 py-2 bg-[#4F6EF7] text-white rounded-lg hover:bg-blue-700">返回</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F5F7FA]">
      {/* 顶部导航 */}
      <div className="bg-white border-b border-gray-100 shadow-[0_1px_4px_rgba(0,0,0,0.06)]">
        <div className="max-w-7xl mx-auto px-6 py-3 flex items-center gap-4">
          <Link href="/" className="flex items-center gap-1.5 text-gray-500 hover:text-[#4F6EF7] font-medium text-sm transition">
            <ArrowLeft className="w-4 h-4" />返回
          </Link>
          <h1 className="text-base font-bold text-gray-800 truncate flex-1">{resource.title}</h1>
          <ResourceDetailActions resourceId={resourceId} resource={resource} comments={[]} variant="button-only" />
        </div>
      </div>

      {/* 主体：左右分栏 */}
      <div className="max-w-7xl mx-auto px-6 py-6 flex gap-6">
        {/* 左侧 65% - 预览区 */}
        <div className="flex-[65] min-w-0">
          <div className="bg-white rounded-[8px] shadow-[0_1px_4px_rgba(0,0,0,0.08)] overflow-hidden" style={{ minHeight: '70vh' }}>
            {resource.pdfPath ? (
              <iframe
                src={`/api/uploads/${resource.pdfPath}#toolbar=1`}
                className="w-full"
                style={{ height: '80vh' }}
                title={resource.title}
              />
            ) : resource.fileType === 'pdf' ? (
              <iframe
                src={`/api/uploads/${resource.fileName}#toolbar=1`}
                className="w-full"
                style={{ height: '80vh' }}
                title={resource.title}
              />
            ) : resource.fileType === 'image' ? (
              <img src={`/api/uploads/${resource.fileName}`} alt={resource.title} className="w-full object-contain" style={{ maxHeight: '80vh' }} />
            ) : resource.fileType === 'video' ? (
              <video controls className="w-full" style={{ maxHeight: '80vh' }}>
                <source src={`/api/uploads/${resource.fileName}`} />你的浏览器不支持视频播放
              </video>
            ) : (
              <div className="flex flex-col items-center justify-center h-full p-16 text-center" style={{ minHeight: '60vh' }}>
                <div className="text-7xl mb-6">
                  {resource.fileType === 'word' ? '📝' : resource.fileType === 'ppt' ? '📊' : resource.fileType === 'excel' ? '📈' : '📄'}
                </div>
                <p className="text-gray-500 mb-4">暂不支持预览，请下载后查看</p>
                <a href={`/api/uploads/${resource.fileName}`} target="_blank" rel="noopener noreferrer"
                  className="px-5 py-2 bg-[#4F6EF7] text-white rounded-lg hover:bg-blue-700 text-sm font-semibold transition">
                  在新窗口打开
                </a>
              </div>
            )}
          </div>
        </div>

        {/* 右侧 35% - 信息 + 评论 */}
        <div className="flex-[35] min-w-0 space-y-4">
          {/* 资源信息 + 描述编辑 + 收藏 */}
          <ResourceDetailInfo resource={resource} resourceId={resourceId} />

          {/* 评论区 */}
          <ResourceDetailActions resourceId={resourceId} resource={resource} comments={comments} />
        </div>
      </div>
    </div>
  );
}
