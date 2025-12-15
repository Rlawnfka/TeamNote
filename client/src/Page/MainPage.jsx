import TopBtn from "../components/TopBtn";
import Sidebar from "../components/Sidebar";
import CommentsSection from "../components/CommentsSection";

export default function MainPage({
  pages,
  activePage,
  currentPage,
  currentContent,
  comments,
  newComment,
  users,
  onPageChange,
  onAddPage,
  onPageTitleChange,
  onContentChange,
  onCommentChange,
  onCommentAdd,
  onSummary,
  onCopyLink,
  onLinksClick,
}) {
  return (
    <div className="app-container">
      <TopBtn
        onSummary={onSummary}
        onCopyLink={onCopyLink}
        currentContent={currentContent}
        users={users}
      />

      <div className="layout">
        <Sidebar
          pages={pages}
          activePage={activePage}
          onPageChange={onPageChange}
          onAddPage={onAddPage}
          onLinksClick={onLinksClick}
          activeView="main"
        />

        <main className="main-content">
          {currentPage ? (
            <>
              <div className="content-header">
                <input
                  type="text"
                  className="title-input"
                  value={currentPage.title}
                  onChange={(e) => onPageTitleChange(activePage, e.target.value)}
                  placeholder="제목을 입력해주세요"
                />
              </div>
              <textarea
                className="content-textarea"
                placeholder="텍스트를 입력해 주세요..."
                value={currentContent}
                onChange={(e) => onContentChange(activePage, e.target.value)}
              />
            </>
          ) : null}
        </main>

        <CommentsSection
          comments={comments}
          newComment={newComment}
          onCommentChange={onCommentChange}
          onCommentAdd={onCommentAdd}
        />
      </div>
    </div>
  );
}