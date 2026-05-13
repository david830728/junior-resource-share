'use client';

import { useState } from 'react';
import { Download, Send, Star, MessageSquare, LogIn, ChevronDown, ChevronUp } from 'lucide-react';
import axios from 'axios';
import Link from 'next/link';
import { Resource, Comment } from '@/types';
import { useAuth } from '@/contexts/AuthContext';

interface ResourceDetailActionsProps {
  resourceId: string;
  resource: Resource;
  comments: Comment[];
  variant?: 'button-only' | 'full';
}

export default function ResourceDetailActions({
  resourceId,
  resource,
  comments: initialComments,
  variant = 'full',
}: ResourceDetailActionsProps) {
  const { user } = useAuth();
  const [comments, setComments] = useState<Comment[]>(initialComments);
  const [content, setContent] = useState('');
  const [rating, setRating] = useState(5);
  const [error, setError] = useState('');
  const [submitting, setSubmitting] = useState(false);
  // replyTo: { id, author } of the comment being replied to
  const [replyTo, setReplyTo] = useState<{ id: number; author: string } | null>(null);
  const [replyContent, setReplyContent] = useState('');
  const [replySubmitting, setReplySubmitting] = useState(false);
  const [expandedReplies, setExpandedReplies] = useState<Set<number>>(new Set());

  // Refresh comments from server
  const refreshComments = async () => {
    try {
      const res = await axios.get(`/api/comments?resourceId=${resourceId}`);
      if (res.data.success) setComments(res.data.data);
    } catch {}
  };

  const handleDownload = async () => {
    try {
      const response = await axios.get(`/api/resources/${resourceId}/download`, { responseType: 'blob' });
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      const cd = response.headers['content-disposition'];
      const match = cd?.match(/filename="?([^"]+)"?/);
      const ext = resource.fileName?.split('.').pop() || '';
      link.setAttribute('download', match?.[1] ? decodeURIComponent(match[1]) : (ext ? `${resource.title}.${ext}` : resource.title));
      document.body.appendChild(link);
      link.click();
      link.parentNode?.removeChild(link);
    } catch {
      alert('下载失败，请重试');
    }
  };

  const renderStars = (val: number, interactive = false, onRate?: (r: number) => void) => (
    <div className="flex gap-1">
      {[1, 2, 3, 4, 5].map(s => (
        <button key={s} type="button" onClick={() => interactive && onRate?.(s)}
          className={`transition ${interactive ? 'cursor-pointer hover:scale-110' : 'cursor-default'}`}>
          <Star className={`w-5 h-5 ${s <= val ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}`} />
        </button>
      ))}
    </div>
  );

  const avgRating = () => {
    const top = comments.filter(c => !c.parentId);
    if (top.length === 0) return '0';
    return (top.reduce((a, c) => a + (c.rating || 0), 0) / top.length).toFixed(1);
  };

  const handleSubmitComment = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!content.trim()) { setError('请填写评论内容'); return; }
    setError('');
    setSubmitting(true);
    try {
      const res = await axios.post('/api/comments', { resourceId, content, rating });
      if (res.data.success) {
        setContent('');
        setRating(5);
        await refreshComments();
      }
    } catch (err: any) {
      setError(err.response?.data?.message || '评论失败');
    } finally {
      setSubmitting(false);
    }
  };

  const handleSubmitReply = async (parentId: number) => {
    if (!replyContent.trim()) return;
    setReplySubmitting(true);
    try {
      const res = await axios.post('/api/comments', { resourceId, content: replyContent, parentId });
      if (res.data.success) {
        setReplyContent('');
        setReplyTo(null);
        // Auto-expand this comment's replies
        setExpandedReplies(prev => new Set(prev).add(parentId));
        await refreshComments();
      }
    } catch {}
    finally { setReplySubmitting(false); }
  };

  const toggleReplies = (id: number) => {
    setExpandedReplies(prev => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });
  };

  if (variant === 'button-only') {
    return (
      <button onClick={handleDownload}
        className="flex items-center gap-2 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 font-semibold">
        <Download className="w-4 h-4" />
        下载
      </button>
    );
  }

  const topComments = comments.filter(c => !c.parentId);

  return (
    <div className="lg:col-span-1 space-y-6">
      {/* 评分 */}
      <div className="bg-white rounded-lg shadow-lg p-6">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">资源评分</h3>
        <div className="text-center">
          <div className="flex justify-center mb-2">
            {renderStars(Math.round(Number(avgRating())))}
          </div>
          <p className="text-3xl font-bold text-yellow-500">{avgRating()}</p>
          <p className="text-gray-500 text-sm mt-1">基于 {topComments.length} 条评论</p>
        </div>
      </div>

      {/* 发表评论 */}
      <div className="bg-white rounded-lg shadow-lg p-6">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">发表评论</h3>
        {user ? (
          <form onSubmit={handleSubmitComment} className="space-y-4">
            {error && <div className="bg-red-50 border border-red-200 text-red-700 px-3 py-2 rounded text-sm">{error}</div>}
            <div className="bg-gray-50 border border-gray-200 rounded-lg px-3 py-2 text-sm text-gray-600">
              以 <span className="font-semibold text-gray-800">{user.displayName}</span> 的身份评论
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">评分</label>
              {renderStars(rating, true, setRating)}
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">评论内容</label>
              <textarea value={content} onChange={e => setContent(e.target.value)}
                placeholder="分享你对这个资源的看法..."
                rows={3}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm" />
            </div>
            <button type="submit" disabled={submitting}
              className="w-full py-2 bg-blue-500 hover:bg-blue-600 text-white font-semibold rounded-lg flex items-center justify-center gap-2 transition disabled:opacity-50">
              <Send className="w-4 h-4" />
              {submitting ? '提交中...' : '发表评论'}
            </button>
          </form>
        ) : (
          <div className="text-center py-4">
            <p className="text-gray-500 text-sm mb-3">登录后才能发表评论</p>
            <Link href="/login"
              className="inline-flex items-center gap-2 px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white font-semibold rounded-lg transition text-sm">
              <LogIn className="w-4 h-4" />
              立即登录
            </Link>
          </div>
        )}
      </div>

      {/* 评论列表 */}
      <div className="bg-white rounded-lg shadow-lg p-6">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">
          评论 ({topComments.length})
        </h3>
        <div className="space-y-4 max-h-[600px] overflow-y-auto pr-1">
          {topComments.length === 0 ? (
            <p className="text-gray-400 text-center py-6">暂无评论，快来第一个留言吧</p>
          ) : (
            topComments.map((comment, idx) => (
              <div key={comment.id} className="border border-gray-100 rounded-xl p-4 bg-gray-50">
                {/* 楼层标记 + 作者 */}
                <div className="flex items-start justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold text-blue-500 bg-blue-50 px-2 py-0.5 rounded">
                      #{topComments.length - idx}楼
                    </span>
                    <div className="w-7 h-7 rounded-full bg-gradient-to-br from-blue-400 to-indigo-500 flex items-center justify-center text-white text-xs font-bold">
                      {comment.author.charAt(0)}
                    </div>
                    <div>
                      <p className="font-semibold text-gray-800 text-sm">{comment.author}</p>
                      <p className="text-xs text-gray-400">
                        {new Date(comment.createdAt).toLocaleString('zh-CN', { month: 'numeric', day: 'numeric', hour: '2-digit', minute: '2-digit' })}
                      </p>
                    </div>
                  </div>
                  <div className="flex gap-0.5">
                    {[1,2,3,4,5].map(s => (
                      <Star key={s} className={`w-3.5 h-3.5 ${s <= (comment.rating||0) ? 'fill-yellow-400 text-yellow-400' : 'text-gray-200'}`} />
                    ))}
                  </div>
                </div>
                <p className="text-gray-700 text-sm leading-relaxed mb-3">{comment.content}</p>

                {/* 操作行 */}
                <div className="flex items-center gap-3">
                  {user && (
                    <button
                      onClick={() => { setReplyTo(replyTo?.id === Number(comment.id) ? null : { id: Number(comment.id), author: comment.author }); setReplyContent(''); }}
                      className="flex items-center gap-1 text-xs text-blue-500 hover:text-blue-700 transition font-semibold"
                    >
                      <MessageSquare className="w-3.5 h-3.5" />
                      回复
                    </button>
                  )}
                  {(comment.replies?.length ?? 0) > 0 && (
                    <button
                      onClick={() => toggleReplies(Number(comment.id))}
                      className="flex items-center gap-1 text-xs text-gray-500 hover:text-gray-700 transition"
                    >
                      {expandedReplies.has(Number(comment.id)) ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
                      {comment.replies!.length} 条回复
                    </button>
                  )}
                </div>

                {/* 回复输入框 */}
                {replyTo?.id === Number(comment.id) && (
                  <div className="mt-3 flex gap-2">
                    <textarea
                      value={replyContent}
                      onChange={e => setReplyContent(e.target.value)}
                      placeholder={`回复 ${replyTo.author}...`}
                      rows={2}
                      className="flex-1 px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <div className="flex flex-col gap-1">
                      <button
                        onClick={() => handleSubmitReply(Number(comment.id))}
                        disabled={replySubmitting}
                        className="px-3 py-1.5 bg-blue-500 hover:bg-blue-600 text-white text-xs font-semibold rounded-lg disabled:opacity-50"
                      >
                        {replySubmitting ? '...' : '发送'}
                      </button>
                      <button onClick={() => setReplyTo(null)}
                        className="px-3 py-1.5 bg-gray-200 hover:bg-gray-300 text-gray-600 text-xs rounded-lg">
                        取消
                      </button>
                    </div>
                  </div>
                )}

                {/* 展开的回复列表 */}
                {expandedReplies.has(Number(comment.id)) && (comment.replies?.length ?? 0) > 0 && (
                  <div className="mt-3 space-y-2 pl-4 border-l-2 border-blue-100">
                    {comment.replies!.map(reply => (
                      <div key={reply.id} className="flex items-start gap-2 bg-white rounded-lg p-3">
                        <div className="w-6 h-6 rounded-full bg-gradient-to-br from-green-400 to-emerald-500 flex items-center justify-center text-white text-xs font-bold flex-shrink-0">
                          {reply.author.charAt(0)}
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 mb-1">
                            <span className="text-sm font-semibold text-gray-800">{reply.author}</span>
                            <span className="text-xs text-gray-400">
                              {new Date(reply.createdAt).toLocaleString('zh-CN', { month: 'numeric', day: 'numeric', hour: '2-digit', minute: '2-digit' })}
                            </span>
                          </div>
                          <p className="text-sm text-gray-700 leading-relaxed">{reply.content}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}