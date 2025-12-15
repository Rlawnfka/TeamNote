import TopBtn from "../components/TopBtn";

export default function AIPage({
  currentPage,
  currentContent,
  users,
  onBack,
}) {
  const pageTitle = currentPage?.title || "현재 페이지";

  return (
    <div className="app-container">
      <div className="top-bar">
        <div className="top-logo">TeamNote</div>
        <div className="top-buttons">
          <button
            className="top-btn top-btn-green"
            onClick={onBack}
          >
            ← 돌아가기
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

      <div className="ai-summary-container">
        <h1 className="ai-summary-title">AI 요약 - {pageTitle}</h1>
        <div className="ai-summary-header-line"></div>
        <p className="ai-page-content">{currentContent}</p>

        <div className="ai-summary-actions">
          <button
            className="copy-btn"
            onClick={() => navigator.clipboard.writeText(currentContent)}
          >
            복사
          </button>
        </div>
      </div>
    </div>
  );
}