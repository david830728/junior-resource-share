'use client';

import { X } from 'lucide-react';
import { Resource } from '@/types';

interface PreviewModalProps {
  resource: Resource | null;
  onClose: () => void;
}

export default function PreviewModal({ resource, onClose }: PreviewModalProps) {
  if (!resource) return null;

  const isImage = resource.fileType === 'image';
  const isPdf = resource.fileType === 'pdf';
  const isVideo = resource.fileType === 'video';

  return (
    <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden flex flex-col">
        {/* 头部 */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200 bg-gray-50">
          <div>
            <h2 className="text-2xl font-bold text-gray-800">{resource.title}</h2>
            <p className="text-gray-600 text-sm mt-1">
              {resource.subject} · {resource.grade}
            </p>
          </div>
          <button
            onClick={onClose}
            className="hover:bg-gray-200 p-2 rounded-lg transition"
          >
            <X className="w-6 h-6 text-gray-600" />
          </button>
        </div>

        {/* 预览内容 */}
        <div className="flex-1 overflow-auto bg-gray-100 flex items-center justify-center">
          {isImage ? (
            // 图片预览
            <img
              src={`/uploads/${resource.fileName}`}
              alt={resource.title}
              className="max-w-full max-h-full object-contain"
            />
          ) : isPdf ? (
            // PDF 预览
            <iframe
              src={`/uploads/${resource.fileName}#toolbar=0`}
              className="w-full h-full"
              title={resource.title}
            />
          ) : isVideo ? (
            // 视频预览
            <video
              controls
              className="max-w-full max-h-full"
            >
              <source src={`/uploads/${resource.fileName}`} />
              你的浏览器不支持视频播放
            </video>
          ) : (
            // 不支持的文件类型
            <div className="text-center">
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

        {/* 底部信息 */}
        <div className="p-6 border-t border-gray-200 bg-gray-50">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
            <div>
              <p className="text-gray-600">上传者</p>
              <p className="font-semibold text-gray-800">{resource.uploader}</p>
            </div>
            <div>
              <p className="text-gray-600">文件大小</p>
              <p className="font-semibold text-gray-800">
                {(resource.fileSize / 1024 / 1024).toFixed(2)} MB
              </p>
            </div>
            <div>
              <p className="text-gray-600">下载次数</p>
              <p className="font-semibold text-gray-800">{resource.downloadCount}</p>
            </div>
            <div>
              <p className="text-gray-600">上传时间</p>
              <p className="font-semibold text-gray-800">
                {new Date(resource.uploadedAt).toLocaleDateString('zh-CN')}
              </p>
            </div>
          </div>
          {resource.description && (
            <div className="mt-4 pt-4 border-t border-gray-200">
              <p className="text-gray-600 text-sm mb-2">描述</p>
              <p className="text-gray-800">{resource.description}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
