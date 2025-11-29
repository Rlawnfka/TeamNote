import React from 'react';
import CommentItem from './CommentItem';
import './CommentSidebar.css';
//댓글 목록 사이드바
const CommentSidebar = ({ comments }) => {
  return (
    <aside className="comment-sidebar">
      <h2 className="comment-sidebar__title">Comments</h2>
      
      <div className="comment-sidebar__list">
        {comments.map((comment) => (
          <CommentItem key={comment.id} comment={comment} />
        ))}
      </div>
    </aside>
  );
};

export default CommentSidebar;