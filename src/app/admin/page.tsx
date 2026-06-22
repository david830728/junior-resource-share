'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';
import axios from 'axios';
import { Users, CheckCircle, XCircle, Trash2, ShieldCheck, ArrowLeft, RefreshCw, BookOpen, KeyRound, X } from 'lucide-react';
import Link from 'next/link';
import ChapterManager from '@/components/ChapterManager';

interface UserRecord {
  id: number;
  username: string;
  displayName: string;
  role: 'admin' | 'teacher' | 'pending';
  createdAt: string;
}

const ROLE_LABELS: Record<string, string> = {
  admin: '管理员',
  teacher: '教师',
  pending: '待审核',
};
const ROLE_COLORS: Record<string, string> = {
  admin: 'bg-purple-100 text-purple-800',
  teacher: 'bg-green-100 text-green-800',
  pending: 'bg-yellow-100 text-yellow-800',
};

export default function AdminPage() {
  const router = useRouter();
  const { user, loading } = useAuth();
  const [users, setUsers] = useState<UserRecord[]>([]);
  const [fetching, setFetching] = useState(true);
  const [msg, setMsg] = useState('');
  const [activeTab, setActiveTab] = useState<'pending' | 'all' | 'chapters'>('pending');
  const [resetTarget, setResetTarget] = useState<UserRecord | null>(null);
  const [newPw, setNewPw] = useState('');
  const [confirmPw, setConfirmPw] = useState('');
  const [pwError, setPwError] = useState('');
  const [pwSaving, setPwSaving] = useState(false);

  useEffect(() => {
    if (!loading && (!user || user.role !== 'admin')) {
      router.push('/login');
    }
  }, [user, loading, router]);

  const fetchUsers = async () => {
    setFetching(true);
    try {
      const res = await axios.get('/api/admin/users');
      setUsers(res.data.data);
    } catch {
      setMsg('获取用户列表失败');
    } finally {
      setFetching(false);
    }
  };

  useEffect(() => {
    if (user?.role === 'admin') fetchUsers();
  }, [user]);

  const updateRole = async (id: number, role: string) => {
    try {
      await axios.patch(`/api/admin/users/${id}`, { role });
      setMsg(`已更新为"${ROLE_LABELS[role]}"`);
      fetchUsers();
      setTimeout(() => setMsg(''), 3000);
    } catch {
      setMsg('操作失败');
    }
  };

  const openReset = (u: UserRecord) => {
    setResetTarget(u);
    setNewPw('');
    setConfirmPw('');
    setPwError('');
  };

  const submitReset = async () => {
    if (newPw.length < 6) { setPwError('密码至少6位'); return; }
    if (newPw !== confirmPw) { setPwError('两次密码不一致'); return; }
    setPwSaving(true);
    try {
      await axios.put(`/api/admin/users/${resetTarget!.id}/reset-password`, { newPassword: newPw });
      setResetTarget(null);
      setMsg(`已成功重置 ${resetTarget!.displayName} 的密码`);
      setTimeout(() => setMsg(''), 3000);
    } catch (err: any) {
      setPwError(err.response?.data?.message || '重置失败');
    } finally {
      setPwSaving(false);
    }
  };

  const deleteUser = async (id: number, username: string) => {
    if (!confirm(`确定要删除账号"${username}"吗？此操作不可撤销。`)) return;
    try {
      await axios.delete(`/api/admin/users/${id}`);
      setMsg('删除成功');
      fetchUsers();
      setTimeout(() => setMsg(''), 3000);
    } catch (err: any) {
      setMsg(err.response?.data?.message || '删除失败');
    }
  };

  if (loading || !user) return null;

  const ResetModal = resetTarget && (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-md mx-4 p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-bold text-gray-800">重置密码</h2>
          <button onClick={() => setResetTarget(null)} className="p-1 text-gray-400 hover:text-gray-600"><X className="w-5 h-5" /></button>
        </div>
        <p className="text-sm text-gray-500 mb-4">
          用户：<span className="font-semibold text-gray-700">{resetTarget.displayName}</span>
          <span className="ml-2 text-gray-400">@{resetTarget.username}</span>
        </p>
        <div className="space-y-3">
          <div>
            <label className="block text-xs font-semibold text-gray-600 mb-1">新密码</label>
            <input
              type="password"
              value={newPw}
              onChange={e => { setNewPw(e.target.value); setPwError(''); }}
              placeholder="至少 6 位"
              className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-200"
            />
          </div>
          <div>
            <label className="block text-xs font-semibold text-gray-600 mb-1">确认新密码</label>
            <input
              type="password"
              value={confirmPw}
              onChange={e => { setConfirmPw(e.target.value); setPwError(''); }}
              placeholder="再次输入"
              onKeyDown={e => e.key === 'Enter' && submitReset()}
              className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-200"
            />
          </div>
          {pwError && <p className="text-xs text-red-500">{pwError}</p>}
        </div>
        <div className="flex gap-3 mt-5">
          <button onClick={() => setResetTarget(null)}
            className="flex-1 py-2 rounded-lg border border-gray-200 text-sm text-gray-600 hover:bg-gray-50 transition">
            取消
          </button>
          <button onClick={submitReset} disabled={pwSaving}
            className="flex-1 py-2 rounded-lg bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold transition disabled:opacity-50">
            {pwSaving ? '保存中…' : '确认重置'}
          </button>
        </div>
      </div>
    </div>
  );

  const pending = users.filter(u => u.role === 'pending');
  const displayed = activeTab === 'pending' ? pending : users;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {ResetModal}
      {/* 顶部导航 */}
      <div className="bg-gradient-to-r from-blue-700 to-indigo-800 text-white px-6 py-4 flex items-center justify-between shadow-lg">
        <div className="flex items-center gap-3">
          <ShieldCheck className="w-6 h-6" />
          <span className="text-xl font-bold">管理员面板</span>
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={fetchUsers}
            className="p-2 hover:bg-white hover:bg-opacity-20 rounded-lg transition"
            title="刷新"
          >
            <RefreshCw className="w-5 h-5" />
          </button>
          <Link
            href="/"
            className="flex items-center gap-2 px-4 py-2 bg-white text-indigo-700 hover:bg-indigo-50 rounded-lg transition text-sm font-semibold"
          >
            <ArrowLeft className="w-4 h-4" />
            返回主页
          </Link>
        </div>
      </div>

      <div className="max-w-5xl mx-auto p-6">
        {msg && (
          <div className="mb-4 bg-blue-50 border border-blue-200 text-blue-700 px-4 py-3 rounded-lg text-sm">
            {msg}
          </div>
        )}

        {/* 统计卡片 */}
        <div className="grid grid-cols-3 gap-4 mb-6">
          {(['pending', 'teacher', 'admin'] as const).map(role => (
            <div key={role} className="bg-white rounded-xl shadow p-5 flex items-center gap-4">
              <div className={`w-12 h-12 rounded-full flex items-center justify-center ${ROLE_COLORS[role]}`}>
                <Users className="w-6 h-6" />
              </div>
              <div>
                <div className="text-2xl font-bold text-gray-800">
                  {users.filter(u => u.role === role).length}
                </div>
                <div className="text-sm text-gray-500">{ROLE_LABELS[role]}</div>
              </div>
            </div>
          ))}
        </div>

        {/* 标签页 */}
        <div className="bg-white rounded-xl shadow overflow-hidden">
          <div className="flex border-b border-gray-200">
            <button
              onClick={() => setActiveTab('pending')}
              className={`flex-1 py-4 text-sm font-semibold transition ${
                activeTab === 'pending'
                  ? 'text-blue-600 border-b-2 border-blue-600 bg-blue-50'
                  : 'text-gray-600 hover:bg-gray-50'
              }`}
            >
              待审核申请
              {pending.length > 0 && (
                <span className="ml-2 bg-yellow-400 text-white text-xs px-2 py-0.5 rounded-full">
                  {pending.length}
                </span>
              )}
            </button>
            <button
              onClick={() => setActiveTab('all')}
              className={`flex-1 py-4 text-sm font-semibold transition ${
                activeTab === 'all'
                  ? 'text-blue-600 border-b-2 border-blue-600 bg-blue-50'
                  : 'text-gray-600 hover:bg-gray-50'
              }`}
            >
              所有用户 ({users.length})
            </button>
            <button
              onClick={() => setActiveTab('chapters')}
              className={`flex-1 py-4 text-sm font-semibold transition flex items-center justify-center gap-1.5 ${
                activeTab === 'chapters'
                  ? 'text-blue-600 border-b-2 border-blue-600 bg-blue-50'
                  : 'text-gray-600 hover:bg-gray-50'
              }`}
            >
              <BookOpen className="w-4 h-4" />
              章节管理
            </button>
          </div>

          {activeTab === 'chapters' ? (
            <div className="p-6">
              <ChapterManager />
            </div>
          ) : fetching ? (
            <div className="text-center py-12 text-gray-500">加载中...</div>
          ) : displayed.length === 0 ? (
            <div className="text-center py-12 text-gray-400">
              {activeTab === 'pending' ? '暂无待审核申请' : '暂无用户'}
            </div>
          ) : (
            <div className="divide-y divide-gray-100">
              {displayed.map(u => (
                <div key={u.id} className="flex items-center justify-between px-6 py-4 hover:bg-gray-50">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-400 to-indigo-500 flex items-center justify-center text-white font-bold">
                      {u.displayName.charAt(0)}
                    </div>
                    <div>
                      <div className="font-semibold text-gray-800">
                        {u.displayName}
                        <span className="text-gray-400 text-sm font-normal ml-2">@{u.username}</span>
                      </div>
                      <div className="text-xs text-gray-400 mt-0.5">
                        注册于 {new Date(u.createdAt).toLocaleDateString('zh-CN')}
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <span className={`px-3 py-1 rounded-full text-xs font-semibold ${ROLE_COLORS[u.role]}`}>
                      {ROLE_LABELS[u.role]}
                    </span>

                    <button
                      onClick={() => openReset(u)}
                      className="flex items-center gap-1 px-3 py-1.5 text-gray-500 hover:text-blue-600 hover:bg-blue-50 border border-gray-200 text-sm rounded-lg transition"
                      title="重置密码"
                    >
                      <KeyRound className="w-3.5 h-3.5" />
                      重置密码
                    </button>

                    {u.role === 'pending' && (
                      <>
                        <button
                          onClick={() => updateRole(u.id, 'teacher')}
                          className="flex items-center gap-1 px-3 py-1.5 bg-green-500 hover:bg-green-600 text-white text-sm font-semibold rounded-lg transition"
                        >
                          <CheckCircle className="w-4 h-4" />
                          批准
                        </button>
                        <button
                          onClick={() => deleteUser(u.id, u.username)}
                          className="flex items-center gap-1 px-3 py-1.5 bg-red-500 hover:bg-red-600 text-white text-sm font-semibold rounded-lg transition"
                        >
                          <XCircle className="w-4 h-4" />
                          拒绝
                        </button>
                      </>
                    )}

                    {u.role === 'teacher' && (
                      <>
                        <button
                          onClick={() => updateRole(u.id, 'admin')}
                          className="flex items-center gap-1 px-3 py-1.5 bg-purple-500 hover:bg-purple-600 text-white text-sm font-semibold rounded-lg transition"
                        >
                          <ShieldCheck className="w-4 h-4" />
                          提升为管理员
                        </button>
                        <button
                          onClick={() => deleteUser(u.id, u.username)}
                          className="p-1.5 text-red-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </>
                    )}

                    {u.role === 'admin' && u.id !== user.id && (
                      <>
                        <button
                          onClick={() => updateRole(u.id, 'teacher')}
                          className="flex items-center gap-1 px-3 py-1.5 bg-gray-400 hover:bg-gray-500 text-white text-sm font-semibold rounded-lg transition"
                        >
                          降为教师
                        </button>
                        <button
                          onClick={() => deleteUser(u.id, u.username)}
                          className="p-1.5 text-red-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </>
                    )}

                    {u.role === 'admin' && u.id === user.id && (
                      <span className="text-xs text-gray-400 italic">（当前账号）</span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

