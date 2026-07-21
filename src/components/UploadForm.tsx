'use client';

import { useState, useEffect } from 'react';
import { Subject, Grade, TextbookChapter, TextbookSubsection, Difficulty } from '@/types';
import { Upload, X, LogIn } from 'lucide-react';
import axios from 'axios';
import { useAuth } from '@/contexts/AuthContext';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

const SUBJECTS: Subject[] = ['语文', '数学', '英语', '科学', '历史', '地理', '道法'];
const GRADES: Grade[] = ['七上', '七下', '八上', '八下', '九上', '九下'];
const GRADE_TO_SEMESTER: Partial<Record<Grade, string>> = {
  '七上': '七年级上', '七下': '七年级下',
  '八上': '八年级上', '八下': '八年级下',
  '九上': '九年级上', '九下': '九年级下',
};
const DIFFICULTIES: { value: Difficulty; label: string; color: string }[] = [
  { value: '基础', label: '🔵 基础', color: 'border-blue-400 bg-blue-50 text-blue-700' },
  { value: '提高', label: '🟡 提高', color: 'border-orange-400 bg-orange-50 text-orange-700' },
  { value: '拓展', label: '🔴 拓展', color: 'border-red-400 bg-red-50 text-red-700' },
];

interface UploadFormProps {
  onSuccess?: () => void;
  inline?: boolean;
  standalone?: boolean;
}

