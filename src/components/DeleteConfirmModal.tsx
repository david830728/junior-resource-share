'use client';

import { Trash2, X } from 'lucide-react';
import { Resource } from '@/types';
import { useState } from 'react';
import axios from 'axios';

interface DeleteConfirmModalProps {
  resource: Resource | null;
  onClose: () => void;
  onSuccess?: () => void;
}

export default function DeleteConfirmModal({
  resource,
  onClose,
  onSuccess,
}: DeleteConfirmModalProps) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  if (!resource) return null;

  const handleDelete = async () => {
    try {
      setLoading(true);
      setError('');

      const response = await axios.delete(`/api/resources/${resource.id}/delete`);

      if (response.data.success) {
        onSuccess?.();
        onClose();
      } else {
        setError(response.data.message || '删除失败');
      }
    } catch (err) {
      setError('删除失败，请重试');
      console.error('Delete error:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl max-w-md w-full">
        {/* 头部 */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200 bg-red-50">
          <div className="flex items-center gap-3">
            <div className="bg-red-100 p-3 rounded-full">
              <Trash2 className="w-6 h-6 text-red-600" />
            </div>
            <h2 className="text-xl font-bold text-gray-800">删除资源</h2>
          </div>
          <button
            onClick={onClose}
            className="hover:bg-gray-200 p-1 rounded transition"
          >
            <X className="w-5 h-5 text-gray-600" />
          </button>
        </div>

        {/* 内容 */}
        <div className="p-6">
          <p className="text-gray-700 mb-2">
            确定要删除以下资源吗？
          </p>
          <div className="bg-gray-50 p-4 rounded-lg mb-4">
            <p className="font-semibold text-gray-800 mb-2">{resource.title}</p>
            <p className="text-sm text-gray-600">
              {resource.subject} · {resource.grade}
            </p>
          </div>
          <p className="text-sm text-red-600 mb-4">
            ⚠️ 此操作无法撤销，删除后将永久失去该资源。
          </p>

          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded mb-4">
              {error}
            </div>
          )}
        </div>

        {/* 按钮 */}
        <div className="flex gap-3 p-6 border-t border-gray-200 bg-gray-50">
          <button
            onClick={onClose}
            disabled={loading}
            className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 font-semibold rounded-lg hover:bg-gray-100 transition disabled:opacity-50 disabled:cursor-not-allowed"
          >
            取消
          </button>
          <button
            onClick={handleDelete}
            disabled={loading}
            className="flex-1 px-4 py-2 bg-red-600 hover:bg-red-700 text-white font-semibold rounded-lg transition disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
          >
            <Trash2 className="w-4 h-4" />
            {loading ? '删除中...' : '删除'}
          </button>
        </div>
      </div>
    </div>
  );
}
