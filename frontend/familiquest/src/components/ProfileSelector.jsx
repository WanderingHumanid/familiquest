import React from 'react';
import './ProfileSelector.css';

const ProfileSelector = ({ onProfileSelect }) => {
    const handleProfileSelect = (profile) => {
        onProfileSelect(profile);
    };

    return (
        <div className="profile-selector">
            <h2>Select Profile</h2>
            <button onClick={() => handleProfileSelect('parent')} className="profile-button">
                Parent
            </button>
            <button onClick={() => handleProfileSelect('child')} className="profile-button">
                Child
            </button>
        </div>
    );
};

export default ProfileSelector;