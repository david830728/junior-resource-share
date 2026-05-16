'use client';

import { Subject, Grade } from '@/types';
import { Menu, X, LogIn, LogOut, ShieldCheck, User, Search, FolderHeart } from 'lucide-react';
import { useState } from 'react';
import Link from 'next/link';
import { useAuth } from '@/contexts/AuthContext';
import { useRouter } from 'next/navigation';

const SUBJECTS: Subject[] = ['语文', '数学', '英语', '科学', '历史', '地理', '道法'];
const GRADES: Grade[] = ['七上', '七下', '八上', '八下', '九上', '九下'];

interface SidebarProps {
  selectedSubject: string;
  selectedGrade: string;
  searchKeyword: string;
  uploaderFilter: string;
  onSubjectChange: (subject: string) => void;
  onGradeChange: (grade: string) => void;
  onSearchChange: (keyword: string) => void;
  onUploaderFilterChange: (uploader: string) => void;
}

export default function Sidebar({
  selectedSubject,
  selectedGrade,
  searchKeyword,
  uploaderFilter,
  onSubjectChange,
  onGradeChange,
  onSearchChange,
  onUploaderFilterChange,
}: SidebarProps) {
  const [isOpen, setIsOpen] = useState(false);
  const { user, logout } = useAuth();
  const router = useRouter();

  const handleLogout = async () => {
    await logout();
    router.push('/login');
  };

  const navItem = (label: string, active: boolean, onClick: () => void) => (
    <button
      onClick={onClick}
      className={`w-full text-left px-3 py-2 rounded text-sm transition-all relative ${
        active
          ? 'font-bold text-[#4F6EF7] bg-blue-50 before:absolute before:left-0 before:top-1/2 before:-translate-y-1/2 before:w-[3px] before:h-5 before:bg-[#4F6EF7] before:rounded-r'
          : 'text-gray-500 hover:text-gray-800 hover:bg-gray-50'
      }`}
    >
      {label}
    </button>
  );

  const sidebarContent = (
    <div className="flex flex-col h-full">
      {/* 移动端关闭按钮 */}
      <div className="md:hidden px-5 py-3 border-b border-gray-100 flex items-center justify-between">
        <span className="text-sm font-bold text-gray-700">导航菜单</span>
        <button onClick={() => setIsOpen(false)} className="p-1 rounded hover:bg-gray-100">
          <X className="w-4 h-4 text-gray-500" />
        </button>
      </div>

      {/* 用户区域 */}
      <div className="px-5 py-3 border-b border-gray-100">
        {user ? (
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-full bg-[#4F6EF7] flex items-center justify-center text-white text-xs font-bold flex-shrink-0">
                {user.displayName.charAt(0)}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-semibold text-gray-800 truncate">{user.displayName}</p>
                <p className="text-xs text-gray-400">{user.role === 'admin' ? '管理员' : '教师'}</p>
              </div>
            </div>
            <div className="flex gap-1.5">
              {user.role === 'admin' && (
                <Link href="/admin"
                  className="flex-1 flex items-center justify-center gap-1 px-2 py-1 border border-purple-300 text-purple-600 text-xs font-semibold rounded hover:bg-purple-50 transition">
                  <ShieldCheck className="w-3 h-3" />管理
                </Link>
              )}
              <button onClick={handleLogout}
                className="flex-1 flex items-center justify-center gap-1 px-2 py-1 border border-gray-300 text-gray-500 text-xs font-semibold rounded hover:bg-gray-50 transition">
                <LogOut className="w-3 h-3" />退出
              </button>
            </div>
          </div>
        ) : (
          <Link href="/login"
            className="flex items-center justify-center gap-1.5 w-full px-3 py-1.5 border border-[#4F6EF7] text-[#4F6EF7] text-sm font-semibold rounded-lg hover:bg-blue-50 transition">
            <LogIn className="w-3.5 h-3.5" />
            登录 / 申请账号
          </Link>
        )}
      </div>

      {/* 搜索 */}
      <div className="px-5 py-3 border-b border-gray-100 space-y-2">
        <div className="relative">
          <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-gray-400" />
          <input type="text" placeholder="搜索标题、描述..." value={searchKeyword}
            onChange={e => onSearchChange(e.target.value)}
            className="w-full pl-8 pr-3 py-1.5 border border-gray-200 rounded-lg text-sm text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-200" />
        </div>
        <div className="relative">
          <User className="absolute left-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-gray-400" />
          <input type="text" placeholder="按上传者搜索..." value={uploaderFilter}
            onChange={e => onUploaderFilterChange(e.target.value)}
            className="w-full pl-8 pr-3 py-1.5 border border-gray-200 rounded-lg text-sm text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-200" />
        </div>
      </div>

      {/* 上传资源 + 我的校本作业（登录后可见） */}
      {user && (
        <div className="px-5 py-3 border-b border-gray-100 space-y-2">
          <Link href="/upload"
            className="w-full flex items-center justify-center gap-2 px-3 py-2 bg-[#4F6EF7] hover:bg-blue-700 text-white text-sm font-semibold rounded-lg transition">
            <span>&#43;</span> 上传资源
          </Link>
          <Link href="/my-collection"
            className="flex items-center gap-2 px-3 py-2 rounded text-sm text-gray-600 hover:text-[#4F6EF7] hover:bg-blue-50 transition font-medium">
            <FolderHeart className="w-4 h-4" />
            📁 我的校本作业
          </Link>
        </div>
      )}

      {/* 学科 */}
      <div className="px-5 py-3 border-b border-gray-100">
        <p className="text-xs font-semibold text-gray-400 uppercase tracking-wide mb-2">学科</p>
        <div className="space-y-0.5">
          {navItem('全部学科', selectedSubject === '', () => onSubjectChange(''))}
          {SUBJECTS.map(s => navItem(s, selectedSubject === s, () => onSubjectChange(s)))}
        </div>
      </div>

      {/* 学段 */}
      <div className="px-5 py-3">
        <p className="text-xs font-semibold text-gray-400 uppercase tracking-wide mb-2">学段</p>
        <div className="space-y-0.5">
          {navItem('全部学段', selectedGrade === '', () => onGradeChange(''))}
          {GRADES.map(g => navItem(g, selectedGrade === g, () => onGradeChange(g)))}
        </div>
      </div>
    </div>
  );

  return (
    <>
      <button onClick={() => setIsOpen(true)}
        className="fixed top-2 left-2 z-30 md:hidden bg-white border border-gray-200 shadow text-gray-600 px-3 py-2 rounded-lg">
        <Menu className="w-4 h-4" />
      </button>

      {isOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-30 z-40 md:hidden" onClick={() => setIsOpen(false)} />
      )}

      <aside className={`fixed left-0 top-0 h-screen w-[220px] bg-white border-r border-[#EEEEEE] overflow-y-auto transition-transform duration-300 z-50 md:static md:translate-x-0 md:h-auto flex-shrink-0 ${isOpen ? 'translate-x-0' : '-translate-x-full'}`}>
        {sidebarContent}
      </aside>
    </>
  );
}
