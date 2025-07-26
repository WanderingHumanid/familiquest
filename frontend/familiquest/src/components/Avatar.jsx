import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useTaskContext } from './TaskContext';
import './Avatar.css';

const Avatar = () => {
  const navigate = useNavigate();
  const { avatar, userProgress } = useTaskContext();

  const getHeroLevel = (xp) => {
    if (xp >= 500) return 4;
    if (xp >= 250) return 3;
    if (xp >= 100) return 2;
    return 1;
  };

  const getHeroProgress = (xp) => {
    if (xp >= 500) return 100;
    if (xp >= 250) return ((xp - 250) / 250) * 100;
    if (xp >= 100) return ((xp - 100) / 150) * 100;
    return (xp / 100) * 100;
  };

  const level = userProgress.level;
  const xp = userProgress.xp;
  const progress = getHeroProgress(xp);

  return (
    <div className="avatar-container">
      <svg width="140" height="180" viewBox="0 0 140 180">
        {/* Background circle */}
        <circle cx="70" cy="70" r="65" fill="#f8f9fa" stroke="#e9ecef" strokeWidth="2"/>
        
        {/* Skin tone */}
        <circle cx="70" cy="60" r="20" fill={avatar.skin} stroke="#333" strokeWidth="1"/>
        
        {/* Hair */}
        <circle cx="70" cy="50" r="15" fill={avatar.hair}/>
        
        {/* Shirt */}
        <rect x="50" y="80" width="40" height="30" fill={avatar.shirt} rx="3"/>
        
        {/* Accessory */}
        {avatar.accessory && (
          <circle cx="70" cy="45" r="6" fill={avatar.accessory}/>
        )}
        
        {/* Eyes */}
        <circle cx="64" cy="55" r="2" fill="#333"/>
        <circle cx="76" cy="55" r="2" fill="#333"/>
        
        {/* Smile */}
        <path d="M 60 65 Q 70 72 80 65" stroke="#333" strokeWidth="2" fill="none"/>
      </svg>
      
      <div className="hero-progress-bar" style={{ '--progress': `${progress}%` }}></div>
      <span style={{ fontWeight: 'bold', color: '#7C3AED' }}>Level {level} Hero</span>
      <button 
        onClick={() => navigate('/customize-avatar')} 
        className="avatar-customize-btn"
      >
        Customize
      </button>
    </div>
  );
};

export default Avatar; 