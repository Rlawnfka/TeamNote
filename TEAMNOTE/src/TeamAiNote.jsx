import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import './TeamAiNote.css';

const TeamAiNote = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [pageTitle, setPageTitle] = useState('');
  const [pageContent, setPageContent] = useState('');
  const [summary, setSummary] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  // location.state에서 페이지 정보 받기
  useEffect(() => {
    if (location.state?.pageTitle && location.state?.pageContent) {
      setPageTitle(location.state.pageTitle);
      setPageContent(location.state.pageContent);
      generateSummary(location.state.pageContent);
    }
  }, [location.state]);

  // AI 요약 생성 함수
  const generateSummary = async (content) => {
    if (!content.trim()) {
      setSummary('요약할 내용이 없습니다.');
      return;
    }

    setIsLoading(true);
    try {
      // 여기에 실제 AI API 호출 코드 추가
      // 예: OpenAI API, Anthropic API 등
      
      // 임시 텍스트 처리 (실제로는 AI API 사용)
      const summaryText = await mockAISummary(content);
      setSummary(summaryText);
    } catch (error) {
      console.error('요약 생성 실패:', error);
      setSummary('요약 생성 중 오류가 발생했습니다.');
    } finally {
      setIsLoading(false);
    }
  };

  // 임시 AI 요약 함수 (실제 API로 교체 필요)
  const mockAISummary = (content) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        // 간단한 요약 로직 (실제로는 AI 모델 사용)
        const sentences = content.split('。|!|\?|\.').filter(s => s.trim());
        const summaryLength = Math.ceil(sentences.length / 3);
        const summary = sentences.slice(0, summaryLength).join('. ');
        resolve(summary || content.substring(0, 200) + '...');
      }, 500);
    });
  };

  return (
    <div className="ai-note-container">
      <div className="ai-note-header">
        <button className="back-btn" onClick={() => navigate(-1)}>
          ← 돌아가기
        </button>
        <h1 className="ai-note-title">AI 요약 - {pageTitle}</h1>
      </div>

      <div className="ai-note-body">
        {/* 원본 내용 */}
        <div className="original-section">
          <h2 className="section-title">📝 원본 내용</h2>
          <div className="original-content">
            <p>{pageContent}</p>
          </div>
        </div>

        {/* AI 요약 */}
        <div className="summary-section">
          <h2 className="section-title">✨ AI 요약</h2>
          {isLoading ? (
            <div className="loading">
              <div className="spinner"></div>
              <p>요약을 생성 중입니다...</p>
            </div>
          ) : (
            <div className="summary-content">
              <p>{summary}</p>
            </div>
          )}
        </div>
      </div>

      {/* 액션 버튼 */}
      <div className="ai-note-actions">
        <button className="copy-btn" onClick={() => navigator.clipboard.writeText(summary)}>
          복사
        </button>
        <button className="regenerate-btn" onClick={() => generateSummary(pageContent)}>
          다시 생성
        </button>
      </div>
    </div>
  );
};

export default TeamAiNote;