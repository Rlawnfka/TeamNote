import React, { useState } from 'react';
import './LinkItem.css';

const LinkItem = ({ link, onDelete }) => {
  const [isHovered, setIsHovered] = useState(false);

  const formatDate = (date) => {
    const d = new Date(date);
    const year = d.getFullYear();
    const month = String(d.getMonth() + 1).padStart(2, '0');
    const day = String(d.getDate()).padStart(2, '0');
    const hours = String(d.getHours()).padStart(2, '0');
    const minutes = String(d.getMinutes()).padStart(2, '0');
    return `${year}년 ${month}월 ${day}일 ${hours}:${minutes}`;
  };

  const handleDelete = () => {
    if (window.confirm('이 링크를 삭제하시겠습니까?')) {
      onDelete();
    }
  };

  const handleCopyLink = (url) => {
    navigator.clipboard.writeText(url).then(() => {
      alert('링크가 복사되었습니다!');
    }).catch(() => {
      alert('링크 복사에 실패했습니다.');
    });
  };

  const openLink = (url) => {
    window.open(url, '_blank');
  };

  return (
    <div 
      className="link-item"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="link-item__header">
        <div className="link-item__info">
          <span className="link-item__icon">🔗</span>
          <span className="link-item__date">{formatDate(link.createdAt)}</span>
        </div>
        <div className={`link-item__actions ${isHovered ? 'link-item__actions--visible' : ''}`}>
          <button 
            className="link-item__action-btn link-item__action-btn--copy"
            onClick={() => handleCopyLink(link.url)}
            title="복사"
          >
            📋
          </button>
          <button 
            className="link-item__action-btn link-item__action-btn--open"
            onClick={() => openLink(link.url)}
            title="새탭에서 열기"
          >
            ↗️
          </button>
          <button 
            className="link-item__action-btn link-item__action-btn--delete"
            onClick={handleDelete}
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
          openLink(link.url);
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
};

export default LinkItem;