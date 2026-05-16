'use client';

import { useState, useEffect } from 'react';
import Sidebar from '@/components/Sidebar';
import ResourceList from '@/components/ResourceList';
import ResourceCard from '@/components/ResourceCard';

import { TextbookChapter, Resource } from '@/types';
import axios from 'axios';
import { ChevronDown, ChevronRight, Flame, Clock } from 'lucide-react';

const SEMESTERS = ['七年级上', '七年级下', '八年级上', '八年级下'];
const DIFFICULTIES = ['基础', '提高', '拓展'] as const;

export default function Home() {
  const [refreshKey, setRefreshKey] = useState(0);
  const [selectedSubject, setSelectedSubject] = useState('');
  const [selectedGrade, setSelectedGrade] = useState('');
  const [searchKeyword, setSearchKeyword] = useState('');
  const [uploaderFilter, setUploaderFilter] = useState('');

  // Chapter tree state
  const [selectedSemester, setSelectedSemester] = useState('七年级上');
  const [chapters, setChapters] = useState<TextbookChapter[]>([]);
  const [expandedChapters, setExpandedChapters] = useState<Set<number>>(new Set([1]));
  const [selectedChapterId, setSelectedChapterId] = useState<number | null>(null);
  const [selectedDifficulty, setSelectedDifficulty] = useState<string>('');
  const [selectedChapterLabel, setSelectedChapterLabel] = useState('');

  // Quick entry resources
  const [hotResources, setHotResources] = useState<Resource[]>([]);
  const [newResources, setNewResources] = useState<Resource[]>([]);
  const [quickLoading, setQuickLoading] = useState(true);

  // Fetch chapters when 科学 is selected or semester changes
  useEffect(() => {
    if (selectedSubject === '科学') {
      axios.get(`/api/chapters?subject=科学&semester=${encodeURIComponent(selectedSemester)}`)
        .then(r => { if (r.data.success) setChapters(r.data.data); })
        .catch(() => {});
    }
  }, [selectedSubject, selectedSemester]);

  // Fetch quick entry data
  useEffect(() => {
    setQuickLoading(true);
    Promise.all([
      axios.get('/api/resources?_sort=downloads&_limit=6'),
      axios.get('/api/resources?_sort=newest&_limit=6'),
    ]).then(([hotRes, newRes]) => {
      // Sort client-side since API returns all
      const all = hotRes.data.data || [];
      setHotResources([...all].sort((a: Resource, b: Resource) => b.downloadCount - a.downloadCount).slice(0, 6));
      setNewResources([...all].sort((a: Resource, b: Resource) => new Date(b.uploadedAt).getTime() - new Date(a.uploadedAt).getTime()).slice(0, 6));
    }).catch(() => {}).finally(() => setQuickLoading(false));
  }, [refreshKey]);

  const toggleChapter = (num: number) => {
    setExpandedChapters(prev => {
      const next = new Set(prev);
      next.has(num) ? next.delete(num) : next.add(num);
      return next;
    });
  };

  const selectSection = (chapter: TextbookChapter) => {
    setSelectedChapterId(chapter.id);
    const label = chapter.isSpecial
      ? `${chapter.semester} · ${chapter.sectionTitle}`
      : `${chapter.semester} · 第${chapter.chapterNum}章 · ${chapter.sectionTitle}`;
    setSelectedChapterLabel(label);
    setSelectedDifficulty('');
  };

  // Group chapters by chapterNum
  const chapterGroups = chapters.filter(c => !c.isSpecial).reduce<Record<number, TextbookChapter[]>>((acc, c) => {
    const key = c.chapterNum!;
    if (!acc[key]) acc[key] = [];
    acc[key].push(c);
    return acc;
  }, {});
  const specialSections = chapters.filter(c => c.isSpecial);

  const showChapterTree = selectedSubject === '科学';

  return (
    <div className="min-h-screen flex flex-col bg-[#F5F7FA]">

      {/* ===== 全宽学校横幅 ===== */}
      <div className="relative w-full overflow-hidden flex-shrink-0" style={{ height: '200px' }}>
        {/* 背景图 */}
        <img
          src="/封面1.png"
          alt=""
          className="w-full h-full object-cover"
          style={{ objectPosition: 'center 35%' }}
        />
        {/* 渐变遮罩：左深右淡，保留右侧建筑细节 */}
        <div className="absolute inset-0" style={{
          background: 'linear-gradient(to right, rgba(15,40,90,0.82) 0%, rgba(15,40,90,0.55) 35%, rgba(15,40,90,0.15) 65%, transparent 100%)'
        }} />
        {/* 标题文字 */}
        <div className="absolute inset-0 flex flex-col justify-center px-8 md:px-12">
          <h1 className="text-2xl md:text-4xl font-black text-white tracking-wide drop-shadow-md leading-tight">
            乐清市白石中学
          </h1>
          <p className="text-base md:text-xl text-white/85 mt-1 font-medium drop-shadow">
            教学资源库
          </p>
        </div>
        {/* 移动端菜单按钮放在横幅右上角 */}
        <div className="md:hidden absolute top-3 left-3">
          {/* Sidebar 组件自带 Menu 按钮 */}
        </div>
      </div>

      {/* ===== 侧边栏 + 主内容 ===== */}
      <div className="flex flex-1 min-h-0">
        <Sidebar
          selectedSubject={selectedSubject}
          selectedGrade={selectedGrade}
          searchKeyword={searchKeyword}
          uploaderFilter={uploaderFilter}
          onSubjectChange={s => { setSelectedSubject(s); setSelectedChapterId(null); setSelectedChapterLabel(''); }}
          onGradeChange={setSelectedGrade}
          onSearchChange={setSearchKeyword}
          onUploaderFilterChange={setUploaderFilter}
          onUploadSuccess={() => setRefreshKey(k => k + 1)}
        />

        <main className="flex-1 min-w-0 p-6 pl-20 md:pl-6">

        {/* 快速入口（仅无章节选中时显示） */}
        {!selectedChapterId && !searchKeyword && !uploaderFilter && !selectedSubject && (
          <div className="space-y-6 mb-8">
            {/* 热门资源 */}
            <div>
              <div className="flex items-center gap-2 mb-3">
                <Flame className="w-4 h-4 text-orange-500" />
                <h2 className="text-sm font-bold text-gray-700">热门资源</h2>
              </div>
              {quickLoading ? (
                <p className="text-xs text-gray-400">加载中...</p>
              ) : (
                <div className="flex gap-3 overflow-x-auto pb-2">
                  {hotResources.map(r => (
                    <div key={r.id} className="w-64 flex-shrink-0">
                      <ResourceCard resource={r} />
                    </div>
                  ))}
                </div>
              )}
            </div>
            {/* 最新上传 */}
            <div>
              <div className="flex items-center gap-2 mb-3">
                <Clock className="w-4 h-4 text-blue-500" />
                <h2 className="text-sm font-bold text-gray-700">最新上传</h2>
              </div>
              {quickLoading ? (
                <p className="text-xs text-gray-400">加载中...</p>
              ) : (
                <div className="flex gap-3 overflow-x-auto pb-2">
                  {newResources.map(r => (
                    <div key={r.id} className="w-64 flex-shrink-0">
                      <ResourceCard resource={r} />
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}

        {/* 章节树（科学学科） */}
        {showChapterTree && (
          <div className="flex gap-4 mb-6">
            {/* 左：章节树 */}
            <div className="w-56 flex-shrink-0 bg-white rounded-[8px] shadow-[0_1px_4px_rgba(0,0,0,0.08)] p-3 self-start">
              {/* 学期标签 */}
              <div className="flex flex-wrap gap-1 mb-3">
                {SEMESTERS.map(sem => (
                  <button key={sem} onClick={() => { setSelectedSemester(sem); setSelectedChapterId(null); setSelectedChapterLabel(''); }}
                    className={`text-xs px-2 py-1 rounded-full font-medium transition ${selectedSemester === sem ? 'bg-[#4F6EF7] text-white' : 'bg-gray-100 text-gray-500 hover:bg-gray-200'}`}>
                    {sem.replace('年级', '')}
                  </button>
                ))}
              </div>
              {/* 章节列表 */}
              <div className="space-y-1 text-sm">
                {Object.entries(chapterGroups).map(([num, sections]) => {
                  const chNum = Number(num);
                  const title = sections[0]?.chapterTitle || '';
                  const expanded = expandedChapters.has(chNum);
                  return (
                    <div key={num}>
                      <button onClick={() => toggleChapter(chNum)}
                        className="w-full flex items-center gap-1 px-2 py-1.5 rounded hover:bg-gray-50 text-left font-semibold text-gray-700">
                        {expanded ? <ChevronDown className="w-3 h-3 flex-shrink-0" /> : <ChevronRight className="w-3 h-3 flex-shrink-0" />}
                        <span className="truncate text-xs">第{chNum}章 {title}</span>
                      </button>
                      {expanded && sections.map(sec => (
                        <button key={sec.id} onClick={() => selectSection(sec)}
                          className={`w-full text-left pl-6 pr-2 py-1 text-xs rounded truncate transition ${selectedChapterId === sec.id ? 'text-[#4F6EF7] bg-blue-50 font-semibold' : 'text-gray-500 hover:text-gray-800 hover:bg-gray-50'}`}>
                          {sec.sectionNum}. {sec.sectionTitle}
                        </button>
                      ))}
                    </div>
                  );
                })}
                {specialSections.length > 0 && (
                  <div className="mt-2 pt-2 border-t border-gray-100">
                    {specialSections.map(sec => (
                      <button key={sec.id} onClick={() => selectSection(sec)}
                        className={`w-full text-left px-2 py-1 text-xs rounded transition ${selectedChapterId === sec.id ? 'text-[#4F6EF7] bg-blue-50 font-semibold' : 'text-gray-500 hover:text-gray-800 hover:bg-gray-50'}`}>
                        {sec.sectionTitle}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* 右：资源区 */}
            <div className="flex-1 min-w-0">
              {selectedChapterId ? (
                <>
                  <div className="flex items-center justify-between mb-3">
                    <p className="text-sm text-gray-500">{selectedChapterLabel}</p>
                    <div className="flex gap-1">
                      <button onClick={() => setSelectedDifficulty('')}
                        className={`text-xs px-3 py-1 rounded-full border transition ${!selectedDifficulty ? 'bg-[#4F6EF7] text-white border-[#4F6EF7]' : 'border-gray-200 text-gray-500 hover:bg-gray-50'}`}>全部</button>
                      {DIFFICULTIES.map(d => (
                        <button key={d} onClick={() => setSelectedDifficulty(selectedDifficulty === d ? '' : d)}
                          className={`text-xs px-3 py-1 rounded-full border transition ${selectedDifficulty === d ? 'bg-[#4F6EF7] text-white border-[#4F6EF7]' : 'border-gray-200 text-gray-500 hover:bg-gray-50'}`}>{d}</button>
                      ))}
                    </div>
                  </div>
                  <ResourceList
                    key={`${selectedChapterId}-${selectedDifficulty}-${refreshKey}`}
                    selectedSubject="" selectedGrade="" searchKeyword="" uploaderFilter=""
                    chapterId={selectedChapterId}
                    difficulty={selectedDifficulty || undefined}
                    chapterLabel={selectedChapterLabel}
                  />
                </>
              ) : (
                <div className="text-center py-16 text-gray-400">
                  <p>← 从左侧选择章节查看资源</p>
                </div>
              )}
            </div>
          </div>
        )}

        {/* 普通资源列表（非科学学科，或有搜索条件时） */}
        {(!showChapterTree || searchKeyword || uploaderFilter) && (
          <div>
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-base font-bold text-gray-700">
                {searchKeyword || uploaderFilter || selectedSubject || selectedGrade ? '筛选结果' : '全部资源'}
              </h2>
            </div>
            <ResourceList
              key={`list-${refreshKey}-${uploaderFilter}`}
              selectedSubject={selectedSubject}
              selectedGrade={selectedGrade}
              searchKeyword={searchKeyword}
              uploaderFilter={uploaderFilter}
            />
          </div>
        )}
      </main>
      </div>{/* end flex wrapper */}

    </div>
  );
}
