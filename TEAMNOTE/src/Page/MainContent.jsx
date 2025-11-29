import React, { useState } from 'react';
import './MainContent.css';

const MainContent = ({ activePage, pages, links, onAddLink, onLinkClick }) => {
  const [linkUrl, setLinkUrl] = useState('');
  const [linkDescription, setLinkDescription] = useState('');

  const handleAddLink = () => {
    if (linkUrl.trim()) {
      onAddLink({ url: linkUrl, description: linkDescription });
      setLinkUrl('');
      setLinkDescription('');
    }
  };

  const currentPage = pages.find(p => p.id === activePage);

  return (
    <div className="main-content">
      {activePage === 'links' ? (
        <div className="main-content__links">
          <div className="main-content__add-link-box">
            <label className="add-link-label">Link</label>
            <input
              type="text"
              className="main-content__link-input"
              placeholder="https://www.youtube.com/"
              value={linkUrl}
              onChange={(e) => setLinkUrl(e.target.value)}
            />
            <input
              type="text"
              className="main-content__desc-input"
              placeholder="유튜브 링크"
              value={linkDescription}
              onChange={(e) => setLinkDescription(e.target.value)}
            />
            <button className="main-content__add-btn" onClick={handleAddLink}>
              추가
            </button>
          </div>

          <div className="main-content__link-list">
            {links.map((link) => (
              <div key={link.id} className="link-item">
                <div className="link-item__header">
                  <div className="link-item__user-icon">👤</div>
                  <span className="link-item__date">
                    {link.createdAt.getFullYear()}년 {link.createdAt.getMonth() + 1}월{' '}
                    {link.createdAt.getDate()}일 {String(link.createdAt.getHours()).padStart(2, '0')}:
                    {String(link.createdAt.getMinutes()).padStart(2, '0')}
                  </span>
                  <div className="link-item__actions">
                    <button className="link-item__action-btn">🗑️</button>
                    <button className="link-item__action-btn">✏️</button>
                  </div>
                </div>
                <a 
                  href={link.url} 
                  className="link-item__url"
                  onClick={(e) => {
                    e.preventDefault();
                    onLinkClick(link.url);
                  }}
                >
                  {link.url}
                </a>
                <p className="link-item__description">{link.description}</p>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div className="main-content__page">
          <h2>{currentPage?.name}</h2>
          <p>여기에 {currentPage?.name} 내용이 들어갑니다.</p>
        </div>
      )}
    </div>
  );
};

export default MainContent;