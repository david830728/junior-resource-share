'use client';

import { useState } from 'react';
import Sidebar from '@/components/Sidebar';
import ResourceList from '@/components/ResourceList';
import UploadForm from '@/components/UploadForm';

export default function Home() {
  const [refreshKey, setRefreshKey] = useState(0);
  const [selectedSubject, setSelectedSubject] = useState('');
  const [selectedGrade, setSelectedGrade] = useState('');
  const [searchKeyword, setSearchKeyword] = useState('');

  const handleUploadSuccess = () => {
    // 刷新资源列表
    setRefreshKey(prev => prev + 1);
  };

  return (
    <div className="flex min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* 左侧菜单栏 */}
      <Sidebar
        selectedSubject={selectedSubject}
        selectedGrade={selectedGrade}
        searchKeyword={searchKeyword}
        onSubjectChange={setSelectedSubject}
        onGradeChange={setSelectedGrade}
        onSearchChange={setSearchKeyword}
      />

      {/* 右侧资源列表 */}
      <main className="flex-1 md:ml-0">
        <ResourceList 
          key={refreshKey} 
          selectedSubject={selectedSubject} 
          selectedGrade={selectedGrade}
          searchKeyword={searchKeyword}
        />
      </main>

      {/* 上传按钮 */}
      <UploadForm onSuccess={handleUploadSuccess} />
    </div>
  );
}
