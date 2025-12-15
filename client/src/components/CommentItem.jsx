export default function CommentItem({ comment }) {
  const formatTime = (timestamp) => {
    return `${timestamp.getFullYear()}년 ${String(
      timestamp.getMonth() + 1
    ).padStart(2, "0")}월 ${String(timestamp.getDate()).padStart(2, "0")}일 ${String(
      timestamp.getHours()
    ).padStart(2, "0")}:${String(timestamp.getMinutes()).padStart(2, "0")}`;
  };

  return (
    <div className="comment-item">
      <div className="comment-header">
        <div
          className="comment-avatar"
          style={{ backgroundColor: comment.color }}
        ></div>
        <div className="comment-info">
          <div className="comment-page">"{comment.pageTitle}"</div>
          <div className="comment-time">{formatTime(comment.timestamp)}</div>
        </div>
        <button className="comment-menu">⋮</button>
      </div>
      <div className="comment-body">
        <p className="comment-text">{comment.text}</p>
      </div>
    </div>
  );
}