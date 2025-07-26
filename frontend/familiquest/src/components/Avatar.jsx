import React, { useState } from 'react';
import './Avatar.css';
import { useTaskContext } from './TaskContext';
import { useNavigate } from 'react-router-dom';

const skinTones = ['#F9D3B4', '#E0AC69', '#C68642', '#8D5524'];
const hairColors = ['#000', '#A0522D', '#FFD700', '#FFF'];
const shirts = ['#6C63FF', '#FF6584', '#43E97B', '#FFD600'];
const accessories = [
  null,
  <circle key="glasses" cx="50" cy="60" r="12" fill="none" stroke="#222" strokeWidth="3" />,
  <rect key="hat" x="30" y="20" width="40" height="15" rx="7" fill="#333" />
];

function getRandom(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

const getHeroLevel = (xp) => {
  // Simple RPG curve: 0-99 XP = 1, 100-249 = 2, 250-499 = 3, 500+ = 4
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

const Avatar = () => {
  const { avatar } = useTaskContext();
  const navigate = useNavigate();
  // Mock XP for now
  const xp = 120; // TODO: Replace with real XP from context
  const level = getHeroLevel(xp);
  const progress = getHeroProgress(xp);

  const handleCustomize = () => {
    navigate('/customize-avatar');
  };

  return (
    <div className="avatar-container">
      <svg width="140" height="180" viewBox="0 0 120 160">
        {/* Head */}
        <ellipse cx="60" cy="60" rx="35" ry="40" fill={avatar.skin} />
        {/* Hair */}
        <ellipse cx="60" cy="40" rx="32" ry="18" fill={avatar.hair} />
        {/* Body/Shirt */}
        <rect x="30" y="100" width="60" height="45" rx="20" fill={avatar.shirt} />
        {/* Face (simple eyes/mouth) */}
        <ellipse cx="48" cy="65" rx="5" ry="7" fill="#222" />
        <ellipse cx="72" cy="65" rx="5" ry="7" fill="#222" />
        <path d="M50 85 Q60 95 70 85" stroke="#222" strokeWidth="3" fill="none" />
        {/* Accessories */}
        {avatar.accessory}
      </svg>
      <div className="hero-progress-bar">
        <div className="hero-progress-bar-inner" style={{ width: `${progress}%` }} />
      </div>
      <div style={{ fontWeight: 700, color: '#6C63FF', marginBottom: 6 }}>Level {level} Hero</div>
      <button className="customize-avatar-btn" onClick={handleCustomize}>Customize Avatar</button>
    </div>
  );
};

export default Avatar; 