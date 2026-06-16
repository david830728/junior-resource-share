'use client';

import { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import { TextbookChapter, TextbookSubsection } from '@/types';
import { ChevronDown, ChevronRight, Pencil, Trash2, ArrowUp, ArrowDown, Check, X, Plus } from 'lucide-react';

const SUBJECT_OPTIONS = ['语文', '数学', '英语', '科学', '历史', '地理', '道法'];
const SEMESTER_OPTIONS = ['七年级上', '七年级下', '八年级上', '八年级下', '九年级上', '九年级下'];

type NewItemType = 'chapter' | 'section' | 'special';

interface NewItemForm {
  type: NewItemType;
  chapterNum: string;
  chapterTitle: string;
  sectionNum: string;
  sectionTitle: string;
  code: string;
}

interface EditState {
  id: number;
  sectionTitle: string;
  code: string;
  isChapterEdit: boolean;
  chapterTitle: string;
}

export default function ChapterManager() {
  const [subject, setSubject] = useState('科学');
  const [subjectInput, setSubjectInput] = useState('');
  const [useCustomSubject, setUseCustomSubject] = useState(false);

  const [semester, setSemester] = useState('七年级上');
  const [semesterInput, setSemesterInput] = useState('');
  const [useCustomSemester, setUseCustomSemester] = useState(false);

  const [chapters, setChapters] = useState<TextbookChapter[]>([]);
  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState<{ text: string; ok: boolean } | null>(null);

  const [editState, setEditState] = useState<EditState | null>(null);
  const [expandedChapters, setExpandedChapters] = useState<Set<number>>(new Set());

  const [newItemForm, setNewItemForm] = useState<NewItemForm | null>(null);
  const [saving, setSaving] = useState(false);

  const [deleteConfirm, setDeleteConfirm] = useState<{ id: number; affected: number; title: string } | null>(null);

  // Subsection state
  const [expandedSections, setExpandedSections] = useState<Set<number>>(new Set());
  const [subsectionCache, setSubsectionCache] = useState<Record<number, TextbookSubsection[]>>({});
  const [loadingSubsections, setLoadingSubsections] = useState<Set<number>>(new Set());
  const [subsectionEditState, setSubsectionEditState] = useState<{ id: number; title: string; code: string } | null>(null);
  const [addingSubFor, setAddingSubFor] = useState<number | null>(null);
  const [newSubForm, setNewSubForm] = useState({ title: '', code: '' });
  const [subDeleteConfirm, setSubDeleteConfirm] = useState<{ id: number; affected: number; title: string; sectionId: number } | null>(null);

  const effectiveSubject = useCustomSubject ? subjectInput : subject;
  const effectiveSemester = useCustomSemester ? semesterInput : semester;

  const showMsg = (text: string, ok = true) => {
    setMsg({ text, ok });
    setTimeout(() => setMsg(null), 3000);
  };

  const loadChapters = useCallback(async () => {
    if (!effectiveSubject || !effectiveSemester) return;
    setLoading(true);
    try {
      const res = await axios.get(`/api/chapters?subject=${encodeURIComponent(effectiveSubject)}&semester=${encodeURIComponent(effectiveSemester)}`);
      if (res.data.success) {
        setChapters(res.data.data as TextbookChapter[]);
        const chNums = new Set<number>();
        (res.data.data as TextbookChapter[]).forEach(c => { if (c.chapterNum !== null) chNums.add(c.chapterNum); });
        setExpandedChapters(chNums);
      }
    } catch {
      showMsg('加载章节失败', false);
    } finally {
      setLoading(false);
    }
  }, [effectiveSubject, effectiveSemester]);

  useEffect(() => { loadChapters(); }, [loadChapters]);

  const regularChapters = chapters.filter(c => !c.isSpecial);
  const specialSections = chapters.filter(c => c.isSpecial);

  const chapterGroups = regularChapters.reduce<Record<number, TextbookChapter[]>>((acc, c) => {
    const k = c.chapterNum!;
    if (!acc[k]) acc[k] = [];
    acc[k].push(c);
    return acc;
  }, {});

  const sortedChapterNums = Object.keys(chapterGroups).map(Number).sort((a, b) => a - b);

  const allSorted = [...chapters].sort((a, b) => a.sortOrder - b.sortOrder);

  const moveItem = async (id: number, direction: 'up' | 'down') => {
    const idx = allSorted.findIndex(c => c.id === id);
    if (idx === -1) return;
    const swapIdx = direction === 'up' ? idx - 1 : idx + 1;
    if (swapIdx < 0 || swapIdx >= allSorted.length) return;

    const a = allSorted[idx];
    const b = allSorted[swapIdx];

    try {
      await Promise.all([
        axios.put(`/api/chapters/${a.id}`, { sortOrder: b.sortOrder }),
        axios.put(`/api/chapters/${b.id}`, { sortOrder: a.sortOrder }),
      ]);
      await loadChapters();
    } catch {
      showMsg('移动失败', false);
    }
  };

  const startEdit = (chapter: TextbookChapter) => {
    setEditState({
      id: chapter.id,
      sectionTitle: chapter.sectionTitle,
      code: chapter.code ?? '',
      isChapterEdit: false,
      chapterTitle: chapter.chapterTitle ?? '',
    });
    setNewItemForm(null);
  };

  const startChapterTitleEdit = (chapterNum: number, title: string) => {
    const firstSection = chapterGroups[chapterNum]?.[0];
    if (!firstSection) return;
    setEditState({
      id: firstSection.id,
      sectionTitle: firstSection.sectionTitle,
      code: firstSection.code ?? '',
      isChapterEdit: true,
      chapterTitle: title,
    });
    setNewItemForm(null);
  };

  const saveEdit = async () => {
    if (!editState) return;
    setSaving(true);
    try {
      const body: Record<string, any> = {};
      if (editState.isChapterEdit) {
        body.chapterTitle = editState.chapterTitle;
      } else {
        body.sectionTitle = editState.sectionTitle;
        body.code = editState.code;
      }
      await axios.put(`/api/chapters/${editState.id}`, body);
      showMsg('保存成功');
      setEditState(null);
      await loadChapters();
    } catch {
      showMsg('保存失败', false);
    } finally {
      setSaving(false);
    }
  };

  const requestDelete = async (chapter: TextbookChapter) => {
    try {
      const res = await axios.delete(`/api/chapters/${chapter.id}`);
      if (res.data.affectedResources > 0) {
        setDeleteConfirm({ id: chapter.id, affected: res.data.affectedResources, title: chapter.sectionTitle });
        await loadChapters();
      } else {
        await loadChapters();
        showMsg('已删除');
      }
    } catch {
      showMsg('删除失败', false);
    }
  };

  const confirmDelete = async () => {
    if (!deleteConfirm) return;
    setDeleteConfirm(null);
    showMsg(`已删除，${deleteConfirm.affected} 个资源已变为未分类`);
    await loadChapters();
  };

  // ── Subsection helpers ──
  const loadSubsections = useCallback(async (sectionId: number) => {
    if (subsectionCache[sectionId] !== undefined) return;
    setLoadingSubsections(prev => new Set([...prev, sectionId]));
    try {
      const res = await axios.get(`/api/subsections?chapterId=${sectionId}`);
      if (res.data.success) {
        setSubsectionCache(prev => ({ ...prev, [sectionId]: res.data.data }));
      }
    } catch { /* ignore */ }
    setLoadingSubsections(prev => { const n = new Set(prev); n.delete(sectionId); return n; });
  }, [subsectionCache]);

  const toggleSectionExpand = (sectionId: number) => {
    const next = new Set(expandedSections);
    if (next.has(sectionId)) {
      next.delete(sectionId);
    } else {
      next.add(sectionId);
      loadSubsections(sectionId);
    }
    setExpandedSections(next);
  };

  const moveSubsection = async (sectionId: number, subId: number, direction: 'up' | 'down') => {
    const subs = subsectionCache[sectionId] || [];
    const idx = subs.findIndex(s => s.id === subId);
    const swapIdx = direction === 'up' ? idx - 1 : idx + 1;
    if (idx === -1 || swapIdx < 0 || swapIdx >= subs.length) return;
    const a = subs[idx]; const b = subs[swapIdx];
    try {
      await Promise.all([
        axios.put(`/api/subsections/${a.id}`, { sortOrder: b.sortOrder }),
        axios.put(`/api/subsections/${b.id}`, { sortOrder: a.sortOrder }),
      ]);
      const res = await axios.get(`/api/subsections?chapterId=${sectionId}`);
      if (res.data.success) setSubsectionCache(prev => ({ ...prev, [sectionId]: res.data.data }));
    } catch { showMsg('移动失败', false); }
  };

  const saveSubsectionEdit = async () => {
    if (!subsectionEditState) return;
    setSaving(true);
    try {
      await axios.put(`/api/subsections/${subsectionEditState.id}`, {
        title: subsectionEditState.title,
        code: subsectionEditState.code,
      });
      showMsg('保存成功');
      const sectionId = Object.keys(subsectionCache).find(k =>
        subsectionCache[Number(k)].some(s => s.id === subsectionEditState.id)
      );
      if (sectionId) {
        const res = await axios.get(`/api/subsections?chapterId=${sectionId}`);
        if (res.data.success) setSubsectionCache(prev => ({ ...prev, [Number(sectionId)]: res.data.data }));
      }
      setSubsectionEditState(null);
    } catch { showMsg('保存失败', false); }
    finally { setSaving(false); }
  };

  const requestDeleteSubsection = async (sub: TextbookSubsection, sectionId: number) => {
    try {
      const res = await axios.delete(`/api/subsections/${sub.id}`);
      if (res.data.affectedResources > 0) {
        setSubDeleteConfirm({ id: sub.id, affected: res.data.affectedResources, title: sub.title, sectionId });
      }
      const reload = await axios.get(`/api/subsections?chapterId=${sectionId}`);
      if (reload.data.success) setSubsectionCache(prev => ({ ...prev, [sectionId]: reload.data.data }));
      if (!res.data.affectedResources) showMsg('已删除');
    } catch { showMsg('删除失败', false); }
  };

  const saveNewSubsection = async (sectionId: number) => {
    if (!newSubForm.title.trim()) { showMsg('请填写细目名称', false); return; }
    setSaving(true);
    try {
      await axios.post('/api/subsections', { chapterId: sectionId, title: newSubForm.title.trim(), code: newSubForm.code.trim() || undefined });
      showMsg('已添加');
      setAddingSubFor(null);
      setNewSubForm({ title: '', code: '' });
      const res = await axios.get(`/api/subsections?chapterId=${sectionId}`);
      if (res.data.success) setSubsectionCache(prev => ({ ...prev, [sectionId]: res.data.data }));
    } catch { showMsg('添加失败', false); }
    finally { setSaving(false); }
  };

  const openNewItem = (type: NewItemType) => {
    const maxChapterNum = sortedChapterNums.length > 0 ? Math.max(...sortedChapterNums) : 0;
    const defaultChapterNum = type === 'chapter' ? String(maxChapterNum + 1) : '';
    setNewItemForm({
      type,
      chapterNum: defaultChapterNum,
      chapterTitle: '',
      sectionNum: '',
      sectionTitle: '',
      code: '',
    });
    setEditState(null);
  };

  const saveNewItem = async () => {
    if (!newItemForm) return;
    setSaving(true);
    try {
      const { type, chapterNum, chapterTitle, sectionNum, sectionTitle, code } = newItemForm;
      if (!sectionTitle.trim()) { showMsg('请填写名称', false); setSaving(false); return; }
      if (type !== 'special' && !chapterNum) { showMsg('请填写章序号', false); setSaving(false); return; }

      const body: any = {
        subject: effectiveSubject,
        semester: effectiveSemester,
        sectionTitle: sectionTitle.trim(),
        isSpecial: type === 'special',
      };

      if (type === 'chapter' || type === 'section') {
        body.chapterNum = Number(chapterNum);
        body.chapterTitle = chapterTitle.trim() || null;
        body.sectionNum = sectionNum ? Number(sectionNum) : null;
        body.code = code.trim() || null;
      }

      await axios.post('/api/chapters', body);
      showMsg('已添加');
      setNewItemForm(null);
      await loadChapters();
    } catch {
      showMsg('添加失败', false);
    } finally {
      setSaving(false);
    }
  };

  const rowClass = 'flex items-center gap-2 px-3 py-2 rounded hover:bg-gray-50 group';
  const btnClass = 'p-1 rounded text-gray-400 hover:text-gray-700 hover:bg-gray-100 transition opacity-0 group-hover:opacity-100';
  const activeBtnClass = 'p-1 rounded transition';

  return (
    <div className="space-y-4">
      {/* 顶部消息 */}
      {msg && (
        <div className={`px-4 py-2 rounded text-sm border ${msg.ok ? 'bg-green-50 border-green-200 text-green-700' : 'bg-red-50 border-red-200 text-red-700'}`}>
          {msg.text}
        </div>
      )}

      {/* 学科 + 学期 选择器 */}
      <div className="flex flex-wrap gap-4 items-end">
        <div className="space-y-1">
          <label className="block text-xs font-semibold text-gray-500">学科</label>
          <div className="flex gap-2 items-center">
            <select
              value={useCustomSubject ? '__custom__' : subject}
              onChange={e => {
                if (e.target.value === '__custom__') { setUseCustomSubject(true); }
                else { setUseCustomSubject(false); setSubject(e.target.value); }
              }}
              className="px-3 py-1.5 border border-gray-200 rounded text-sm focus:outline-none focus:ring-2 focus:ring-blue-200"
            >
              {SUBJECT_OPTIONS.map(s => <option key={s} value={s}>{s}</option>)}
              <option value="__custom__">自定义…</option>
            </select>
            {useCustomSubject && (
              <input value={subjectInput} onChange={e => setSubjectInput(e.target.value)}
                placeholder="输入学科名" className="px-3 py-1.5 border border-gray-200 rounded text-sm w-28 focus:outline-none focus:ring-2 focus:ring-blue-200" />
            )}
          </div>
        </div>

        <div className="space-y-1">
          <label className="block text-xs font-semibold text-gray-500">学期</label>
          <div className="flex gap-2 items-center">
            <select
              value={useCustomSemester ? '__custom__' : semester}
              onChange={e => {
                if (e.target.value === '__custom__') { setUseCustomSemester(true); }
                else { setUseCustomSemester(false); setSemester(e.target.value); }
              }}
              className="px-3 py-1.5 border border-gray-200 rounded text-sm focus:outline-none focus:ring-2 focus:ring-blue-200"
            >
              {SEMESTER_OPTIONS.map(s => <option key={s} value={s}>{s}</option>)}
              <option value="__custom__">自定义…</option>
            </select>
            {useCustomSemester && (
              <input value={semesterInput} onChange={e => setSemesterInput(e.target.value)}
                placeholder="如：九年级上" className="px-3 py-1.5 border border-gray-200 rounded text-sm w-32 focus:outline-none focus:ring-2 focus:ring-blue-200" />
            )}
          </div>
        </div>
      </div>

      {/* 章节树 */}
      <div className="border border-gray-200 rounded-lg overflow-hidden">
        <div className="bg-gray-50 px-4 py-2 border-b border-gray-200 flex items-center justify-between">
          <span className="text-xs font-semibold text-gray-500 uppercase tracking-wide">
            {effectiveSubject} · {effectiveSemester}
            {loading && <span className="ml-2 text-blue-400">加载中…</span>}
          </span>
          <span className="text-xs text-gray-400">{chapters.length} 个节点</span>
        </div>

        {chapters.length === 0 && !loading ? (
          <div className="text-center py-10 text-gray-400 text-sm">暂无章节数据，使用下方按钮添加</div>
        ) : (
          <div className="divide-y divide-gray-50 py-1">

            {/* 普通章节分组 */}
            {sortedChapterNums.map(chNum => {
              const sections = chapterGroups[chNum];
              const chTitle = sections[0]?.chapterTitle ?? '';
              const expanded = expandedChapters.has(chNum);

              return (
                <div key={chNum}>
                  {/* 章标题行 */}
                  <div className={`${rowClass} bg-gray-50/80`}>
                    <button onClick={() => setExpandedChapters(prev => {
                      const next = new Set(prev);
                      next.has(chNum) ? next.delete(chNum) : next.add(chNum);
                      return next;
                    })} className="text-gray-400 flex-shrink-0">
                      {expanded ? <ChevronDown className="w-3.5 h-3.5" /> : <ChevronRight className="w-3.5 h-3.5" />}
                    </button>

                    {editState?.isChapterEdit && editState.id === sections[0]?.id ? (
                      <>
                        <input
                          value={editState.chapterTitle}
                          onChange={e => setEditState(s => s ? { ...s, chapterTitle: e.target.value } : s)}
                          className="flex-1 px-2 py-0.5 border border-blue-300 rounded text-sm focus:outline-none focus:ring-2 focus:ring-blue-200"
                          autoFocus
                        />
                        <button onClick={saveEdit} disabled={saving} className={`${activeBtnClass} text-green-600 hover:bg-green-50`}><Check className="w-3.5 h-3.5" /></button>
                        <button onClick={() => setEditState(null)} className={`${activeBtnClass} text-gray-400 hover:bg-gray-100`}><X className="w-3.5 h-3.5" /></button>
                      </>
                    ) : (
                      <>
                        <span className="flex-1 text-sm font-semibold text-gray-700">第{chNum}章 {chTitle}</span>
                        <button onClick={() => startChapterTitleEdit(chNum, chTitle)} className={btnClass} title="编辑章标题">
                          <Pencil className="w-3.5 h-3.5" />
                        </button>
                      </>
                    )}
                  </div>

                  {/* 节列表 */}
                  {expanded && sections.map(sec => {
                    const secExpanded = expandedSections.has(sec.id);
                    const subs = subsectionCache[sec.id] || [];
                    const subLoading = loadingSubsections.has(sec.id);
                    return (
                      <div key={sec.id}>
                        {/* 节行 */}
                        <div className={`${rowClass} pl-8`}>
                          {/* 细目展开按钮 */}
                          <button onClick={() => toggleSectionExpand(sec.id)}
                            title={secExpanded ? '收起细目' : '展开细目'}
                            className="p-0.5 text-blue-400 hover:text-blue-600 flex-shrink-0">
                            {secExpanded ? <ChevronDown className="w-3.5 h-3.5" /> : <ChevronRight className="w-3.5 h-3.5" />}
                          </button>
                          {editState && !editState.isChapterEdit && editState.id === sec.id ? (
                            <>
                              <input value={editState.code} onChange={e => setEditState(s => s ? { ...s, code: e.target.value } : s)}
                                placeholder="编号" className="w-16 px-2 py-0.5 border border-blue-300 rounded text-xs focus:outline-none focus:ring-2 focus:ring-blue-200" />
                              <input value={editState.sectionTitle} onChange={e => setEditState(s => s ? { ...s, sectionTitle: e.target.value } : s)}
                                className="flex-1 px-2 py-0.5 border border-blue-300 rounded text-sm focus:outline-none focus:ring-2 focus:ring-blue-200" autoFocus />
                              <button onClick={saveEdit} disabled={saving} className={`${activeBtnClass} text-green-600 hover:bg-green-50`}><Check className="w-3.5 h-3.5" /></button>
                              <button onClick={() => setEditState(null)} className={`${activeBtnClass} text-gray-400 hover:bg-gray-100`}><X className="w-3.5 h-3.5" /></button>
                            </>
                          ) : (
                            <>
                              {sec.code && <span className="text-xs text-gray-400 font-mono w-8 flex-shrink-0">{sec.code}</span>}
                              <span className="flex-1 text-sm text-gray-600 truncate">{sec.sectionTitle}</span>
                              <button onClick={() => moveItem(sec.id, 'up')} className={btnClass} title="上移"><ArrowUp className="w-3 h-3" /></button>
                              <button onClick={() => moveItem(sec.id, 'down')} className={btnClass} title="下移"><ArrowDown className="w-3 h-3" /></button>
                              <button onClick={() => startEdit(sec)} className={btnClass} title="编辑"><Pencil className="w-3.5 h-3.5" /></button>
                              <button onClick={() => requestDelete(sec)} className={`${btnClass} hover:text-red-500 hover:bg-red-50`} title="删除"><Trash2 className="w-3.5 h-3.5" /></button>
                            </>
                          )}
                        </div>

                        {/* 细目区 */}
                        {secExpanded && (
                          <div className="ml-10 border-l-2 border-blue-100 pl-2 mb-1">
                            {subLoading && <p className="text-xs text-gray-400 py-1 px-2">加载中…</p>}
                            {subs.map(sub => (
                              <div key={sub.id} className="flex items-center gap-1.5 px-2 py-1.5 rounded hover:bg-blue-50/50 group">
                                {subsectionEditState?.id === sub.id ? (
                                  <>
                                    <input value={subsectionEditState.code} onChange={e => setSubsectionEditState(s => s ? { ...s, code: e.target.value } : s)}
                                      placeholder="编号" className="w-14 px-1.5 py-0.5 border border-blue-300 rounded text-xs focus:outline-none" />
                                    <input value={subsectionEditState.title} onChange={e => setSubsectionEditState(s => s ? { ...s, title: e.target.value } : s)}
                                      className="flex-1 px-1.5 py-0.5 border border-blue-300 rounded text-xs focus:outline-none" autoFocus />
                                    <button onClick={saveSubsectionEdit} disabled={saving} className="p-0.5 text-green-600 hover:bg-green-50 rounded"><Check className="w-3 h-3" /></button>
                                    <button onClick={() => setSubsectionEditState(null)} className="p-0.5 text-gray-400 hover:bg-gray-100 rounded"><X className="w-3 h-3" /></button>
                                  </>
                                ) : (
                                  <>
                                    {sub.code && <span className="text-xs font-mono text-blue-400 w-6 flex-shrink-0">{sub.code}</span>}
                                    <span className="flex-1 text-xs text-gray-500 truncate">{sub.title}</span>
                                    <button onClick={() => moveSubsection(sec.id, sub.id, 'up')} className="p-0.5 text-gray-300 hover:text-gray-600 rounded opacity-0 group-hover:opacity-100"><ArrowUp className="w-3 h-3" /></button>
                                    <button onClick={() => moveSubsection(sec.id, sub.id, 'down')} className="p-0.5 text-gray-300 hover:text-gray-600 rounded opacity-0 group-hover:opacity-100"><ArrowDown className="w-3 h-3" /></button>
                                    <button onClick={() => setSubsectionEditState({ id: sub.id, title: sub.title, code: sub.code ?? '' })} className="p-0.5 text-gray-300 hover:text-gray-600 rounded opacity-0 group-hover:opacity-100"><Pencil className="w-3 h-3" /></button>
                                    <button onClick={() => requestDeleteSubsection(sub, sec.id)} className="p-0.5 text-gray-300 hover:text-red-500 rounded opacity-0 group-hover:opacity-100"><Trash2 className="w-3 h-3" /></button>
                                  </>
                                )}
                              </div>
                            ))}

                            {/* 新增细目表单 */}
                            {addingSubFor === sec.id ? (
                              <div className="flex items-center gap-1.5 px-2 py-1.5 bg-blue-50 rounded mt-1">
                                <input value={newSubForm.code} onChange={e => setNewSubForm(f => ({ ...f, code: e.target.value }))}
                                  placeholder="编号" className="w-14 px-1.5 py-0.5 border border-blue-300 rounded text-xs focus:outline-none" />
                                <input value={newSubForm.title} onChange={e => setNewSubForm(f => ({ ...f, title: e.target.value }))}
                                  placeholder="细目名称 *" className="flex-1 px-1.5 py-0.5 border border-blue-300 rounded text-xs focus:outline-none" autoFocus
                                  onKeyDown={e => { if (e.key === 'Enter') saveNewSubsection(sec.id); if (e.key === 'Escape') { setAddingSubFor(null); setNewSubForm({ title: '', code: '' }); } }} />
                                <button onClick={() => saveNewSubsection(sec.id)} disabled={saving} className="p-0.5 text-green-600 hover:bg-green-50 rounded"><Check className="w-3 h-3" /></button>
                                <button onClick={() => { setAddingSubFor(null); setNewSubForm({ title: '', code: '' }); }} className="p-0.5 text-gray-400 hover:bg-gray-100 rounded"><X className="w-3 h-3" /></button>
                              </div>
                            ) : (
                              <button onClick={() => { setAddingSubFor(sec.id); setNewSubForm({ title: '', code: '' }); }}
                                className="flex items-center gap-1 px-2 py-1 text-xs text-blue-500 hover:text-blue-700 hover:bg-blue-50 rounded mt-0.5 w-full">
                                <Plus className="w-3 h-3" />新增细目
                              </button>
                            )}
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              );
            })}

            {/* 特殊条目 */}
            {specialSections.length > 0 && (
              <div>
                <div className="px-3 py-1.5 text-xs font-semibold text-gray-400 bg-gray-50/80 border-t border-gray-100 mt-1">
                  特殊条目
                </div>
                {specialSections.map(sec => (
                  <div key={sec.id} className={`${rowClass} pl-6`}>
                    {editState && !editState.isChapterEdit && editState.id === sec.id ? (
                      <>
                        <input
                          value={editState.sectionTitle}
                          onChange={e => setEditState(s => s ? { ...s, sectionTitle: e.target.value } : s)}
                          className="flex-1 px-2 py-0.5 border border-blue-300 rounded text-sm focus:outline-none focus:ring-2 focus:ring-blue-200"
                          autoFocus
                        />
                        <button onClick={saveEdit} disabled={saving} className={`${activeBtnClass} text-green-600 hover:bg-green-50`}><Check className="w-3.5 h-3.5" /></button>
                        <button onClick={() => setEditState(null)} className={`${activeBtnClass} text-gray-400 hover:bg-gray-100`}><X className="w-3.5 h-3.5" /></button>
                      </>
                    ) : (
                      <>
                        <span className="flex-1 text-sm text-gray-500 italic">{sec.sectionTitle}</span>
                        <button onClick={() => moveItem(sec.id, 'up')} className={btnClass} title="上移"><ArrowUp className="w-3 h-3" /></button>
                        <button onClick={() => moveItem(sec.id, 'down')} className={btnClass} title="下移"><ArrowDown className="w-3 h-3" /></button>
                        <button onClick={() => startEdit(sec)} className={btnClass} title="编辑"><Pencil className="w-3.5 h-3.5" /></button>
                        <button onClick={() => requestDelete(sec)} className={`${btnClass} hover:text-red-500 hover:bg-red-50`} title="删除"><Trash2 className="w-3.5 h-3.5" /></button>
                      </>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* 新增表单（内嵌在树底部） */}
        {newItemForm && (
          <div className="border-t border-blue-100 bg-blue-50 px-4 py-3 space-y-3">
            <p className="text-xs font-semibold text-blue-700">
              {newItemForm.type === 'chapter' ? '新增章节（首节）' : newItemForm.type === 'section' ? '新增节' : '新增特殊条目'}
            </p>
            <div className="flex flex-wrap gap-2">
              {newItemForm.type !== 'special' && (
                <>
                  <input
                    type="number" min="1"
                    value={newItemForm.chapterNum}
                    onChange={e => setNewItemForm(f => f ? { ...f, chapterNum: e.target.value } : f)}
                    placeholder="章序号 *"
                    className="w-24 px-2 py-1.5 border border-gray-200 rounded text-sm focus:outline-none focus:ring-2 focus:ring-blue-200"
                  />
                  {newItemForm.type === 'chapter' && (
                    <input
                      value={newItemForm.chapterTitle}
                      onChange={e => setNewItemForm(f => f ? { ...f, chapterTitle: e.target.value } : f)}
                      placeholder="章标题"
                      className="w-44 px-2 py-1.5 border border-gray-200 rounded text-sm focus:outline-none focus:ring-2 focus:ring-blue-200"
                    />
                  )}
                  <input
                    type="number" min="1"
                    value={newItemForm.sectionNum}
                    onChange={e => setNewItemForm(f => f ? { ...f, sectionNum: e.target.value } : f)}
                    placeholder="节序号"
                    className="w-24 px-2 py-1.5 border border-gray-200 rounded text-sm focus:outline-none focus:ring-2 focus:ring-blue-200"
                  />
                  <input
                    value={newItemForm.code}
                    onChange={e => setNewItemForm(f => f ? { ...f, code: e.target.value } : f)}
                    placeholder="编号 如 1.2"
                    className="w-28 px-2 py-1.5 border border-gray-200 rounded text-sm focus:outline-none focus:ring-2 focus:ring-blue-200"
                  />
                </>
              )}
              <input
                value={newItemForm.sectionTitle}
                onChange={e => setNewItemForm(f => f ? { ...f, sectionTitle: e.target.value } : f)}
                placeholder={newItemForm.type === 'special' ? '条目名称 如：期末 *' : '节标题 *'}
                className="flex-1 min-w-40 px-2 py-1.5 border border-gray-200 rounded text-sm focus:outline-none focus:ring-2 focus:ring-blue-200"
                autoFocus
              />
            </div>
            <div className="flex gap-2">
              <button onClick={saveNewItem} disabled={saving}
                className="px-4 py-1.5 bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold rounded transition disabled:opacity-50">
                {saving ? '保存中…' : '保存'}
              </button>
              <button onClick={() => setNewItemForm(null)}
                className="px-4 py-1.5 border border-gray-200 text-gray-600 text-sm rounded hover:bg-gray-50 transition">
                取消
              </button>
            </div>
          </div>
        )}
      </div>

      {/* 底部按钮 */}
      {!newItemForm && (
        <div className="flex gap-2 flex-wrap">
          <button onClick={() => openNewItem('chapter')}
            className="flex items-center gap-1.5 px-3 py-1.5 bg-white border border-gray-200 hover:border-blue-400 hover:text-blue-600 text-sm text-gray-600 rounded-lg transition">
            <Plus className="w-3.5 h-3.5" />新增章节
          </button>
          <button onClick={() => openNewItem('section')}
            className="flex items-center gap-1.5 px-3 py-1.5 bg-white border border-gray-200 hover:border-blue-400 hover:text-blue-600 text-sm text-gray-600 rounded-lg transition">
            <Plus className="w-3.5 h-3.5" />新增节
          </button>
          <button onClick={() => openNewItem('special')}
            className="flex items-center gap-1.5 px-3 py-1.5 bg-white border border-gray-200 hover:border-purple-400 hover:text-purple-600 text-sm text-gray-600 rounded-lg transition">
            <Plus className="w-3.5 h-3.5" />新增特殊条目
          </button>
        </div>
      )}

      {/* 章节删除确认 */}
      {deleteConfirm && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl shadow-2xl p-6 max-w-sm w-full mx-4">
            <h3 className="text-base font-bold text-gray-800 mb-2">确认删除</h3>
            <p className="text-sm text-gray-600 mb-4">
              「{deleteConfirm.title}」下有 <span className="font-bold text-orange-600">{deleteConfirm.affected}</span> 个资源，
              删除后这些资源将变为未分类，确认继续？
            </p>
            <div className="flex gap-3">
              <button onClick={confirmDelete}
                className="flex-1 py-2 bg-red-500 hover:bg-red-600 text-white text-sm font-semibold rounded-lg transition">
                确认删除
              </button>
              <button onClick={() => setDeleteConfirm(null)}
                className="flex-1 py-2 border border-gray-200 text-gray-600 text-sm font-semibold rounded-lg hover:bg-gray-50 transition">
                取消
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 细目删除确认 */}
      {subDeleteConfirm && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl shadow-2xl p-6 max-w-sm w-full mx-4">
            <h3 className="text-base font-bold text-gray-800 mb-2">确认删除细目</h3>
            <p className="text-sm text-gray-600 mb-4">
              「{subDeleteConfirm.title}」下有 <span className="font-bold text-orange-600">{subDeleteConfirm.affected}</span> 个资源，
              删除后这些资源将变为未分类，确认继续？
            </p>
            <div className="flex gap-3">
              <button onClick={() => { showMsg(`已删除，${subDeleteConfirm.affected} 个资源已变为未分类`); setSubDeleteConfirm(null); }}
                className="flex-1 py-2 bg-red-500 hover:bg-red-600 text-white text-sm font-semibold rounded-lg transition">
                确认删除
              </button>
              <button onClick={() => setSubDeleteConfirm(null)}
                className="flex-1 py-2 border border-gray-200 text-gray-600 text-sm font-semibold rounded-lg hover:bg-gray-50 transition">
                取消
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
