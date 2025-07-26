import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTaskContext } from './TaskContext';
import './Avatar.css';

const CustomizeAvatar = () => {
  const navigate = useNavigate();
  const { avatar, updateAvatar, userProgress, loading, error } = useTaskContext();
  const [selectedAvatar, setSelectedAvatar] = useState(avatar);
  const [saveMessage, setSaveMessage] = useState('');

  // Mock XP and level for tier unlocking
  const currentLevel = userProgress.level;
  const currentXp = userProgress.xp;

  const getRandom = (arr) => arr[Math.floor(Math.random() * arr.length)];

  const skinTones = ['#F9D3B4', '#E8BFA8', '#D4A574', '#C68642', '#8D5524', '#5D4037'];
  const hairColors = ['#000', '#8B4513', '#D2691E', '#FFD700', '#FF69B4', '#9370DB', '#00CED1'];
  const shirts = ['#6C63FF', '#FF6B6B', '#4ECDC4', '#45B7D1', '#96CEB4', '#FFEAA7', '#DDA0DD', '#98D8C8'];
  const accessories = ['#FFD700', '#C0C0C0', '#FF69B4', '#00CED1', '#9370DB', '#FF6347', '#32CD32', '#FF4500'];

  // Tier system based on level
  const skinTiers = {
    basic: { minLevel: 1, options: skinTones.slice(0, 3) },
    advanced: { minLevel: 2, options: skinTones.slice(0, 5) },
    legendary: { minLevel: 3, options: skinTones }
  };

  const hairTiers = {
    basic: { minLevel: 1, options: hairColors.slice(0, 4) },
    advanced: { minLevel: 2, options: hairColors.slice(0, 6) },
    legendary: { minLevel: 3, options: hairColors }
  };

  const shirtTiers = {
    basic: { minLevel: 1, options: shirts.slice(0, 4) },
    advanced: { minLevel: 2, options: shirts.slice(0, 6) },
    legendary: { minLevel: 3, options: shirts }
  };

  const accessoryTiers = {
    basic: { minLevel: 2, options: accessories.slice(0, 3) },
    advanced: { minLevel: 3, options: accessories.slice(0, 5) },
    legendary: { minLevel: 4, options: accessories }
  };

  const handleSave = async () => {
    try {
      await updateAvatar(selectedAvatar);
      setSaveMessage('Avatar saved successfully!');
      setTimeout(() => {
        navigate('/dashboard');
      }, 1500);
    } catch (err) {
      console.error('Failed to save avatar:', err);
    }
  };

  const renderOptions = (tiers, currentValue, onChange, type) => {
    return Object.entries(tiers).map(([tierName, tier]) => {
      const isUnlocked = currentLevel >= tier.minLevel;
      return (
        <div key={tierName} className="avatar-options-group">
          <h4 className={isUnlocked ? '' : 'locked'}>
            {tierName.charAt(0).toUpperCase() + tierName.slice(1)} Tier
            {!isUnlocked && ` (Level ${tier.minLevel}+)`}
          </h4>
          <div className="avatar-options">
            {tier.options.map((option, index) => (
              <button
                key={index}
                className={`${currentValue === option ? 'selected' : ''} ${!isUnlocked ? 'locked' : ''}`}
                onClick={() => isUnlocked && onChange(option)}
                disabled={!isUnlocked}
                style={{ backgroundColor: option }}
                title={isUnlocked ? option : `Unlock at Level ${tier.minLevel}`}
              >
                {!isUnlocked && '🔒'}
              </button>
            ))}
          </div>
        </div>
      );
    });
  };

  return (
    <div className="avatar-customize-container">
      <div className="avatar-customize-content">
        <header className="avatar-customize-header">
          <h2>Customize Your Hero</h2>
          <div className="avatar-level-info">
            <span>Level {currentLevel} Hero</span>
            <span>{currentXp} XP</span>
          </div>
        </header>

        <div className="avatar-customize-main">
          {/* Avatar Preview */}
          <div className="avatar-preview-section">
            <div className="avatar-preview">
              <svg width="200" height="200" viewBox="0 0 200 200">
                {/* Background circle */}
                <circle cx="100" cy="100" r="95" fill="#f8f9fa" stroke="#e9ecef" strokeWidth="2"/>
                
                {/* Skin tone */}
                <circle cx="100" cy="80" r="25" fill={selectedAvatar.skin} stroke="#333" strokeWidth="1"/>
                
                {/* Hair */}
                <circle cx="100" cy="70" r="20" fill={selectedAvatar.hair}/>
                
                {/* Shirt */}
                <rect x="75" y="105" width="50" height="40" fill={selectedAvatar.shirt} rx="5"/>
                
                {/* Accessory */}
                {selectedAvatar.accessory && (
                  <circle cx="100" cy="60" r="8" fill={selectedAvatar.accessory}/>
                )}
                
                {/* Eyes */}
                <circle cx="92" cy="75" r="3" fill="#333"/>
                <circle cx="108" cy="75" r="3" fill="#333"/>
                
                {/* Smile */}
                <path d="M 85 85 Q 100 95 115 85" stroke="#333" strokeWidth="2" fill="none"/>
              </svg>
            </div>
          </div>

          {/* Customization Options */}
          <div className="avatar-customization-options">
            <div className="avatar-section">
              <h3>Skin Tone</h3>
              {renderOptions(skinTiers, selectedAvatar.skin, (color) => 
                setSelectedAvatar(prev => ({ ...prev, skin: color })), 'skin')}
            </div>

            <div className="avatar-section">
              <h3>Hair Color</h3>
              {renderOptions(hairTiers, selectedAvatar.hair, (color) => 
                setSelectedAvatar(prev => ({ ...prev, hair: color })), 'hair')}
            </div>

            <div className="avatar-section">
              <h3>Shirt Color</h3>
              {renderOptions(shirtTiers, selectedAvatar.shirt, (color) => 
                setSelectedAvatar(prev => ({ ...prev, shirt: color })), 'shirt')}
            </div>

            <div className="avatar-section">
              <h3>Accessory</h3>
              {renderOptions(accessoryTiers, selectedAvatar.accessory, (color) => 
                setSelectedAvatar(prev => ({ ...prev, accessory: color })), 'accessory')}
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="avatar-customize-actions">
          {error && <div className="avatar-error">{error}</div>}
          {saveMessage && <div className="avatar-success">{saveMessage}</div>}
          
          <div className="avatar-buttons">
            <button 
              onClick={() => navigate('/dashboard')} 
              className="avatar-cancel-btn"
              disabled={loading}
            >
              Cancel
            </button>
            <button 
              onClick={handleSave} 
              className="avatar-save-btn"
              disabled={loading}
            >
              {loading ? 'Saving...' : 'Save Avatar'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CustomizeAvatar; 