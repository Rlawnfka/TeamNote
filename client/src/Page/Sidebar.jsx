import React from 'react';
import './Sidebar.css';

const Sidebar = ({ pages, activePage, onPageClick }) => {
  return (
    <aside className="sidebar">
      {pages.map((page) => (
        <button
          key={page.id}
          onClick={() => onPageClick(page.id)}
          className={`sidebar__item ${activePage === page.id ? 'sidebar__item--active' : ''}`}
        >
          <span className="sidebar__item-content">
            {page.icon && <span className="sidebar__icon">{page.icon}</span>}
            {page.name}
          </span>
          <span className="sidebar__menu-icon">⋮</span>
        </button>
      ))}
      
      <button className="sidebar__add-btn">
        + 페이지 추가
      </button>
    </aside>
  );
};

export default Sidebar;