export default function UploadForm({ onSuccess, inline = false, standalone = false }: UploadFormProps) {
  const { user } = useAuth();
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [file, setFile] = useState<File | null>(null);
  const [title, setTitle] = useState('');
  const [subject, setSubject] = useState<Subject | ''>('');
  const [grade, setGrade] = useState<Grade | ''>('');
  const [description, setDescription] = useState('');
  const [difficulty, setDifficulty] = useState<Difficulty>('基础');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  // Chapter selection
  const [chapters, setChapters] = useState<TextbookChapter[]>([]);
  const [chapterSelectValue, setChapterSelectValue] = useState(''); // 'ch-{num}' | 'sp-{id}' | ''
  const [selectedSectionId, setSelectedSectionId] = useState<number | null>(null);
  const [selectedChapterId, setSelectedChapterId] = useState<number | null>(null);
  const [autoDetected, setAutoDetected] = useState('');
  // Subsection (4th level)
  const [subsections, setSubsections] = useState<TextbookSubsection[]>([]);
  const [selectedSubsectionId, setSelectedSubsectionId] = useState<number | null>(null);

  useEffect(() => {
    if (subject && grade) {
      const semester = GRADE_TO_SEMESTER[grade as Grade];
      if (semester) {
        axios.get(`/api/chapters?subject=${encodeURIComponent(subject)}&semester=${encodeURIComponent(semester)}`)
          .then(r => { if (r.data.success) setChapters(r.data.data); else setChapters([]); })
          .catch(() => setChapters([]));
      } else { setChapters([]); }
    } else { setChapters([]); }
  }, [subject, grade]);

  useEffect(() => {
    if (selectedSectionId) {
      axios.get(`/api/subsections?chapterId=${selectedSectionId}`)
        .then(r => { if (r.data.success) setSubsections(r.data.data); else setSubsections([]); })
        .catch(() => setSubsections([]));
    } else { setSubsections([]); }
    setSelectedSubsectionId(null);
  }, [selectedSectionId]);

  const chapterGroups = chapters.filter(c => !c.isSpecial).reduce<Record<number, TextbookChapter[]>>((acc, c) => {
    const k = c.chapterNum!;
    if (!acc[k]) acc[k] = [];
    acc[k].push(c);
    return acc;
  }, {});

  const specialItems = chapters.filter(c => c.isSpecial);
  const isSpecialSelected = chapterSelectValue.startsWith('sp-');
  const currentChapterNum = chapterSelectValue.startsWith('ch-') ? Number(chapterSelectValue.slice(3)) : null;
  const sectionsForChapter = currentChapterNum !== null ? (chapterGroups[currentChapterNum] || []) : [];

  const parseChapterFromFilename = (name: string, allChapters: TextbookChapter[]) => {
    const match = name.match(/^(\d+)\.(\d+)(?:\.(\d+))?/);
    if (!match) return null;
    const chNum = Number(match[1]);
    const secNum = Number(match[2]);
    const subsectionCode = match[3] ?? null;
    const section = allChapters.find(c => c.chapterNum === chNum && c.sectionNum === secNum);
    return section ? { section, subsectionCode } : null;
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const f = e.target.files?.[0];
    if (!f) return;
    if (f.size > 500 * 1024 * 1024) { setError('文件过大，最大限制 500MB'); return; }
    setFile(f);
    setError('');
    if (!title) setTitle(f.name.replace(/\.[^.]+$/, ''));

    if (chapters.length > 0) {
      const result = parseChapterFromFilename(f.name, chapters);
      if (result) {
        const { section, subsectionCode } = result;
        setChapterSelectValue(`ch-${section.chapterNum}`);
        setSelectedSectionId(section.id);
        setSelectedChapterId(section.id);
        let detectedMsg = `已自动识别：${section.semester} · ${section.chapterNum === 0 ? '' : `第${section.chapterNum}章 ${section.chapterTitle} · `}第${section.sectionNum}节 ${section.sectionTitle}`;
        if (subsectionCode) {
          // Try to match subsection code after section is loaded
          axios.get(`/api/subsections?chapterId=${section.id}`).then(r => {
            if (r.data.success) {
              const subs: TextbookSubsection[] = r.data.data;
              setSubsections(subs);
              const matched = subs.find(s => s.code === subsectionCode);
              if (matched) {
                setSelectedSubsectionId(matched.id);
                setAutoDetected(detectedMsg + ` · ${matched.title}`);
              } else {
                setAutoDetected(detectedMsg);
              }
            }
          }).catch(() => {});
        } else {
          setAutoDetected(detectedMsg);
        }
      }
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(''); setSuccess('');
    if (!file) { setError('请选择文件'); return; }
    if (!title.trim()) { setError('请输入资源标题'); return; }
    if (!subject) { setError('请选择学科'); return; }
    if (!grade) { setError('请选择学段'); return; }
    if (chapters.length > 0 && !selectedChapterId) { setError('请选择章节位置'); return; }

    try {
      setLoading(true);
      const fd = new FormData();
      fd.append('file', file);
      fd.append('title', title);
      fd.append('subject', subject);
      fd.append('grade', grade);
      fd.append('description', description);
      fd.append('difficulty', difficulty);
      if (selectedChapterId) fd.append('chapterId', String(selectedChapterId));
      if (selectedSubsectionId) fd.append('subsectionId', String(selectedSubsectionId));

      const res = await axios.post('/api/resources/upload', fd, { headers: { 'Content-Type': 'multipart/form-data' } });
      if (res.data.success) {
        setSuccess('上传成功！');
        setFile(null); setTitle(''); setSubject(''); setGrade(''); setDescription('');
        setDifficulty('基础'); setSelectedChapterId(null);
        setChapterSelectValue(''); setSelectedSectionId(null); setSubsections([]); setSelectedSubsectionId(null); setAutoDetected('');
        if (standalone) {
          setTimeout(() => { onSuccess?.(); router.push('/'); }, 1500);
        } else {
          setTimeout(() => { setIsOpen(false); onSuccess?.(); }, 1500);
        }
      }
    } catch { setError('上传失败，请重试'); }
    finally { setLoading(false); }
  };

  if (!user || (user.role !== 'teacher' && user.role !== 'admin')) {
    if (inline || standalone) return null;
    return (
      <Link href="/login"
        className="fixed bottom-8 right-8 bg-gray-400 hover:bg-gray-500 text-white rounded-full p-4 shadow-lg transition flex items-center gap-2 font-semibold">
        <LogIn className="w-6 h-6" />登录后上传
      </Link>
    );
  }

  const formFields = (
    <>
      {/* 命名规范提示 */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg px-4 py-3 text-sm text-blue-700">
        💡 <strong>命名规范：</strong>按章节编号命名可自动识别位置，例如「1.2.3 欧姆定律练习.docx」表示第1章第2节第3课时
      </div>

      {/* 1. 学科 + 学段 */}
      <div className="grid grid-cols-2 gap-3">
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">学科 *</label>
          <select value={subject} onChange={e => { setSubject(e.target.value as Subject); setSelectedChapterId(null); setChapterSelectValue(''); setSelectedSectionId(null); setSubsections([]); setSelectedSubsectionId(null); setAutoDetected(''); }}
            className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-200">
            <option value="">选择学科</option>
            {SUBJECTS.map(s => <option key={s} value={s}>{s}</option>)}
          </select>
        </div>
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">学段 *</label>
          <select value={grade} onChange={e => { setGrade(e.target.value as Grade); setChapterSelectValue(''); setSelectedSectionId(null); setSubsections([]); setSelectedSubsectionId(null); setSelectedChapterId(null); }}
            className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-200">
            <option value="">选择学段</option>
            {GRADES.map(g => <option key={g} value={g}>{g}</option>)}
          </select>
        </div>
      </div>

      {/* 2. 章节位置（学段决定学期，无需单独选学期） */}
      <div>
        <label className="block text-sm font-semibold text-gray-700 mb-2">
          章节位置
          {chapters.length > 0 && <span className="text-red-500 ml-0.5">*</span>}
          {subject && grade && chapters.length === 0 && <span className="text-xs text-gray-400 font-normal ml-1">（该学科暂无章节数据，管理员可在后台添加）</span>}
        </label>
        <div className="grid grid-cols-3 gap-2">
          {/* 选章（含特殊条目：期中/期末/寒暑假等） */}
          <select
            value={chapterSelectValue}
            disabled={chapters.length === 0}
            onChange={e => {
              const val = e.target.value;
              setChapterSelectValue(val);
              setSelectedSectionId(null);
              setSubsections([]); setSelectedSubsectionId(null);
              setSelectedChapterId(val.startsWith('sp-') ? Number(val.slice(3)) : null);
            }}
            className="px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-200 disabled:bg-gray-50 disabled:text-gray-300">
            <option value="">选章</option>
            {Object.keys(chapterGroups).sort((a, b) => Number(a) - Number(b)).map(num => (
              <option key={`ch-${num}`} value={`ch-${num}`}>{Number(num) === 0 ? chapterGroups[0][0]?.chapterTitle : `第${num}章 ${chapterGroups[Number(num)][0]?.chapterTitle}`}</option>
            ))}
            {specialItems.map(sp => (
              <option key={`sp-${sp.id}`} value={`sp-${sp.id}`}>{sp.sectionTitle}</option>
            ))}
          </select>

          {/* 选节（普通章节选中后可用，特殊条目时禁用） */}
          <select
            value={selectedSectionId || ''}
            disabled={!chapterSelectValue || isSpecialSelected}
            onChange={e => {
              const id = e.target.value ? Number(e.target.value) : null;
              setSelectedSectionId(id);
              setSelectedChapterId(id);
            }}
            className="px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-200 disabled:bg-gray-50 disabled:text-gray-300">
            <option value="">选节</option>
            {sectionsForChapter.map(s => (
              <option key={s.id} value={s.id}>{s.sectionNum != null ? `第${s.sectionNum}节 ` : ''}{s.sectionTitle}</option>
            ))}
          </select>

          {/* 选细目（有细目数据时显示） */}
          {subsections.length > 0 && (
            <select
              value={selectedSubsectionId || ''}
              disabled={!selectedSectionId || isSpecialSelected}
              onChange={e => setSelectedSubsectionId(e.target.value ? Number(e.target.value) : null)}
              className="px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-200 disabled:bg-gray-50 disabled:text-gray-300">
              <option value="">选细目</option>
              {subsections.map(s => (
                <option key={s.id} value={s.id}>{s.code ? `${s.code} ` : ''}{s.title}</option>
              ))}
            </select>
          )}
        </div>
      </div>

      {/* 3. 文件选择（选好学科学段后上传，自动识别章节） */}
      <div>
        <label className="block text-sm font-semibold text-gray-700 mb-2">选择文件 *</label>
        <div className="border-2 border-dashed border-gray-200 rounded-lg p-5 text-center hover:border-[#4F6EF7] transition cursor-pointer">
          <input type="file" onChange={handleFileChange} className="hidden" id="file-input" />
          <label htmlFor="file-input" className="cursor-pointer">
            {file ? (
              <div><p className="text-gray-700 font-semibold text-sm">{file.name}</p>
                <p className="text-gray-400 text-xs mt-1">{(file.size / 1024 / 1024).toFixed(2)} MB</p></div>
            ) : (
              <div><Upload className="w-7 h-7 text-gray-300 mx-auto mb-2" />
                <p className="text-gray-500 text-sm">点击选择文件</p>
                <p className="text-gray-400 text-xs">支持 Word、PDF、PPT 等</p></div>
            )}
          </label>
        </div>
        {autoDetected && (
          <p className="mt-1.5 text-xs text-green-600 bg-green-50 border border-green-200 rounded px-3 py-1.5">✓ {autoDetected}</p>
        )}
      </div>

      {/* 4. 标题 */}
      <div>
        <label className="block text-sm font-semibold text-gray-700 mb-2">资源标题 *</label>
        <input type="text" value={title} onChange={e => setTitle(e.target.value)}
          placeholder="例如：1.2.3 欧姆定律练习"
          className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-200" />
      </div>

      {/* 难度 */}
      <div>
        <label className="block text-sm font-semibold text-gray-700 mb-2">难度</label>
        <div className="flex gap-2">
          {DIFFICULTIES.map(d => (
            <button key={d.value} type="button" onClick={() => setDifficulty(d.value)}
              className={`flex-1 py-2 border-2 rounded-lg text-sm font-semibold transition ${difficulty === d.value ? d.color + ' border-opacity-100' : 'border-gray-200 text-gray-400 hover:border-gray-300'}`}>
              {d.label}
            </button>
          ))}
        </div>
      </div>

      {/* 描述 */}
      <div>
        <label className="block text-sm font-semibold text-gray-700 mb-2">试卷使用说明（选填）</label>
        <textarea value={description} onChange={e => setDescription(e.target.value)}
          placeholder="可说明出卷意图、各题设计思路、适用班级建议等，例如：第1-3题考查基础概念，第4题为开放性拓展，建议实验班选做……"
          rows={3}
          className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-200 resize-none" />
      </div>

      {/* 上传者 */}
      <div className="text-xs text-gray-400 bg-gray-50 rounded px-3 py-2">
        上传者：<span className="font-semibold text-gray-600">{user.displayName}</span>
      </div>
    </>
  );

  if (standalone) {
    return (
      <form onSubmit={handleSubmit} className="space-y-4">
        {error && <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-2 rounded text-sm">{error}</div>}
        {success && <div className="bg-green-50 border border-green-200 text-green-700 px-4 py-2 rounded text-sm">{success}</div>}
        {formFields}
        <div className="flex gap-3 pt-2">
          <button type="button" onClick={() => router.back()}
            className="flex-1 px-4 py-2 border border-gray-200 text-gray-600 font-semibold rounded-lg hover:bg-gray-50 transition text-sm">
            返回
          </button>
          <button type="submit" disabled={loading}
            className="flex-1 px-4 py-2 bg-[#4F6EF7] hover:bg-blue-700 text-white font-semibold rounded-lg transition disabled:opacity-50 text-sm">
            {loading ? '上传中...' : '上传'}
          </button>
        </div>
      </form>
    );
  }

  return (
    <>
      {inline ? (
        <button onClick={() => setIsOpen(true)}
          className="w-full flex items-center justify-center gap-2 px-3 py-2 bg-[#4F6EF7] hover:bg-blue-700 text-white text-sm font-semibold rounded-lg transition">
          <Upload className="w-4 h-4" />上传资源
        </button>
      ) : (
        <button onClick={() => setIsOpen(true)}
          className="fixed bottom-8 right-8 bg-[#4F6EF7] hover:bg-blue-700 text-white rounded-full p-4 shadow-lg hover:shadow-xl transition flex items-center gap-2 font-semibold z-40">
          <Upload className="w-6 h-6" />上传资源
        </button>
      )}

      {isOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-2xl max-w-2xl w-full max-h-[92vh] overflow-y-auto">
            <div className="sticky top-0 bg-[#4F6EF7] text-white px-6 py-4 flex items-center justify-between rounded-t-xl">
              <h2 className="text-lg font-bold">上传资源</h2>
              <button onClick={() => setIsOpen(false)} className="p-1 hover:bg-white hover:bg-opacity-20 rounded transition">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="p-6 space-y-4">
              {error && <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-2 rounded text-sm">{error}</div>}
              {success && <div className="bg-green-50 border border-green-200 text-green-700 px-4 py-2 rounded text-sm">{success}</div>}
              {formFields}
              {/* 按钮 */}
              <div className="flex gap-3 pt-2">
                <button type="button" onClick={() => setIsOpen(false)}
                  className="flex-1 px-4 py-2 border border-gray-200 text-gray-600 font-semibold rounded-lg hover:bg-gray-50 transition text-sm">
                  取消
                </button>
                <button type="submit" disabled={loading}
                  className="flex-1 px-4 py-2 bg-[#4F6EF7] hover:bg-blue-700 text-white font-semibold rounded-lg transition disabled:opacity-50 text-sm">
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
