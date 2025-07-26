import React, { useState } from 'react';
import { useTaskContext } from './TaskContext';
import { useNavigate } from 'react-router-dom';
import './Avatar.css';

const skinTones = ['#F9D3B4', '#E0AC69', '#C68642', '#8D5524', '#FFD1DC', '#F5E6C8', '#B97A56', '#A0522D'];
const hairColors = ['#000', '#A0522D', '#FFD700', '#FFF', '#8B4513', '#C0C0C0', '#FF8C00', '#4B0082'];
const shirts = ['#6C63FF', '#FF6584', '#43E97B', '#FFD600', '#FFB347', '#B19CD9', '#00BFFF', '#FF6347'];
const accessories = [
  null,
  <circle key="glasses" cx="50" cy="60" r="12" fill="none" stroke="#222" strokeWidth="3" />, // Glasses
  <rect key="hat" x="30" y="20" width="40" height="15" rx="7" fill="#333" />, // Hat
  <ellipse key="earring" cx="90" cy="80" rx="3" ry="6" fill="#FFD700" />, // Earring
  <rect key="mask" x="40" y="75" width="40" height="12" rx="6" fill="#e0e0e0" />, // Mask
  <ellipse key="beard" cx="60" cy="90" rx="18" ry="8" fill="#A0522D" /> // Beard
];

function getRandom(arr, n = 5) {
  // Return n random unique options from arr
  const shuffled = arr.slice().sort(() => 0.5 - Math.random());
  return shuffled.slice(0, Math.min(n, arr.length));
}

const getHeroLevel = (xp) => {
  if (xp >= 500) return 4;
  if (xp >= 250) return 3;
  if (xp >= 100) return 2;
  return 1;
};

const CustomizeAvatar = () => {
  const { avatar, updateAvatar } = useTaskContext();
  const navigate = useNavigate();
  // Mock XP for now
  const xp = 120; // TODO: Replace with real XP from context
  const level = getHeroLevel(xp);
  // Show a random subset of options for each feature
  const [skin, setSkin] = useState(avatar.skin);
  const [hair, setHair] = useState(avatar.hair);
  const [shirt, setShirt] = useState(avatar.shirt);
  const [accessory, setAccessory] = useState(avatar.accessory);

  const skinOptions = getRandom(skinTones, 6);
  const hairOptions = getRandom(hairColors, 6);
  const shirtOptions = getRandom(shirts, 6);
  const accessoryOptions = getRandom(accessories, 5);

  const handleSave = () => {
    updateAvatar({ skin, hair, shirt, accessory });
    navigate('/dashboard');
  };

  // Group options by tier
  const skinTiers = [
    { label: 'Basic', minLevel: 1, options: skinOptions.slice(0, 3) },
    { label: 'Advanced', minLevel: 2, options: skinOptions.slice(3, 5) },
    { label: 'Legendary', minLevel: 3, options: skinOptions.slice(5) },
  ];
  const hairTiers = [
    { label: 'Basic', minLevel: 1, options: hairOptions.slice(0, 3) },
    { label: 'Advanced', minLevel: 2, options: hairOptions.slice(3, 5) },
    { label: 'Legendary', minLevel: 3, options: hairOptions.slice(5) },
  ];
  const shirtTiers = [
    { label: 'Basic', minLevel: 1, options: shirtOptions.slice(0, 3) },
    { label: 'Advanced', minLevel: 2, options: shirtOptions.slice(3, 5) },
    { label: 'Legendary', minLevel: 3, options: shirtOptions.slice(5) },
  ];
  const accessoryTiers = [
    { label: 'Basic', minLevel: 1, options: accessoryOptions.slice(0, 2) },
    { label: 'Advanced', minLevel: 2, options: accessoryOptions.slice(2, 4) },
    { label: 'Legendary', minLevel: 3, options: accessoryOptions.slice(4) },
  ];

  const renderOptions = (options, selected, setSelected, currentLevel) => (
    options.map((tier, idx) => (
      <div key={tier.label} style={{ marginBottom: 8, width: '100%' }}>
        <div style={{ fontWeight: 600, color: '#6C63FF', fontSize: '0.98em', marginBottom: 2 }}>{tier.label} {tier.minLevel > 1 && <span style={{color:'#FFD600', fontWeight:700}}>(Lvl {tier.minLevel}+)</span>}</div>
        <div style={{ display: 'flex', gap: 10 }}>
          {tier.options.map((opt, i) => {
            const locked = currentLevel < tier.minLevel;
            return (
              <button
                key={i}
                className={selected === opt ? 'selected' : ''}
                onClick={() => !locked && setSelected(opt)}
                disabled={locked}
                title={locked ? `Unlock at Level ${tier.minLevel}` : ''}
                style={locked ? { pointerEvents: 'none' } : {}}
                {...(locked ? { className: 'locked' } : {})}
              >
                {typeof opt === 'string' ? '' : opt ? '●' : 'None'}
              </button>
            );
          })}
        </div>
      </div>
    ))
  );

  return (
    <div className="avatar-customize-container">
      <h2>Customize Your Avatar</h2>
      <div className="avatar-preview">
        <svg width="120" height="160" viewBox="0 0 120 160">
          <ellipse cx="60" cy="60" rx="35" ry="40" fill={skin} />
          <ellipse cx="60" cy="40" rx="32" ry="18" fill={hair} />
          <rect x="30" y="100" width="60" height="45" rx="20" fill={shirt} />
          <ellipse cx="48" cy="65" rx="5" ry="7" fill="#222" />
          <ellipse cx="72" cy="65" rx="5" ry="7" fill="#222" />
          <path d="M50 85 Q60 95 70 85" stroke="#222" strokeWidth="3" fill="none" />
          {accessory}
        </svg>
      </div>
      <div className="avatar-options-group">
        <div className="avatar-options">
          <span>Skin:</span>
          <div style={{ width: '100%' }}>
            {renderOptions(skinTiers, skin, setSkin, level)}
          </div>
        </div>
        <div className="avatar-options">
          <span>Hair:</span>
          <div style={{ width: '100%' }}>
            {renderOptions(hairTiers, hair, setHair, level)}
          </div>
        </div>
        <div className="avatar-options">
          <span>Shirt:</span>
          <div style={{ width: '100%' }}>
            {renderOptions(shirtTiers, shirt, setShirt, level)}
          </div>
        </div>
        <div className="avatar-options">
          <span>Accessory:</span>
          <div style={{ width: '100%' }}>
            {renderOptions(accessoryTiers, accessory, setAccessory, level)}
          </div>
        </div>
      </div>
      <button className="customize-avatar-btn" onClick={handleSave}>Save Avatar</button>
    </div>
  );
};

export default CustomizeAvatar; 