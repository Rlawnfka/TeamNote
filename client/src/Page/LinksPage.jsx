import TopBtn from "../components/TopBtn";
import Sidebar from "../components/Sidebar";
import CommentsSection from "../components/CommentsSection";
import LinkForm from "../components/LinkForm";
import LinkList from "../components/LinkList";

export default function LinksPage({
  pages,
  activePage,
  links,
  linkUrl,
  linkDescription,
  comments,
  newComment,
  users,
  onPageChange,
  onAddPage,
  onLinkUrlChange,
  onLinkDescriptionChange,
  onAddLink,
  onDeleteLink,
  onOpenLink,
  onCopyLinkUrl,
  onCommentChange,
  onCommentAdd,
  onBack,
}) {
  return (
    <div className="app-container">
      <div className="top-bar">
        <div className="top-logo">TeamNote</div>
        <div className="user-list">
          {users.map((user) => (
            <div key={user.id} className="user-icon" style={{ backgroundColor: user.color }} />
          ))}
        </div>
      </div>

      <div className="layout">
        <Sidebar
          pages={pages}
          activePage={null}
          onPageChange={(pageId) => {
            onPageChange(pageId);
            onBack();
          }}
          onAddPage={onAddPage}
          onLinksClick={() => {}}
          activeView="links"
        />

        <main className="main-content">
          <div className="link-list-container">
            <LinkForm
              linkUrl={linkUrl}
              linkDescription={linkDescription}
              onLinkUrlChange={onLinkUrlChange}
              onLinkDescriptionChange={onLinkDescriptionChange}
              onAddLink={onAddLink}
            />

            <LinkList
              links={links}
              onDeleteLink={onDeleteLink}
              onOpenLink={onOpenLink}
              onCopyLinkUrl={onCopyLinkUrl}
            />
          </div>
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