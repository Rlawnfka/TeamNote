export default function LinkForm({
  linkUrl,
  linkDescription,
  onLinkUrlChange,
  onLinkDescriptionChange,
  onAddLink,
}) {
  const isFormValid = linkUrl.trim() && linkDescription.trim();

  return (
    <div className="link-list__add-section">
      <h2 className="link-list__title">링크 추가</h2>
      <div className="link-list__form">
        <div className="link-list__inputs-wrapper">
          <input
            type="url"
            className="link-list__input"
            placeholder="https://www.youtube.com/"
            value={linkUrl}
            onChange={(e) => onLinkUrlChange(e.target.value)}
          />
          <input
            type="text"
            className="link-list__input"
            placeholder="링크 설명*"
            value={linkDescription}
            onChange={(e) => onLinkDescriptionChange(e.target.value)}
          />
        </div>
        <button 
          className="link-list__add-btn" 
          onClick={onAddLink}
          disabled={!isFormValid}
        >
          추가
        </button>
      </div>
    </div>
  );
}