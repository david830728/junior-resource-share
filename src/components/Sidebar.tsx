'use client';

import { Subject, Grade } from '@/types';
import { Menu, X } from 'lucide-react';
import { useState } from 'react';

const SUBJECTS: Subject[] = ['语文', '数学', '英语', '科学', '历史', '地理', '道法'];
const GRADES: Grade[] = ['七上', '七下', '八上', '八下', '九上', '九下'];

interface SidebarProps {
  selectedSubject: string;
  selectedGrade: string;
  searchKeyword: string;
  onSubjectChange: (subject: string) => void;
  onGradeChange: (grade: string) => void;
  onSearchChange: (keyword: string) => void;
}

export default function Sidebar({
  selectedSubject,
  selectedGrade,
  searchKeyword,
  onSubjectChange,
  onGradeChange,
  onSearchChange,
}: SidebarProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* 移动端菜单按钮 */}
      <button
        onClick={() => setIsOpen(true)}
        className="fixed top-2 left-2 z-30 md:hidden bg-blue-600 text-white px-3 py-2 rounded-lg"
      >
        <Menu className="w-4 h-4" />
      </button>

      {/* 侧边栏背景遮罩（移动端） */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* 侧边栏 */}
      <aside
        className={`fixed left-0 top-0 h-screen w-64 bg-gradient-to-b from-blue-600 to-blue-800 text-white shadow-lg overflow-y-auto transition-transform duration-300 z-50 md:relative md:translate-x-0 md:static md:block ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        {/* 标题 */}
        <div className="p-6 border-b border-blue-500 relative">
          <h1 className="text-2xl font-bold">乐清市白石中学资源分享</h1>
          <p className="text-blue-100 text-sm mt-1">初中教学资源库</p>
          <button
            onClick={() => setIsOpen(false)}
            className="absolute top-4 right-4 md:hidden bg-blue-600 text-white p-2 rounded-lg"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* 搜索框 */}
        <div className="p-6 border-b border-blue-500">
          <input
            type="text"
            placeholder="搜索资源..."
            value={searchKeyword}
            onChange={(e) => onSearchChange(e.target.value)}
            className="w-full px-4 py-2 rounded-lg text-gray-800 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-yellow-300"
          />
        </div>

        {/* 学科筛选 */}
        <div className="p-6 border-b border-blue-500">
          <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
            <span className="w-1 h-6 bg-yellow-300 rounded"></span>
            学科
          </h2>
          <div className="space-y-2">
            <button
              onClick={() => onSubjectChange('')}
              className={`w-full text-left px-4 py-2 rounded-lg transition ${
                selectedSubject === ''
                  ? 'bg-white text-blue-600 font-semibold'
                  : 'text-blue-100 hover:bg-blue-500'
              }`}
            >
              全部学科
            </button>
            {SUBJECTS.map(subject => (
              <button
                key={subject}
                onClick={() => onSubjectChange(subject)}
                className={`w-full text-left px-4 py-2 rounded-lg transition ${
                  selectedSubject === subject
                    ? 'bg-white text-blue-600 font-semibold'
                    : 'text-blue-100 hover:bg-blue-500'
                }`}
              >
                {subject}
              </button>
            ))}
          </div>
        </div>

        {/* 学段筛选 */}
        <div className="p-6 border-b border-blue-500">
          <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
            <span className="w-1 h-6 bg-green-300 rounded"></span>
            学段
          </h2>
          <div className="space-y-2">
            <button
              onClick={() => onGradeChange('')}
              className={`w-full text-left px-4 py-2 rounded-lg transition ${
                selectedGrade === ''
                  ? 'bg-white text-blue-600 font-semibold'
                  : 'text-blue-100 hover:bg-blue-500'
              }`}
            >
              全部学段
            </button>
            {GRADES.map(grade => (
              <button
                key={grade}
                onClick={() => onGradeChange(grade)}
                className={`w-full text-left px-4 py-2 rounded-lg transition ${
                  selectedGrade === grade
                    ? 'bg-white text-blue-600 font-semibold'
                    : 'text-blue-100 hover:bg-blue-500'
                }`}
              >
                {grade}
              </button>
            ))}
          </div>
        </div>

        {/* 统计信息 */}
        <div className="p-6 mt-auto">
          <div className="bg-blue-500 bg-opacity-50 rounded-lg p-4">
            <p className="text-blue-100 text-sm mb-2">💡 提示</p>
            <p className="text-blue-50 text-xs leading-relaxed">
              选择学科和学段来筛选资源，或点击"全部"查看所有资源。
            </p>
          </div>
        </div>
      </aside>
    </>
  );
}
