'use client';

import UploadForm from '@/components/UploadForm';
import { useAuth } from '@/contexts/AuthContext';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import Link from 'next/link';
import { ChevronLeft } from 'lucide-react';

export default function UploadPage() {
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && (!user || (user.role !== 'teacher' && user.role !== 'admin'))) {
      router.replace('/login');
    }
  }, [user, loading, router]);

  if (loading || !user) return null;

  return (
    <div className="min-h-screen bg-[#F5F7FA]">
      {/* 顶部栏 */}
      <div className="bg-white border-b border-gray-100 px-6 py-4 flex items-center gap-3">
        <Link href="/" className="flex items-center gap-1 text-sm text-gray-500 hover:text-[#4F6EF7] transition">
          <ChevronLeft className="w-4 h-4" />返回首页
        </Link>
        <span className="text-gray-300">|</span>
        <h1 className="text-base font-bold text-gray-800">上传资源</h1>
      </div>

      {/* 表单区域 */}
      <div className="max-w-2xl mx-auto px-4 py-8">
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <UploadForm standalone />
        </div>
      </div>
    </div>
  );
}
