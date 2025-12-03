import React from "react";
import { useNavigate } from "react-router-dom";
import "./Header.css";

const Header = ({ currentPageTitle = "", currentPageContent = "", allPagesData = [] }) => {
  const navigate = useNavigate();

  const handlePageSummary = () => {
    // 현재 페이지 AI 요약으로 이동
    navigate("/ai-summary", {
      state: {
        pageTitle: currentPageTitle || "현재 페이지",
        pageContent: currentPageContent,
        summaryType: "page"
      }
    });
  };

  const handleTotalSummary = () => {
    // 전체 페이지 AI 요약으로 이동
    const allContent = allPagesData
      .map(page => `[${page.title}]\n${page.content}`)
      .join("\n\n---\n\n");
    
    navigate("/ai-summary", {
      state: {
        pageTitle: "전체 페이지",
        pageContent: allContent,
        summaryType: "total"
      }
    });
  };

  return (
    <header className="header">
      <button 
        className="ai-btn" 
        onClick={handlePageSummary}
        disabled={!currentPageContent.trim()}
      >
        현재 페이지 AI 요약 ✨
      </button>

      <button 
        className="ai-btn light" 
        onClick={handleTotalSummary}
        disabled={allPagesData.length === 0}
      >
        전체 AI 요약 ✨
      </button>
    </header>
  );
};

export default Header;