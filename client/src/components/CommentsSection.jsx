import CommentItem from "./CommentItem";

export default function CommentsSection({
  comments,
  newComment,
  onCommentChange,
  onCommentAdd,
}) {
  return (
    <aside className="sidebar-right">
      <div className="comments-section">
        <div className="comments-header">Comments</div>
        <div className="comments-list">
          {comments.length > 0 ? (
            comments.map((comment) => (
              <CommentItem key={comment.id} comment={comment} />
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
            onChange={(e) => onCommentChange(e.target.value)}
            onKeyPress={(e) => e.key === "Enter" && onCommentAdd()}
          />
          <button className="comment-btn" onClick={onCommentAdd}>
            등록
          </button>
        </div>
      </div>
    </aside>
  );
}