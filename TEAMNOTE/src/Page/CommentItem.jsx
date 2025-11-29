import React from 'react';
import './CommentItem.css';
//코멘트 추가했을 때 나오는 값.
const CommentItem = ({ comment }) => {
  return (
    <div className="comment-item">
      <div className="comment-item__header">
        <span className="comment-item__page">"{comment.page}"</span>
        <div className="comment-item__user">
          <div className="comment-item__avatar"></div>
          <span className="comment-item__menu">⋮</span>
        </div>
      </div>
      
      <p className="comment-item__date">{comment.date}</p>
      <p className="comment-item__content">{comment.content}</p>
    </div>
  );
};

export default CommentItem;