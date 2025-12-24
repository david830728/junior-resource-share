'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { Resource, Comment } from '@/types';
import { ArrowLeft, Download, Star, Send } from 'lucide-react';
import axios from 'axios';
import PreviewModal from '@/components/PreviewModal';

export default function ResourceDetailPage() {
  const params = useParams();
  const router = useRouter();
  const resourceId = Array.isArray(params.id) ? params.id[0] : (params.id || '');

  const [resource, setResource] = useState<Resource | null>(null);
  const [comments, setComments] = useState<Comment[]>([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  // 评论表单状态
  const [author, setAuthor] = useState('');
  const [content, setContent] = useState('');
  const [rating, setRating] = useState(5);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  useEffect(() => {
    fetchResourceDetail();
    fetchComments();
  }, [resourceId]);

  const fetchResourceDetail = async () => {
    try {
      const response = await axios.get(`/api/resources/${resourceId}`);
      if (response.data.success) {
        setResource(response.data.data);
      }
    } catch (err) {
      console.error('Failed to fetch resource:', err);
    } finally {
      setLoading(false);
    }
  };

  const fetchComments = async () => {
    try {
      const response = await axios.get(`/api/comments?resourceId=${resourceId}`);
      if (response.data.success) {
        setComments(response.data.data);
      }
    } catch (err) {
      console.error('Failed to fetch comments:', err);
    }
  };

  const handleSubmitComment = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    if (!author.trim() || !content.trim()) {
      setError('请填写评论者名称和评论内容');
      return;
    }

    try {
      setSubmitting(true);
      const response = await axios.post('/api/comments', {
        resourceId,
        author,
        content,
        rating,
      });

      if (response.data.success) {
        setSuccess('评论成功！');
        setAuthor('');
        setContent('');
        setRating(5);
        fetchComments();
        setTimeout(() => setSuccess(''), 3000);
      }
    } catch (err) {
      setError('评论失败，请重试');
      console.error('Failed to submit comment:', err);
    } finally {
      setSubmitting(false);
    }
  };

  const handleDownload = async () => {
    if (!resource) return;
    try {
      const response = await axios.get(`/api/resources/${resourceId}/download`, {
        responseType: 'blob',
      });
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', resource.title);
      document.body.appendChild(link);
      link.click();
      link.parentNode?.removeChild(link);
    } catch (error) {
      console.error('Download failed:', error);
      alert('下载失败，请重试');
    }
  };

  const calculateAverageRating = () => {
    if (comments.length === 0) return 0;
    const sum = comments.reduce((acc, c) => acc + c.rating, 0);
    return (sum / comments.length).toFixed(1);
  };

  const renderStars = (rating: number, interactive = false, onRate?: (r: number) => void) => {
    return (
      <div className="flex gap-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <button
            key={star}
            onClick={() => interactive && onRate?.(star)}
            className={`transition ${
              interactive ? 'cursor-pointer hover:scale-110' : 'cursor-default'
            }`}
          >
            <Star
              className={`w-5 h-5 ${
                star <= rating
                  ? 'fill-yellow-400 text-yellow-400'
                  : 'text-gray-300'
              }`}
            />
          </button>
        ))}
      </div>
    );
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
        <p className="text-gray-600">加载中...</p>
      </div>
    );
  }

  if (!resource) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
        <div className="text-center">
          <p className="text-gray-600 mb-4">资源不存在</p>
          <button
            onClick={() => router.back()}
            className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
          >
            返回
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* 头部导航 */}
      <div className="bg-white shadow-md">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <button
            onClick={() => router.back()}
            className="flex items-center gap-2 text-blue-600 hover:text-blue-800 font-semibold"
          >
            <ArrowLeft className="w-5 h-5" />
            返回
          </button>
          <h1 className="text-2xl font-bold text-gray-800 flex-1 text-center">
            资源详情
          </h1>
          <button
            onClick={handleDownload}
            className="flex items-center gap-2 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 font-semibold"
          >
            <Download className="w-4 h-4" />
            下载
          </button>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* 左侧：预览内容 */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow-lg overflow-hidden">
              {/* 预览区域 */}
              <div className="bg-gray-100 min-h-96 flex items-center justify-center">
                {['image', 'pdf', 'video'].includes(resource.fileType) ? (
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
                    ) : (
                      <video
                        controls
                        className="w-full h-96 object-contain"
                      >
                        <source src={`/uploads/${resource.fileName}`} />
                        你的浏览器不支持视频播放
                      </video>
                    )}
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
          <div className="lg:col-span-1">
            {/* 评分区域 */}
            <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">
                资源评分
              </h3>
              <div className="text-center mb-4">
                <div className="flex justify-center mb-2">
                  {renderStars(Math.round(Number(calculateAverageRating() || 0)))}
                </div>
                <p className="text-2xl font-bold text-yellow-500">
                  {calculateAverageRating()}
                </p>
                <p className="text-gray-600 text-sm">
                  基于 {comments.length} 条评论
                </p>
              </div>
            </div>

            {/* 评论表单 */}
            <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">
                发表评论
              </h3>
              <form onSubmit={handleSubmitComment} className="space-y-4">
                {error && (
                  <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded">
                    {error}
                  </div>
                )}
                {success && (
                  <div className="bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded">
                    {success}
                  </div>
                )}

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    你的名称
                  </label>
                  <input
                    type="text"
                    value={author}
                    onChange={(e) => setAuthor(e.target.value)}
                    placeholder="请输入你的名称"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    评分
                  </label>
                  <div className="flex gap-2">
                    {renderStars(rating, true, setRating)}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    评论内容
                  </label>
                  <textarea
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    placeholder="请输入你的评论..."
                    rows={4}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <button
                  type="submit"
                  disabled={submitting}
                  className="w-full px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white font-semibold rounded-lg flex items-center justify-center gap-2 transition disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <Send className="w-4 h-4" />
                  {submitting ? '提交中...' : '提交评论'}
                </button>
              </form>
            </div>

            {/* 评论列表 */}
            <div className="bg-white rounded-lg shadow-lg p-6">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">
                评论 ({comments.length})
              </h3>
              <div className="space-y-4 max-h-96 overflow-y-auto">
                {comments.length === 0 ? (
                  <p className="text-gray-500 text-center py-4">暂无评论</p>
                ) : (
                  comments.map((comment) => (
                    <div
                      key={comment.id}
                      className="border-b border-gray-200 pb-4 last:border-b-0"
                    >
                      <div className="flex items-start justify-between mb-2">
                        <div>
                          <p className="font-semibold text-gray-800">
                            {comment.author}
                          </p>
                          <p className="text-xs text-gray-500">
                            {new Date(comment.createdAt).toLocaleDateString('zh-CN')}
                          </p>
                        </div>
                        <div className="flex gap-0.5">
                          {[1, 2, 3, 4, 5].map((star) => (
                            <Star
                              key={star}
                              className={`w-4 h-4 ${
                                star <= comment.rating
                                  ? 'fill-yellow-400 text-yellow-400'
                                  : 'text-gray-300'
                              }`}
                            />
                          ))}
                        </div>
                      </div>
                      <p className="text-gray-700 text-sm">{comment.content}</p>
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
