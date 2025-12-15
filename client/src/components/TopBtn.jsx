export default function TopBtn({
  onSummary,
  onCopyLink,
  currentContent,
  users,
}) {
  return (
    <div className="top-bar">
      <div className="top-logo">TeamNote</div>
      <div className="top-buttons">
        <button
          className="top-btn top-btn-green"
          onClick={onSummary}
          disabled={!currentContent?.trim()}
        >
          현재 페이지 AI 요약 ✨
        </button>
        <button
          className="top-btn top-btn-light"
          onClick={() => alert("전체 AI 요약 기능은 준비 중입니다.")}
        >
          전체 AI 요약 ✨
        </button>
        <button className="top-btn top-btn-dark" onClick={onCopyLink}>
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
  );
}