'use client';

import { useEffect, useState } from 'react';
import { Resource } from '@/types';
import axios from 'axios';
import DeleteConfirmModal from './DeleteConfirmModal';
import ResourceCard from './ResourceCard';

interface ResourceListProps {
  selectedSubject: string;
  selectedGrade: string;
  searchKeyword: string;
  uploaderFilter: string;
  chapterId?: number;
  subsectionId?: number;
  difficulty?: string;
  chapterLabel?: string;
}

export default function ResourceList({
  selectedSubject, selectedGrade, searchKeyword, uploaderFilter,
  chapterId, subsectionId, difficulty, chapterLabel,
}: ResourceListProps) {
  const [resources, setResources] = useState<Resource[]>([]);
  const [filteredResources, setFilteredResources] = useState<Resource[]>([]);
  const [loading, setLoading] = useState(true);
  const [deleteResource, setDeleteResource] = useState<Resource | null>(null);
  const [currentUser, setCurrentUser] = useState<{ id: number; role: string } | null>(null);

  useEffect(() => {
    axios.get('/api/auth/me').then(res => {
      if (res.data.success) setCurrentUser(res.data.user);
    }).catch(() => {});
  }, []);

  useEffect(() => { fetchResources(); }, [uploaderFilter, chapterId, subsectionId, difficulty]);

  const fetchResources = async () => {
    try {
      setLoading(true);
      const params = new URLSearchParams();
      if (uploaderFilter) params.set('uploader', uploaderFilter);
      if (chapterId) params.set('chapterId', String(chapterId));
      if (subsectionId) params.set('subsectionId', String(subsectionId));
      if (difficulty) params.set('difficulty', difficulty);
      const q = params.toString();
      const response = await axios.get(`/api/resources${q ? '?' + q : ''}`);
      if (response.data.success) {
        setResources(response.data.data);
      }
    } catch (error) {
      console.error('获取资源失败:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    let filtered = resources;
    if (selectedSubject) filtered = filtered.filter(r => r.subject === selectedSubject);
    if (selectedGrade) filtered = filtered.filter(r => r.grade === selectedGrade);
    if (searchKeyword.trim()) {
      const kw = searchKeyword.toLowerCase();
      filtered = filtered.filter(r =>
        (r.title?.toLowerCase() || '').includes(kw) ||
        (r.description?.toLowerCase() || '').includes(kw) ||
        (r.subject?.toLowerCase() || '').includes(kw) ||
        (r.grade?.toLowerCase() || '').includes(kw)
      );
    }
    setFilteredResources(filtered);
  }, [selectedSubject, selectedGrade, searchKeyword, resources]);

  return (
    <div>
      {loading ? (
        <div className="text-center py-12 text-gray-400">加载中...</div>
      ) : filteredResources.length === 0 ? (
        <div className="text-center py-12 text-gray-400">暂无资源</div>
      ) : (
        <div className="space-y-2">
          {filteredResources.map(resource => (
            <ResourceCard
              key={resource.id}
              resource={resource}
              chapterLabel={chapterLabel}
              currentUserId={currentUser?.id}
              currentUserRole={currentUser?.role}
              onDelete={() => setDeleteResource(resource)}
            />
          ))}
        </div>
      )}

      <DeleteConfirmModal
        resource={deleteResource}
        onClose={() => setDeleteResource(null)}
        onSuccess={fetchResources}
      />
    </div>
  );
}
