import LinkItem from "./LinkItem";

export default function LinkList({
  links,
  onDeleteLink,
  onOpenLink,
  onCopyLinkUrl,
}) {
  return (
    <div className="link-list__section">
      <h2 className="link-list__title">저장된 링크</h2>
      {links.length > 0 ? (
        <div className="link-list">
          {links.map((link) => (
            <LinkItem
              key={link.id}
              link={link}
              onDeleteLink={onDeleteLink}
              onOpenLink={onOpenLink}
              onCopyLinkUrl={onCopyLinkUrl}
            />
          ))}
        </div>
      ) : (
        <p className="link-list__empty">저장된 링크가 없습니다.</p>
      )}
    </div>
  );
}