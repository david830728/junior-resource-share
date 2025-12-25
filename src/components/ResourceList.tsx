'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { Resource } from '@/types';
import { Download, FileText, Play, Image as ImageIcon, Trash2, ChevronRight } from 'lucide-react';
import axios from 'axios';
import DeleteConfirmModal from './DeleteConfirmModal';

interface ResourceListProps {
  selectedSubject: string;
  selectedGrade: string;
  searchKeyword: string;
}

export default function ResourceList({ selectedSubject, selectedGrade, searchKeyword }: ResourceListProps) {
  const [resources, setResources] = useState<Resource[]>([]);
  const [filteredResources, setFilteredResources] = useState<Resource[]>([]);
  const [loading, setLoading] = useState(true);
  const [deleteResource, setDeleteResource] = useState<Resource | null>(null);

  // 获取资源列表
  useEffect(() => {
    fetchResources();
  }, []);

  const fetchResources = async () => {
    try {
      setLoading(true);
      const response = await axios.get('/api/resources');
      if (response.data.success) {
        setResources(response.data.data);
        setFilteredResources(response.data.data);
      }
    } catch (error) {
      console.error('获取资源失败:', error);
    } finally {
      setLoading(false);
    }
  };

  // 筛选资源
  useEffect(() => {
    let filtered = resources;

    if (selectedSubject) {
      filtered = filtered.filter(r => r.subject === selectedSubject);
    }
    if (selectedGrade) {
      filtered = filtered.filter(r => r.grade === selectedGrade);
    }

    // 搜索功能 - 匹配标题、描述、学科、学段
    if (searchKeyword.trim()) {
      const keyword = searchKeyword.toLowerCase();
      filtered = filtered.filter(r => 
        (r.title?.toLowerCase() || '').includes(keyword) ||
        (r.description?.toLowerCase() || '').includes(keyword) ||
        (r.subject?.toLowerCase() || '').includes(keyword) ||
        (r.grade?.toLowerCase() || '').includes(keyword)
      );
    }

    setFilteredResources(filtered);
  }, [selectedSubject, selectedGrade, searchKeyword, resources]);

  // 获取文件图标
  const getFileIcon = (fileType: string) => {
    switch (fileType) {
      case 'pdf':
      case 'word':
      case 'ppt':
        return <FileText className="w-5 h-5 text-red-500" />;
      case 'video':
        return <Play className="w-5 h-5 text-blue-500" />;
      case 'image':
        return <ImageIcon className="w-5 h-5 text-green-500" />;
      default:
        return <FileText className="w-5 h-5 text-gray-500" />;
    }
  };

  // 格式化文件大小
  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 B';
    const k = 1024;
    const sizes = ['B', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return Math.round(bytes / Math.pow(k, i) * 100) / 100 + ' ' + sizes[i];
  };

  // 格式化日期
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('zh-CN');
  };

  // 处理下载
  const handleDownload = async (resourceId: string, title: string) => {
    try {
      const response = await axios.get(`/api/resources/${resourceId}/download`, {
        responseType: 'blob',
      });
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', title);
      document.body.appendChild(link);
      link.click();
      link.parentNode?.removeChild(link);
    } catch (error) {
      console.error('下载失败:', error);
      alert('下载失败，请重试');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="p-8 pl-20 md:pl-8 pt-16 md:pt-8">
        {/* 标题 */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">资源列表</h1>
          <p className="text-gray-600">共 {filteredResources.length} 个资源</p>
        </div>

        {/* 资源列表 */}
        <div>
          {loading ? (
            <div className="text-center py-12">
              <p className="text-gray-600">加载中...</p>
            </div>
          ) : filteredResources.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-gray-600">暂无资源</p>
            </div>
          ) : (
            <div className="space-y-3">
              {filteredResources.map(resource => (
                <div
                  key={resource.id}
                  className="bg-white rounded-lg shadow-md hover:shadow-lg transition flex items-center h-20"
                >
                  {/* 左侧：资源信息 */}
                  <div className="flex-1 px-6 py-4 flex items-center gap-4">
                    {/* 文件图标 */}
                    <div className="flex-shrink-0">
                      {getFileIcon(resource.fileType)}
                    </div>

                    {/* 标题和元数据 */}
                    <div className="flex-1 min-w-0">
                      <h3 className="font-semibold text-gray-800 truncate">
                        {resource.title}
                      </h3>
                      <div className="flex items-center gap-3 mt-1">
                        <div className="flex-shrink-0">
                          <span className="bg-blue-100 text-blue-800 px-2 py-0.5 rounded text-xs">
                            {resource.subject}
                          </span>
                          <span className="bg-indigo-100 text-indigo-800 px-2 py-0.5 rounded text-xs ml-2">
                            {resource.grade}
                          </span>
                        </div>
                        
                        {/* 中间位置：文件大小和下载量（上下排列） */}
                        <div className="flex-1 flex flex-col text-xs text-gray-500 ml-4">
                          <span className="truncate">{formatFileSize(resource.fileSize)}</span>
                          <span className="truncate">{resource.downloadCount} 下载</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* 右侧：按钮 */}
                  <div className="flex-shrink-0 px-4 py-4 flex gap-2 whitespace-nowrap">
                    {/* 查看详情按钮 */}
                    <Link
                      href={`/resource/${resource.id}`}
                      className="px-3 py-2 bg-blue-500 hover:bg-blue-600 text-white font-semibold rounded-lg flex items-center gap-1 transition text-sm whitespace-nowrap"
                    >
                      <ChevronRight className="w-4 h-4" />
                      查看
                    </Link>

                    {/* 删除按钮 */}
                    <button
                      onClick={() => setDeleteResource(resource)}
                      className="px-3 py-2 bg-red-500 hover:bg-red-600 text-white font-semibold rounded-lg flex items-center gap-1 transition text-sm whitespace-nowrap"
                    >
                      <Trash2 className="w-4 h-4" />
                      删除
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* 删除确认对话框 */}
      <DeleteConfirmModal
        resource={deleteResource}
        onClose={() => setDeleteResource(null)}
        onSuccess={() => {
          // 删除成功后刷新资源列表
          fetchResources();
        }}
      />
    </div>
  );
}
