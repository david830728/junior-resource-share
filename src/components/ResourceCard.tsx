'use client';

import { Resource } from '@/types';
import { Bookmark, ChevronRight, Trash2, FileText, FileVideo, FileImage, File } from 'lucide-react';
import Link from 'next/link';
import axios from 'axios';
import { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';

interface ResourceCardProps {
  resource: Resource;
  chapterLabel?: string;
  onDelete?: () => void;
  currentUserId?: number;
  currentUserRole?: string;
}

const DIFFICULTY_STYLE: Record<string, string> = {
  '基础': 'bg-blue-50 text-blue-600 border-blue-200',
  '提高': 'bg-orange-50 text-orange-600 border-orange-200',
  '拓展': 'bg-red-50 text-red-600 border-red-200',
};

const FILE_ICON_BG: Record<string, string> = {
  pdf:   'bg-rose-400',
  word:  'bg-[#4F6EF7]',
  ppt:   'bg-orange-400',
  excel: 'bg-emerald-500',
  video: 'bg-violet-500',
  image: 'bg-teal-500',
  other: 'bg-slate-400',
};

function FileIcon({ type }: { type: string }) {
  const base = 'w-5 h-5 text-white';
  if (type === 'video') return <FileVideo className={base} />;
  if (type === 'image') return <FileImage className={base} />;
  if (['pdf', 'word', 'ppt', 'excel'].includes(type)) return <FileText className={base} />;
  return <File className={base} />;
}

function formatSize(bytes: number) {
  if (bytes === 0) return '0 B';
  const k = 1024, s = ['B', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return (bytes / Math.pow(k, i)).toFixed(1) + ' ' + s[i];
}

export default function ResourceCard({ resource, chapterLabel, onDelete, currentUserId, currentUserRole }: ResourceCardProps) {
  const { user } = useAuth();
  const [collected, setCollected] = useState(false);
  const [collectLoading, setCollectLoading] = useState(false);

  const canDelete = currentUserRole === 'admin' || (resource as any).userId === currentUserId;

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
      const msg = err.response?.data?.message || '操作失败';
      alert(msg);
    } finally {
      setCollectLoading(false);
    }
  };

  return (
    <div className="bg-white rounded-[8px] shadow-[0_1px_4px_rgba(0,0,0,0.08)] hover:shadow-md hover:-translate-y-0.5 transition-all duration-200 flex items-center px-4 py-3 gap-4">
      {/* 文件图标色块 */}
      <div className={`w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0 ${FILE_ICON_BG[resource.fileType] || FILE_ICON_BG.other}`}>
        <FileIcon type={resource.fileType} />
      </div>

      {/* 中间信息 */}
      <div className="flex-1 min-w-0">
        <h3 className="text-[15px] font-bold text-gray-800 truncate">{resource.title}</h3>
        <div className="flex flex-wrap items-center gap-1.5 mt-1">
          {resource.difficulty && (
            <span className={`text-xs px-2 py-0.5 rounded-full border font-medium ${DIFFICULTY_STYLE[resource.difficulty] || DIFFICULTY_STYLE['基础']}`}>
              {resource.difficulty}
            </span>
          )}
          <span className="text-xs bg-blue-50 text-blue-600 border border-blue-200 px-2 py-0.5 rounded-full">{resource.subject}</span>
          <span className="text-xs bg-green-50 text-green-600 border border-green-200 px-2 py-0.5 rounded-full">{resource.grade}</span>
        </div>
        {chapterLabel && (
          <p className="text-xs text-gray-400 mt-1 truncate">{chapterLabel}</p>
        )}
        <p className="text-xs text-gray-400 mt-0.5">
          {formatSize(resource.fileSize)} · {resource.downloadCount} 下载 · {resource.uploader}
        </p>
      </div>

      {/* 右侧按钮 */}
      <div className="flex items-center gap-2 flex-shrink-0">
        <button
          onClick={handleCollect}
          disabled={collectLoading}
          title={collected ? '取消收藏' : '收藏到校本作业'}
          className={`p-1.5 rounded-lg transition ${collected ? 'text-[#4F6EF7]' : 'text-gray-300 hover:text-[#4F6EF7]'}`}
        >
          <Bookmark className={`w-4 h-4 ${collected ? 'fill-[#4F6EF7]' : ''}`} />
        </button>

        <Link href={`/resource/${resource.id}`}
          className="flex items-center gap-1 px-3 py-1.5 bg-[#4F6EF7] hover:bg-blue-700 text-white text-xs font-semibold rounded-lg transition">
          <ChevronRight className="w-3.5 h-3.5" />
          查看
        </Link>

        {canDelete && onDelete && (
          <button onClick={onDelete}
            className="p-1.5 text-red-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition">
            <Trash2 className="w-4 h-4" />
          </button>
        )}
      </div>
    </div>
  );
}
