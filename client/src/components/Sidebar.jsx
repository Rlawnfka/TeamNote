export default function Sidebar({
  pages,
  activePage,
  onPageChange,
  onAddPage,
  onLinksClick,
  activeView,
}) {
  return (
    <aside className="sidebar-left">
      <div className="pages">
        {pages.map((page) => (
          <button
            key={page.id}
            className={
              activePage === page.id ? "page-item active" : "page-item"
            }
            onClick={() => onPageChange(page.id)}
          >
            <span>{page.title}</span>
            <span className="page-icon">⋮</span>
          </button>
        ))}

        <button
          className={activeView === "links" ? "links-item active" : "links-item"}
          onClick={onLinksClick}
        >
          <span className="link-icon">🔗</span>
          <span>Links</span>
          <span className="page-icon">⋮</span>
        </button>
      </div>

      <button className="add-page" onClick={onAddPage}>
        + 페이지 추가
      </button>
    </aside>
  );
}