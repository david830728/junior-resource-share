'use client';

import { Resource } from '@/types';
import { useState } from 'react';
import { Bookmark, Download } from 'lucide-react';
import axios from 'axios';
import { useAuth } from '@/contexts/AuthContext';

interface Props {
  resource: Resource;
  resourceId: string;
}

const DIFFICULTY_STYLE: Record<string, string> = {
  '基础': 'bg-blue-50 text-blue-600 border-blue-200',
  '提高': 'bg-orange-50 text-orange-600 border-orange-200',
  '拓展': 'bg-red-50 text-red-600 border-red-200',
};

function formatSize(bytes: number) {
  if (!bytes) return '–';
  const k = 1024, s = ['B', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return (bytes / Math.pow(k, i)).toFixed(1) + ' ' + s[i];
}

export default function ResourceDetailInfo({ resource, resourceId }: Props) {
  const { user } = useAuth();
  const [description, setDescription] = useState(resource.description || '');
  const [editing, setEditing] = useState(false);
  const [saving, setSaving] = useState(false);
  const [collected, setCollected] = useState(false);
  const [collectLoading, setCollectLoading] = useState(false);

  const isOwner = user && String(user.id) === String(resource.userId);

  const saveDescription = async () => {
    setSaving(true);
    try {
      await axios.patch(`/api/resources/${resourceId}/update`, { description });
      setEditing(false);
    } catch { /* silent */ }
    finally { setSaving(false); }
  };

  const handleCollect = async () => {
    if (!user) { alert('请先登录后再收藏'); return; }
    setCollectLoading(true);
    try {
      if (collected) {
        await axios.delete('/api/collection/remove', { data: { resourceId: resource.id } });
        setCollected(false);
      } else {
        await axios.post('/api/collection/add', { resourceId: resource.id });
        setCollected(true);
      }
    } catch (err: any) {
      alert(err.response?.data?.message || '操作失败');
    } finally { setCollectLoading(false); }
  };

  const handleDownload = async () => {
    try {
      const res = await axios.get(`/api/resources/${resourceId}/download`, { responseType: 'blob' });
      const url = window.URL.createObjectURL(new Blob([res.data]));
      const a = document.createElement('a');
      a.href = url;
      a.setAttribute('download', resource.fileName);
      document.body.appendChild(a);
      a.click();
      a.remove();
    } catch { alert('下载失败'); }
  };

  return (
    <div className="bg-white rounded-[8px] shadow-[0_1px_4px_rgba(0,0,0,0.08)] p-5 space-y-4">
      {/* 标题 */}
      <h2 className="text-lg font-bold text-gray-800 leading-snug">{resource.title}</h2>

      {/* 标签 */}
      <div className="flex flex-wrap gap-1.5">
        {resource.difficulty && (
          <span className={`text-xs px-2 py-0.5 rounded-full border font-semibold ${DIFFICULTY_STYLE[resource.difficulty] || ''}`}>
            {resource.difficulty}
          </span>
        )}
        <span className="text-xs bg-blue-50 text-blue-600 border border-blue-200 px-2 py-0.5 rounded-full">{resource.subject}</span>
        <span className="text-xs bg-green-50 text-green-600 border border-green-200 px-2 py-0.5 rounded-full">{resource.grade}</span>
      </div>

      {/* 元信息 */}
      <div className="grid grid-cols-2 gap-x-4 gap-y-2 text-sm">
        <div><span className="text-gray-400">上传者</span><p className="font-medium text-gray-700">{resource.uploader}</p></div>
        <div><span className="text-gray-400">文件大小</span><p className="font-medium text-gray-700">{formatSize(resource.fileSize)}</p></div>
        <div><span className="text-gray-400">下载次数</span><p className="font-medium text-gray-700">{resource.downloadCount}</p></div>
        <div><span className="text-gray-400">上传时间</span><p className="font-medium text-gray-700">{new Date(resource.uploadedAt).toLocaleDateString('zh-CN')}</p></div>
      </div>

      {/* 操作按钮 */}
      <div className="flex gap-2">
        <button onClick={handleDownload}
          className="flex-1 flex items-center justify-center gap-1.5 px-3 py-2 bg-[#4F6EF7] hover:bg-blue-700 text-white text-sm font-semibold rounded-lg transition">
          <Download className="w-4 h-4" />下载原文件
        </button>
        <button onClick={handleCollect} disabled={collectLoading}
          className={`flex items-center gap-1.5 px-3 py-2 border text-sm font-semibold rounded-lg transition ${collected ? 'border-[#4F6EF7] text-[#4F6EF7] bg-blue-50' : 'border-gray-200 text-gray-500 hover:border-[#4F6EF7] hover:text-[#4F6EF7]'}`}>
          <Bookmark className={`w-4 h-4 ${collected ? 'fill-[#4F6EF7]' : ''}`} />
          {collected ? '已收藏' : '收藏'}
        </button>
      </div>

      {/* 试卷使用说明 */}
      <div>
        <p className="text-sm font-semibold text-gray-700 mb-2">试卷使用说明</p>
        {isOwner ? (
          <div>
            <textarea
              value={description}
              onChange={e => { setDescription(e.target.value); setEditing(true); }}
              onBlur={saveDescription}
              rows={5}
              placeholder="可说明出卷意图、各题设计思路、适用班级建议等……"
              className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-200 resize-none"
            />
            {editing && (
              <button onClick={saveDescription} disabled={saving}
                className="mt-1 text-xs text-[#4F6EF7] hover:underline disabled:opacity-50">
                {saving ? '保存中...' : '点击保存'}
              </button>
            )}
          </div>
        ) : (
          <p className="text-sm text-gray-600 whitespace-pre-wrap leading-relaxed">
            {description || <span className="text-gray-400">上传者暂未填写使用说明</span>}
          </p>
        )}
      </div>
    </div>
  );
}
