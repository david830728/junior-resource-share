'use client';

import { useState } from 'react';
import { Subject, Grade } from '@/types';
import { Upload, X } from 'lucide-react';
import axios from 'axios';

const SUBJECTS: Subject[] = ['语文', '数学', '英语', '科学', '历史', '地理', '道法'];
const GRADES: Grade[] = ['七上', '七下', '八上', '八下', '九上', '九下'];

interface UploadFormProps {
  onSuccess?: () => void;
}

export default function UploadForm({ onSuccess }: UploadFormProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [file, setFile] = useState<File | null>(null);
  const [formData, setFormData] = useState({
    title: '',
    subject: '' as Subject | '',
    grade: '' as Grade | '',
    description: '',
    uploader: '',
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      // 检查文件大小（500MB）
      if (selectedFile.size > 500 * 1024 * 1024) {
        setError('文件过大，最大限制 500MB');
        return;
      }
      setFile(selectedFile);
      setError('');
    }
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    // 验证
    if (!file) {
      setError('请选择文件');
      return;
    }
    if (!formData.title.trim()) {
      setError('请输入资源标题');
      return;
    }
    if (!formData.subject) {
      setError('请选择学科');
      return;
    }
    if (!formData.grade) {
      setError('请选择学段');
      return;
    }
    if (!formData.uploader.trim()) {
      setError('请输入上传者名称');
      return;
    }

    try {
      setLoading(true);
      const uploadFormData = new FormData();
      uploadFormData.append('file', file);
      uploadFormData.append('title', formData.title);
      uploadFormData.append('subject', formData.subject);
      uploadFormData.append('grade', formData.grade);
      uploadFormData.append('description', formData.description);
      uploadFormData.append('uploader', formData.uploader);

      const response = await axios.post('/api/resources/upload', uploadFormData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      if (response.data.success) {
        setSuccess('上传成功！');
        setFile(null);
        setFormData({
          title: '',
          subject: '',
          grade: '',
          description: '',
          uploader: '',
        });
        setTimeout(() => {
          setIsOpen(false);
          onSuccess?.();
        }, 1500);
      }
    } catch (err) {
      setError('上传失败，请重试');
      console.error('Upload error:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {/* 上传按钮 */}
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-8 right-8 bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white rounded-full p-4 shadow-lg hover:shadow-xl transition flex items-center gap-2 font-semibold"
      >
        <Upload className="w-6 h-6" />
        上传资源
      </button>

      {/* 模态框 */}
      {isOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            {/* 头部 */}
            <div className="sticky top-0 bg-gradient-to-r from-green-500 to-emerald-600 text-white p-6 flex items-center justify-between">
              <h2 className="text-2xl font-bold">上传资源</h2>
              <button
                onClick={() => setIsOpen(false)}
                className="hover:bg-white hover:bg-opacity-20 p-1 rounded transition"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            {/* 表单 */}
            <form onSubmit={handleSubmit} className="p-6 space-y-4">
              {/* 错误提示 */}
              {error && (
                <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded">
                  {error}
                </div>
              )}

              {/* 成功提示 */}
              {success && (
                <div className="bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded">
                  {success}
                </div>
              )}

              {/* 文件上传 */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  选择文件 *
                </label>
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-blue-500 transition cursor-pointer">
                  <input
                    type="file"
                    onChange={handleFileChange}
                    className="hidden"
                    id="file-input"
                  />
                  <label htmlFor="file-input" className="cursor-pointer">
                    {file ? (
                      <div>
                        <p className="text-gray-700 font-semibold">{file.name}</p>
                        <p className="text-gray-500 text-sm">
                          {(file.size / 1024 / 1024).toFixed(2)} MB
                        </p>
                      </div>
                    ) : (
                      <div>
                        <Upload className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                        <p className="text-gray-600">点击选择文件或拖拽上传</p>
                        <p className="text-gray-500 text-sm">支持 PDF、PPT、Word、视频、图片等</p>
                      </div>
                    )}
                  </label>
                </div>
              </div>

              {/* 资源标题 */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  资源标题 *
                </label>
                <input
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleInputChange}
                  placeholder="例如：七年级上册数学第一章"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              {/* 学科和学段 */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    学科 *
                  </label>
                  <select
                    name="subject"
                    value={formData.subject}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="">选择学科</option>
                    {SUBJECTS.map(subject => (
                      <option key={subject} value={subject}>
                        {subject}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    学段 *
                  </label>
                  <select
                    name="grade"
                    value={formData.grade}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="">选择学段</option>
                    {GRADES.map(grade => (
                      <option key={grade} value={grade}>
                        {grade}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* 描述 */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  资源描述
                </label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  placeholder="简要描述资源内容..."
                  rows={3}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              {/* 上传者 */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  上传者名称 *
                </label>
                <input
                  type="text"
                  name="uploader"
                  value={formData.uploader}
                  onChange={handleInputChange}
                  placeholder="您的名字或昵称"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              {/* 按钮 */}
              <div className="flex gap-3 pt-4">
                <button
                  type="button"
                  onClick={() => setIsOpen(false)}
                  className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 font-semibold rounded-lg hover:bg-gray-50 transition"
                >
                  取消
                </button>
                <button
                  type="submit"
                  disabled={loading}
                  className="flex-1 px-4 py-2 bg-gradient-to-r from-green-500 to-emerald-600 text-white font-semibold rounded-lg hover:from-green-600 hover:to-emerald-700 transition disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {loading ? '上传中...' : '上传'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
