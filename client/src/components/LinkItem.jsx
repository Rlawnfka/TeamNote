export default function LinkItem({
  link,
  onDeleteLink,
  onOpenLink,
  onCopyLinkUrl,
}) {
  const formatDate = (date) => {
    const d = new Date(date);
    const year = d.getFullYear();
    const month = String(d.getMonth() + 1).padStart(2, "0");
    const day = String(d.getDate()).padStart(2, "0");
    const hours = String(d.getHours()).padStart(2, "0");
    const minutes = String(d.getMinutes()).padStart(2, "0");
    return `${year}년 ${month}월 ${day}일 ${hours}:${minutes}`;
  };

  return (
    <div className="link-item">
      <div className="link-item__header">
        <div className="link-item__info">
          <span className="link-item__icon">🔗</span>
          <span className="link-item__date">{formatDate(link.createdAt)}</span>
        </div>
        <div className="link-item__actions link-item__actions--visible">
          <button
            className="link-item__action-btn"
            onClick={() => onCopyLinkUrl(link.url)}
            title="복사"
          >
            📋
          </button>
          <button
            className="link-item__action-btn"
            onClick={() => onOpenLink(link.url)}
            title="새탭에서 열기"
          >
            ↗️
          </button>
          <button
            className="link-item__action-btn"
            onClick={() => onDeleteLink(link.id)}
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
          onOpenLink(link.url);
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
  );
}