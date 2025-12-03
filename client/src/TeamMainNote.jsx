import { useState } from "react";
import "./main.css";
import Link from "./link";

export default function Main() {
    const [activePage, setActivePage] = useState("page1");
    const [pages, setPages] = useState([{ id: "page1", title: "PAGE 1" }]);

    const [pageContents, setPageContents] = useState({ page1: ""});
    //회원 들어오면 하는 동기화 (아직은 테스트 구현)
    const users = [
        { id: 1, color: "#00bcd4" },
        { id: 2, color: "#ffd700" },
        { id: 3, color: "#ff69b4" },
        { id: 4, color: "#9370db" }
    ];

    const addPage = () => {
        const newId = `page${pages.length + 1}`;
        setPages([...pages, { id: newId, title: `PAGE ${pages.length + 1}` }]);
        setPageContents({ ...pageContents, [newId]: "" });
        setActivePage(newId);
    };

    const updatePageTitle = (pageId, newTitle) => {
    setPages(pages.map(p =>
        p.id === pageId ? { ...p, title: newTitle || p.title } : p
    ));
    };

    const updatePageContent = (pageId, content) => {
        setPageContents({ ...pageContents, [pageId]: content });
    };

    const currentPage = useMemo(() => {
        console.log("현재 페이지 계산 중...");
        return pages.find(p => p.id === activePage);
    }, [pages, activePage]);

    const currentContent = useMemo(() => {
        return pageContents[activePage] || "";
    }, [pageContents, activePage]);

    return (
    <div className="app-container">
      {/* TOP BAR */}
      <div className="top-bar">
        <div className="top-logo">TeamNote</div>
        <div className="user-list">
          {users.map((user) => (
            <div
              key={user.id}
              className="user-icon"
              style={{ backgroundColor: user.color }}
            />
          ))}
        </div>
      </div>

      <div className="layout">
        {/* LEFT SIDEBAR */}
        <aside className="sidebar-left">
          <div className="left-actions">
            <button className="action-btn action-btn-green">현재 페이지 AI 요약</button>
            <button className="action-btn action-btn-light">전체 AI 요약</button>
            <button className="action-btn action-btn-dark">링크 복사</button>
          </div>

          <div className="pages">
            {pages.map((page) => (
              <button
                key={page.id}
                className={activePage === page.id ? "page-item active" : "page-item"}
                onClick={() => setActivePage(page.id)}
              >
                <span>{page.title}</span>
                <span className="page-icon">⋮</span>
              </button>
            ))}

            <button
              className={activePage === "links" ? "links-item active" : "links-item"}
              onClick={() => setActivePage("links")}
            >
              <span className="link-icon">🔗</span>
              <span>Links</span>
              <span className="page-icon">⋮</span>
            </button>
          </div>

          <button className="add-page" onClick={addPage}>+ 페이지 추가</button>
        </aside>

        {/* MAIN CONTENT */}
        <main className="main-content">
          {activePage === "links" ? (
            <Link />
          ) : currentPage ? (
            <>
              <div className="content-header">
                <input 
                  type="text" 
                  className="title-input" 
                  placeholder={currentPage.title}
                  value={currentPage.title}
                  onChange={(e) => updatePageTitle(activePage, e.target.value)}
                />
              </div>
              <textarea
                className="content-textarea"
                placeholder="텍스트를 입력해 주세요..."
                value={currentContent}
                onChange={(e) => updatePageContent(activePage, e.target.value)}
              />
            </>
          ) : null}
        </main>

        {/* RIGHT SIDEBAR */}
        <aside className="sidebar-right">
          <div className="comments-section">
            <div className="comments-header">Comments</div>
            <div className="comments-empty">
              <p className="no-comments-text">아직 댓글이 없습니다</p>
              <button className="add-comment-btn">+ 댓글 추가하기</button>
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
}