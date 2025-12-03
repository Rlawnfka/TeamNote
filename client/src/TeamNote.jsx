import { useState, useMemo, useEffect } from "react";
import "./App.css";

const STORAGE_KEY = "teamNote_data";

export default function TeamNote() {
    const [view, setView] = useState("main");
    const [activePage, setActivePage] = useState("page1");
    const [pages, setPages] = useState([{ id: "page1", title: "PAGE 1" }]);
    const [pageContents, setPageContents] = useState({ page1: ""});
    const [links, setLinks] = useState([]);
    const [linkUrl, setLinkUrl] = useState('');
    const [linkDescription, setLinkDescription] = useState('');
    const [currentUser, setCurrentUser] = useState(null);
    const [comments, setComments] = useState([]);
    const [newComment, setNewComment] = useState('');
    
    const users = [
        { id: 1, color: "#00bcd4" },
        { id: 2, color: "#ffd700" },
        { id: 3, color: "#ff69b4" },
        { id: 4, color: "#9370db" }
    ];

    // 첫 로드 시 현재 사용자 설정
    useEffect(() => {
        const savedUser = localStorage.getItem("currentUser");
        if (savedUser) {
            setCurrentUser(JSON.parse(savedUser));
        } else {
            const randomUser = users[Math.floor(Math.random() * users.length)];
            setCurrentUser(randomUser);
            localStorage.setItem("currentUser", JSON.stringify(randomUser));
        }
    }, []);

    // 💾 localStorage에서 데이터 로드
    useEffect(() => {
        const savedData = localStorage.getItem(STORAGE_KEY);
        if (savedData) {
            try {
                const parsed = JSON.parse(savedData);
                setPages(parsed.pages || [{ id: "page1", title: "PAGE 1" }]);
                setPageContents(parsed.pageContents || { page1: "" });
                setActivePage(parsed.activePage || "page1");
                if (parsed.links) setLinks(parsed.links);
                if (parsed.comments) setComments(parsed.comments);
            } catch (error) {
                console.error("데이터 로드 실패:", error);
            }
        }
    }, []);

    // 💾 데이터 변경 시 localStorage에 저장
    useEffect(() => {
        const dataToSave = { pages, pageContents, activePage, links, comments };
        localStorage.setItem(STORAGE_KEY, JSON.stringify(dataToSave));
    }, [pages, pageContents, activePage, links, comments]);

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

    const handlePageSummary = () => {
        const currentPage = pages.find(p => p.id === activePage);
        const content = pageContents[activePage] || "";
        if (!content.trim()) {
            alert("요약할 내용이 없습니다.");
            return;
        }
        setView("ai-summary");
    };

    const handleCopyLink = () => {
        const shareUrl = window.location.href;
        navigator.clipboard.writeText(shareUrl).then(() => {
            alert("링크가 복사되었습니다!");
        }).catch(() => {
            alert("링크 복사에 실패했습니다.");
        });
    };

    const handleAddLink = () => {
        if (linkUrl.trim()) {
            const newLink = {
                id: Date.now(),
                url: linkUrl,
                description: linkDescription,
                createdAt: new Date(),
            };
            setLinks([...links, newLink]);
            setLinkUrl('');
            setLinkDescription('');
        } else {
            alert('URL을 입력해주세요.');
        }
    };

    const handleDeleteLink = (linkId) => {
        if (window.confirm('이 링크를 삭제하시겠습니까?')) {
            setLinks(links.filter(l => l.id !== linkId));
        }
    };

    const handleOpenLink = (url) => {
        window.open(url, '_blank');
    };

    const handleCopyLinkUrl = (url) => {
        navigator.clipboard.writeText(url).then(() => {
            alert('링크가 복사되었습니다!');
        }).catch(() => {
            alert('링크 복사에 실패했습니다.');
        });
    };

    const handleAddComment = () => {
        if (newComment.trim() && currentUser) {
            const comment = {
                id: Date.now(),
                userId: currentUser.id,
                color: currentUser.color,
                text: newComment,
                timestamp: new Date(),
                pageId: activePage,
                pageTitle: currentPage?.title || "현재 페이지"
            };
            setComments([...comments, comment]);
            setNewComment('');
        }
    };

    const currentPage = useMemo(() => {
        return pages.find(p => p.id === activePage);
    }, [pages, activePage]);

    const currentContent = useMemo(() => {
        return pageContents[activePage] || "";
    }, [pageContents, activePage]);

    const formatDate = (date) => {
        const d = new Date(date);
        const year = d.getFullYear();
        const month = String(d.getMonth() + 1).padStart(2, '0');
        const day = String(d.getDate()).padStart(2, '0');
        const hours = String(d.getHours()).padStart(2, '0');
        const minutes = String(d.getMinutes()).padStart(2, '0');
        return `${year}년 ${month}월 ${day}일 ${hours}:${minutes}`;
    };

    // ============ MAIN VIEW ============
    if (view === "main") {
        return (
            <div className="app-container">
                {/* TOP BAR */}
                <div className="top-bar">
                    <div className="top-logo">TeamNote</div>
                    <div className="top-buttons">
                        <button 
                            className="top-btn top-btn-green"
                            onClick={handlePageSummary}
                            disabled={!currentContent.trim()}
                        >
                            현재 페이지 AI 요약 ✨
                        </button>
                        <button 
                            className="top-btn top-btn-light"
                            onClick={() => alert("전체 AI 요약 기능은 준비 중입니다.")}
                        >
                            전체 AI 요약 ✨
                        </button>
                        <button 
                            className="top-btn top-btn-dark"
                            onClick={handleCopyLink}
                        >
                            링크 복사
                        </button>
                    </div>
                    <div className="user-list">
                        {users.map((user) => (
                            <div
                                key={user.id}
                                className="user-icon"
                                style={{ backgroundColor: user.color }}
                                title={`User ${user.id}`}
                            />
                        ))}
                    </div>
                </div>

                <div className="layout">
                    {/* LEFT SIDEBAR */}
                    <aside className="sidebar-left">
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
                                className="links-item"
                                onClick={() => setView("links")}
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
                        {currentPage ? (
                            <>
                                <div className="content-header">
                                    <input 
                                        type="text" 
                                        className="title-input" 
                                        value={currentPage.title}
                                        onChange={(e) => updatePageTitle(activePage, e.target.value)}
                                        placeholder="제목을 입력해주세요"
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
                            <div className="comments-list">
                                {comments.length > 0 ? (
                                    comments.map((comment) => (
                                        <div key={comment.id} className="comment-item">
                                            <div className="comment-header">
                                                <div className="comment-avatar" style={{ backgroundColor: comment.color }}></div>
                                                <div className="comment-info">
                                                    <div className="comment-page">"{comment.pageTitle}"</div>
                                                    <div className="comment-time">
                                                        {comment.timestamp.getFullYear()}년 {String(comment.timestamp.getMonth() + 1).padStart(2, '0')}월 {String(comment.timestamp.getDate()).padStart(2, '0')}일 {String(comment.timestamp.getHours()).padStart(2, '0')}:{String(comment.timestamp.getMinutes()).padStart(2, '0')}
                                                    </div>
                                                </div>
                                                <button className="comment-menu">⋮</button>
                                            </div>
                                            <div className="comment-body">
                                                <p className="comment-text">{comment.text}</p>
                                            </div>
                                        </div>
                                    ))
                                ) : (
                                    <p className="no-comments-text">아직 댓글이 없습니다</p>
                                )}
                            </div>
                            <div className="comment-input-box">
                                <input
                                    type="text"
                                    className="comment-input"
                                    placeholder="댓글 작성..."
                                    value={newComment}
                                    onChange={(e) => setNewComment(e.target.value)}
                                    onKeyPress={(e) => e.key === 'Enter' && handleAddComment()}
                                />
                                <button className="comment-btn" onClick={handleAddComment}>등록</button>
                            </div>
                        </div>
                    </aside>
                </div>
            </div>
        );
    }

    // ============ AI SUMMARY VIEW ============
    if (view === "ai-summary") {
        const content = pageContents[activePage] || "";
        const pageTitle = currentPage?.title || "현재 페이지";
        
        return (
            <div className="app-container">
                <div className="top-bar">
                    <div className="top-logo">TeamNote</div>
                    <div className="top-buttons">
                        <button 
                            className="top-btn top-btn-green"
                            onClick={() => setView("main")}
                        >
                            ← 돌아가기
                        </button>
                    </div>
                    <div className="user-list">
                        {users.map((user) => (
                            <div key={user.id} className="user-icon" style={{ backgroundColor: user.color }} />
                        ))}
                    </div>
                </div>

                <div className="ai-summary-container">
                    <h1 className="ai-summary-title">AI 요약 - {pageTitle}</h1>

                    <div className="ai-summary-header-line"></div>

                    <p className="ai-page-content">{content}</p>

                    <div className="ai-summary-actions">
                        <button className="copy-btn" onClick={() => navigator.clipboard.writeText(content.substring(0, 200))}>
                            복사
                        </button>
                    </div>
                </div>
            </div>
        );
    }

    // ============ LINKS VIEW ============
    if (view === "links") {
        return (
            <div className="app-container">
                <div className="top-bar">
                    <div className="top-logo">TeamNote</div>
                    <div className="top-buttons">
                        <button 
                            className="top-btn top-btn-green"
                            onClick={() => setView("main")}
                        >
                            ← 돌아가기
                        </button>
                    </div>
                    <div className="user-list">
                        {users.map((user) => (
                            <div key={user.id} className="user-icon" style={{ backgroundColor: user.color }} />
                        ))}
                    </div>
                </div>

                <div className="layout">
                    {/* LEFT SIDEBAR */}
                    <aside className="sidebar-left">
                        <div className="pages">
                            {pages.map((page) => (
                                <button
                                    key={page.id}
                                    className="page-item"
                                    onClick={() => {
                                        setActivePage(page.id);
                                        setView("main");
                                    }}
                                >
                                    <span>{page.title}</span>
                                    <span className="page-icon">⋮</span>
                                </button>
                            ))}

                            <button className="links-item active">
                                <span className="link-icon">🔗</span>
                                <span>Links</span>
                                <span className="page-icon">⋮</span>
                            </button>
                        </div>

                        <button className="add-page" onClick={addPage}>+ 페이지 추가</button>
                    </aside>

                    {/* MAIN CONTENT - LINKS */}
                    <main className="main-content">
                        <div className="link-list-container">
                            {/* 링크 추가 섹션 */}
                            <div className="link-list__add-section">
                                <h2 className="link-list__title">링크 추가</h2>
                                <div className="link-list__form">
                                    <div className="link-list__inputs-wrapper">
                                        <input
                                            type="url"
                                            className="link-list__input"
                                            placeholder="https://www.youtube.com/"
                                            value={linkUrl}
                                            onChange={(e) => setLinkUrl(e.target.value)}
                                        />
                                        <input
                                            type="text"
                                            className="link-list__input"
                                            placeholder="링크 설명"
                                            value={linkDescription}
                                            onChange={(e) => setLinkDescription(e.target.value)}
                                        />
                                    </div>
                                    <button 
                                        className="link-list__add-btn"
                                        onClick={handleAddLink}
                                    >
                                        추가
                                    </button>
                                </div>
                            </div>

                            {/* 링크 목록 섹션 */}
                            <div className="link-list__section">
                                <h2 className="link-list__title">저장된 링크</h2>
                                {links.length > 0 ? (
                                    <div className="link-list">
                                        {links.map((link) => (
                                            <div key={link.id} className="link-item">
                                                <div className="link-item__header">
                                                    <div className="link-item__info">
                                                        <span className="link-item__icon">🔗</span>
                                                        <span className="link-item__date">{formatDate(link.createdAt)}</span>
                                                    </div>
                                                    <div className="link-item__actions link-item__actions--visible">
                                                        <button 
                                                            className="link-item__action-btn"
                                                            onClick={() => handleCopyLinkUrl(link.url)}
                                                            title="복사"
                                                        >
                                                            📋
                                                        </button>
                                                        <button 
                                                            className="link-item__action-btn"
                                                            onClick={() => handleOpenLink(link.url)}
                                                            title="새탭에서 열기"
                                                        >
                                                            ↗️
                                                        </button>
                                                        <button 
                                                            className="link-item__action-btn"
                                                            onClick={() => handleDeleteLink(link.id)}
                                                            title="삭제"
                                                        >
                                                            🗑️
                                                        </button>
                                                    </div>
                                                </div>
                                                
                                                <a 
                                                    href={link.url}
                                                    className="link-item__url"
                                                    onClick={(e) => {
                                                        e.preventDefault();
                                                        handleOpenLink(link.url);
                                                    }}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                >
                                                    {link.url}
                                                </a>
                                                
                                                {link.description && (
                                                    <p className="link-item__description">{link.description}</p>
                                                )}
                                            </div>
                                        ))}
                                    </div>
                                ) : (
                                    <p className="link-list__empty">저장된 링크가 없습니다.</p>
                                )}
                            </div>
                        </div>
                    </main>

                    {/* RIGHT SIDEBAR */}
                    <aside className="sidebar-right">
                        <div className="comments-section">
                            <div className="comments-header">Comments</div>
                            <div className="comments-list">
                                {comments.length > 0 ? (
                                    comments.map((comment) => (
                                        <div key={comment.id} className="comment-item">
                                            <div className="comment-header">
                                                <div className="comment-avatar" style={{ backgroundColor: comment.color }}></div>
                                                <div className="comment-info">
                                                    <div className="comment-page">"{comment.pageTitle}"</div>
                                                    <div className="comment-time">
                                                        {comment.timestamp.getFullYear()}년 {String(comment.timestamp.getMonth() + 1).padStart(2, '0')}월 {String(comment.timestamp.getDate()).padStart(2, '0')}일 {String(comment.timestamp.getHours()).padStart(2, '0')}:{String(comment.timestamp.getMinutes()).padStart(2, '0')}
                                                    </div>
                                                </div>
                                                <button className="comment-menu">⋮</button>
                                            </div>
                                            <div className="comment-body">
                                                <p className="comment-text">{comment.text}</p>
                                            </div>
                                        </div>
                                    ))
                                ) : (
                                    <p className="no-comments-text">아직 댓글이 없습니다</p>
                                )}
                            </div>
                            <div className="comment-input-box">
                                <input
                                    type="text"
                                    className="comment-input"
                                    placeholder="댓글 작성..."
                                    value={newComment}
                                    onChange={(e) => setNewComment(e.target.value)}
                                    onKeyPress={(e) => e.key === 'Enter' && handleAddComment()}
                                />
                                <button className="comment-btn" onClick={handleAddComment}>등록</button>
                            </div>
                        </div>
                    </aside>
                </div>
            </div>
        );
    }
}