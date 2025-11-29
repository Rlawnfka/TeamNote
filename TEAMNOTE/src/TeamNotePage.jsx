import React, { useState, useEffect } from 'react';
import Header from './Page/Header';
import Sidebar from './Page/Sidebar';
import MainContent from './Page/MainContent';
import CommentSidebar from './Page/CommentSidebar';
import './TeamNotePage.css';

const STORAGE_KEY = "teamNote_pages_data";

const TeamNotePage = () => {
  const [activePage, setActivePage] = useState('page1');
  const [currentPageTitle, setCurrentPageTitle] = useState('PAGE 1');
  const [currentPageContent, setCurrentPageContent] = useState('');
  
  const [pages, setPages] = useState([
    { id: 'page1', name: 'PAGE 1', icon: null },
    { id: 'page2', name: 'PAGE 2', icon: null },
    { id: 'links', name: 'Links', icon: '🔗' },
  ]);

  const [links, setLinks] = useState([
    {
      id: 1,
      url: 'https://www.youtube.com/',
      description: '유튜브 링크',
      createdAt: new Date('2025-11-01T20:03:00'),
    },
  ]);

  const [comments] = useState([{
    id: 1,
    page: 'PAGE 1',
    date: '2025년 10월 31일  23:03',
    content: 'ppt 플로우 적었습니다.',
  }]);

  // 💾 localStorage에서 데이터 로드
  useEffect(() => {
    const savedData = localStorage.getItem(STORAGE_KEY);
    if (savedData) {
      try {
        const { pagesContent, pagesTitles } = JSON.parse(savedData);
        // 저장된 내용 복원 (필요시 활용)
      } catch (error) {
        console.error("데이터 로드 실패:", error);
      }
    }
  }, []);

  // 💾 페이지 내용 변경 시 localStorage에 저장
  const handlePageContentChange = (newContent) => {
    setCurrentPageContent(newContent);
    savePageData();
  };

  // 💾 페이지 제목 변경 시 localStorage에 저장
  const handlePageTitleChange = (newTitle) => {
    setCurrentPageTitle(newTitle);
    savePageData();
  };

  const savePageData = () => {
    const dataToSave = {
      pagesContent: currentPageContent,
      pagesTitles: currentPageTitle,
      activePage: activePage
    };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(dataToSave));
  };

  // 링크 추가 핸들러
  const handleAddLink = (newLink) => {
    const link = {
      id: Date.now(),
      url: newLink.url,
      description: newLink.description,
      createdAt: new Date(),
    };
    setLinks([link, ...links]);
  };

  // 활성 페이지 변경 시 해당 페이지의 제목과 내용 업데이트
  const handlePageClick = (pageId) => {
    setActivePage(pageId);
    // 실제로는 여기서 페이지별 내용을 불러와야 함
    if (pageId === 'page1') {
      setCurrentPageTitle('PAGE 1');
    } else if (pageId === 'page2') {
      setCurrentPageTitle('PAGE 2');
    }
  };

  // 모든 페이지 데이터 (전체 AI 요약용)
  const allPagesData = pages
    .filter(p => p.id !== 'links')
    .map(page => ({
      title: page.name,
      content: activePage === page.id ? currentPageContent : ''
    }));

  return (
    <div className="teamnote-page">
      <Header 
        currentPageTitle={currentPageTitle}
        currentPageContent={currentPageContent}
        allPagesData={allPagesData}
      />
      
      <div className="teamnote-page__body">
        <Sidebar
          pages={pages}
          activePage={activePage}
          onPageClick={handlePageClick}
        />
        
        <MainContent 
          links={links} 
          onAddLink={handleAddLink}
          currentPageTitle={currentPageTitle}
          currentPageContent={currentPageContent}
          onTitleChange={handlePageTitleChange}
          onContentChange={handlePageContentChange}
        />
        
        <CommentSidebar comments={comments} />
      </div>
    </div>
  );
};

export default TeamNotePage;