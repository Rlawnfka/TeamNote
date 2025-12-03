import React, { useState } from 'react';
import LinkItem from './LinkItem';
import './LinkList.css';

const LinkList = ({ links, onAddLink, onDeleteLink }) => {
  const [linkUrl, setLinkUrl] = useState('');
  const [linkDescription, setLinkDescription] = useState('');

  const handleAddLink = () => {
    if (linkUrl.trim()) {
      onAddLink(linkUrl, linkDescription);
      setLinkUrl('');
      setLinkDescription('');
    } else {
      alert('URL을 입력해주세요.');
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleAddLink();
    }
  };

  return (
    <div className="link-list-container">
      {/* 링크 추가 섹션 */}
      <div className="link-list__add-section">
        <h2 className="link-list__title">링크 추가</h2>
        <div className="link-list__form">
          <input
            type="url"
            className="link-list__input link-list__input--url"
            placeholder="https://www.youtube.com/"
            value={linkUrl}
            onChange={(e) => setLinkUrl(e.target.value)}
            onKeyPress={handleKeyPress}
          />
          <input
            type="text"
            className="link-list__input link-list__input--desc"
            placeholder="링크 설명"
            value={linkDescription}
            onChange={(e) => setLinkDescription(e.target.value)}
            onKeyPress={handleKeyPress}
          />
          <button 
            className="link-list__add-btn"
            onClick={handleAddLink}
          >
            추가
          </button>
        </div>
      </div>

      {/* 링크 목록 섹션 */}
      <div className="link-list__section">
        <h2 className="link-list__title">저장된 링크</h2>
        {links.length > 0 ? (
          <div className="link-list">
            {links.map((link) => (
              <LinkItem 
                key={link.id} 
                link={link}
                onDelete={() => onDeleteLink(link.id)}
              />
            ))}
          </div>
        ) : (
          <p className="link-list__empty">저장된 링크가 없습니다.</p>
        )}
      </div>
    </div>
  );
};

export default LinkList;