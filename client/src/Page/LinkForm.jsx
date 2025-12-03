import React, { useState } from 'react';
import './LinkForm.css';
//링크폼 추가
const LinkForm = ({ onAddLink }) => {
  const [url, setUrl] = useState('');
  const [description, setDescription] = useState('');

  const handleSubmit = () => {
    if (url.trim() && description.trim()) {
      onAddLink({ 
        url: url.trim(), 
        description: description.trim() 
      });
      setUrl('');
      setDescription('');
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit();
    }
  };

  return (
    <div className="link-form">
      <div className="link-form__field">
        <label className="link-form__label">Link</label>
        <input
          type="url"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="https://www.youtube.com/"
          className="link-form__input link-form__input--url"
        />
      </div>
      
      <div className="link-form__row">
        <input
          type="text"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="유튜브 링크"
          className="link-form__input link-form__input--desc"
        />
        <button onClick={handleSubmit} className="link-form__submit">
          추가
        </button>
      </div>
    </div>
  );
};

export default LinkForm;