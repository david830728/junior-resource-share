'use client';

import { useEffect, useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { useRouter } from 'next/navigation';
import { CollectionItem } from '@/types';
import axios from 'axios';
import Link from 'next/link';
import {
  DndContext, closestCenter, PointerSensor, useSensor, useSensors, DragEndEvent,
} from '@dnd-kit/core';
import {
  SortableContext, verticalListSortingStrategy, useSortable, arrayMove,
} from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { GripVertical, Trash2, ChevronRight, ArrowLeft, ChevronDown, ChevronUp } from 'lucide-react';

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

function SortableItem({
  item, onRemove, onRename,
}: { item: CollectionItem; onRemove: (id: number) => void; onRename: (id: number, name: string) => void }) {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({ id: item.collectionId });
  const [editName, setEditName] = useState(item.customName || item.title);
  const [expanded, setExpanded] = useState(false);

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
  };

  const handleBlur = () => {
    if (editName !== (item.customName || item.title)) {
      onRename(item.collectionId, editName);
    }
  };

  return (
    <div ref={setNodeRef} style={style}
      className="bg-white rounded-[8px] shadow-[0_1px_4px_rgba(0,0,0,0.08)] p-4 flex gap-3 items-start">
      {/* 拖拽手柄 */}
      <button {...attributes} {...listeners}
        className="mt-1 text-gray-300 hover:text-gray-500 cursor-grab active:cursor-grabbing flex-shrink-0">
        <GripVertical className="w-4 h-4" />
      </button>

      {/* 内容 */}
      <div className="flex-1 min-w-0">
        {/* 可编辑名称 */}
        <input
          value={editName}
          onChange={e => setEditName(e.target.value)}
          onBlur={handleBlur}
          onKeyDown={e => { if (e.key === 'Enter') (e.target as HTMLInputElement).blur(); }}
          className="w-full text-sm font-bold text-gray-800 bg-transparent border-b border-transparent hover:border-gray-200 focus:border-[#4F6EF7] focus:outline-none pb-0.5 transition"
        />
        {/* 标签 */}
        <div className="flex flex-wrap gap-1.5 mt-1.5">
          <span className={`text-xs px-2 py-0.5 rounded-full border font-medium ${DIFFICULTY_STYLE[item.difficulty] || ''}`}>{item.difficulty}</span>
          <span className="text-xs bg-blue-50 text-blue-600 border border-blue-200 px-2 py-0.5 rounded-full">{item.subject}</span>
          <span className="text-xs bg-green-50 text-green-600 border border-green-200 px-2 py-0.5 rounded-full">{item.grade}</span>
        </div>
        {/* 元信息 */}
        <p className="text-xs text-gray-400 mt-1">{formatSize(item.fileSize)} · {item.uploader}</p>
        {/* 使用说明折叠 */}
        {item.description && (
          <div className="mt-2">
            <button onClick={() => setExpanded(!expanded)}
              className="flex items-center gap-1 text-xs text-gray-400 hover:text-gray-600 transition">
              {expanded ? <ChevronUp className="w-3 h-3" /> : <ChevronDown className="w-3 h-3" />}
              试卷使用说明
            </button>
            {expanded && (
              <p className="mt-1 text-xs text-gray-600 whitespace-pre-wrap leading-relaxed pl-4 border-l-2 border-gray-100">
                {item.description}
              </p>
            )}
          </div>
        )}
      </div>

      {/* 右侧操作 */}
      <div className="flex flex-col gap-1.5 flex-shrink-0">
        <Link href={`/resource/${item.resourceId}`}
          className="flex items-center gap-1 px-2 py-1.5 bg-[#4F6EF7] hover:bg-blue-700 text-white text-xs font-semibold rounded-lg transition">
          <ChevronRight className="w-3 h-3" />查看
        </Link>
        <button onClick={() => onRemove(item.collectionId)}
          className="flex items-center gap-1 px-2 py-1.5 border border-red-200 text-red-500 hover:bg-red-50 text-xs font-semibold rounded-lg transition">
          <Trash2 className="w-3 h-3" />移出
        </button>
      </div>
    </div>
  );
}

export default function MyCollectionPage() {
  const { user, loading: authLoading } = useAuth();
  const router = useRouter();
  const [items, setItems] = useState<CollectionItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!authLoading && !user) { router.push('/login'); return; }
    if (user) {
      axios.get('/api/collection/list').then(r => {
        if (r.data.success) setItems(r.data.data);
      }).catch(() => {}).finally(() => setLoading(false));
    }
  }, [user, authLoading]);

  const sensors = useSensors(useSensor(PointerSensor, { activationConstraint: { distance: 5 } }));

  const handleDragEnd = async (event: DragEndEvent) => {
    const { active, over } = event;
    if (!over || active.id === over.id) return;
    const oldIdx = items.findIndex(i => i.collectionId === active.id);
    const newIdx = items.findIndex(i => i.collectionId === over.id);
    const newItems = arrayMove(items, oldIdx, newIdx);
    setItems(newItems);
    try {
      await axios.put('/api/collection/reorder', { orderedIds: newItems.map(i => i.collectionId) });
    } catch { /* silent */ }
  };

  const handleRemove = async (collectionId: number) => {
    const item = items.find(i => i.collectionId === collectionId);
    if (!item) return;
    try {
      await axios.delete('/api/collection/remove', { data: { resourceId: item.resourceId } });
      setItems(prev => prev.filter(i => i.collectionId !== collectionId));
    } catch { alert('移出失败'); }
  };

  const handleRename = async (collectionId: number, customName: string) => {
    try {
      await axios.put('/api/collection/rename', { collectionId, customName });
      setItems(prev => prev.map(i => i.collectionId === collectionId ? { ...i, customName } : i));
    } catch { /* silent */ }
  };

  if (authLoading || loading) {
    return (
      <div className="min-h-screen bg-[#F5F7FA] flex items-center justify-center">
        <p className="text-gray-400">加载中...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F5F7FA]">
      {/* 顶部导航 */}
      <div className="bg-white border-b border-gray-100 shadow-[0_1px_4px_rgba(0,0,0,0.06)]">
        <div className="max-w-3xl mx-auto px-6 py-3 flex items-center gap-4">
          <Link href="/" className="flex items-center gap-1.5 text-gray-500 hover:text-[#4F6EF7] text-sm font-medium transition">
            <ArrowLeft className="w-4 h-4" />返回
          </Link>
          <div>
            <h1 className="text-base font-bold text-gray-800">我的校本作业</h1>
            <p className="text-xs text-gray-400">共 {items.length} 个资源 · 拖拽可排序</p>
          </div>
        </div>
      </div>

      <div className="max-w-3xl mx-auto px-6 py-6">
        {items.length === 0 ? (
          <div className="text-center py-24">
            <div className="text-5xl mb-4">📁</div>
            <p className="text-gray-500 mb-2">还没有收藏任何资源</p>
            <Link href="/" className="text-sm text-[#4F6EF7] hover:underline">去资源列表看看吧 →</Link>
          </div>
        ) : (
          <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
            <SortableContext items={items.map(i => i.collectionId)} strategy={verticalListSortingStrategy}>
              <div className="space-y-3">
                {items.map(item => (
                  <SortableItem key={item.collectionId} item={item} onRemove={handleRemove} onRename={handleRename} />
                ))}
              </div>
            </SortableContext>
          </DndContext>
        )}
      </div>
    </div>
  );
}
