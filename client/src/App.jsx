import { useState, useEffect } from "react";
import './App.css'
import MainPage from "./Page/MainPage";
import AIPage from "./Page/AIPage";
import LinksPage from "./Page/LinksPage";

const STORAGE_KEY = "teamNote_data";

export default function App() {
  const [view, setView] = useState("main");
  const [activePage, setActivePage] = useState("page1");
  const [pages, setPages] = useState([{ id: "page1", title: "PAGE 1" }]);
  const [pageContents, setPageContents] = useState({ page1: "" });
  const [links, setLinks] = useState([]);
  const [linkUrl, setLinkUrl] = useState("");
  const [linkDescription, setLinkDescription] = useState("");
  const [currentUser, setCurrentUser] = useState(null);
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");

  const users = [
    { id: 1, color: "#00bcd4" },
    { id: 2, color: "#ffd700" },
    { id: 3, color: "#ff69b4" },
    { id: 4, color: "#9370db" }
  ];

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
    const content = pageContents[activePage] || "";
    if (!content.trim()) {
      alert("요약할 내용이 없습니다.");
      return;
    }
    setView("summary");
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
      setLinkUrl("");
      setLinkDescription("");
    } else {
      alert("URL을 입력해주세요.");
    }
  };

  const handleDeleteLink = (linkId) => {
    if (window.confirm("이 링크를 삭제하시겠습니까?")) {
      setLinks(links.filter(l => l.id !== linkId));
    }
  };

  const handleOpenLink = (url) => {
    window.open(url, "_blank");
  };

  const handleCopyLinkUrl = (url) => {
    navigator.clipboard.writeText(url).then(() => {
      alert("링크가 복사되었습니다!");
    }).catch(() => {
      alert("링크 복사에 실패했습니다.");
    });
  };

  const handleAddComment = () => {
    if (newComment.trim() && currentUser) {
      const currentPageObj = pages.find(p => p.id === activePage);
      const comment = {
        id: Date.now(),
        userId: currentUser.id,
        color: currentUser.color,
        text: newComment,
        timestamp: new Date(),
        pageId: activePage,
        pageTitle: currentPageObj?.title || "현재 페이지"
      };
      setComments([...comments, comment]);
      setNewComment("");
    }
  };

  const currentPage = pages.find(p => p.id === activePage);
  const currentContent = pageContents[activePage] || "";

  return (
    <>
      {view === "main" && (
        <MainPage
          pages={pages}
          activePage={activePage}
          currentPage={currentPage}
          currentContent={currentContent}
          comments={comments}
          newComment={newComment}
          users={users}
          onPageChange={setActivePage}
          onAddPage={addPage}
          onPageTitleChange={updatePageTitle}
          onContentChange={updatePageContent}
          onCommentChange={setNewComment}
          onCommentAdd={handleAddComment}
          onSummary={handlePageSummary}
          onCopyLink={handleCopyLink}
          onLinksClick={() => setView("links")}
        />
      )}

      {view === "summary" && (
        <AIPage
          currentPage={currentPage}
          currentContent={currentContent}
          users={users}
          onBack={() => setView("main")}
        />
      )}

      {view === "links" && (
        <LinksPage
          pages={pages}
          activePage={activePage}
          links={links}
          linkUrl={linkUrl}
          linkDescription={linkDescription}
          comments={comments}
          newComment={newComment}
          users={users}
          onPageChange={setActivePage}
          onAddPage={addPage}
          onLinkUrlChange={setLinkUrl}
          onLinkDescriptionChange={setLinkDescription}
          onAddLink={handleAddLink}
          onDeleteLink={handleDeleteLink}
          onOpenLink={handleOpenLink}
          onCopyLinkUrl={handleCopyLinkUrl}
          onCommentChange={setNewComment}
          onCommentAdd={handleAddComment}
          onBack={() => setView("main")}
        />
      )}
    </>
  );
}