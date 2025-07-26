const API_BASE_URL = 'http://localhost:5000/api';

// Helper function for API calls
const apiCall = async (endpoint, options = {}) => {
  try {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
      ...options,
    });
    
    if (!response.ok) {
      throw new Error(`API call failed: ${response.status}`);
    }
    
    return await response.json();
  } catch (error) {
    console.error('API Error:', error);
    throw error;
  }
};

// User authentication
export const loginUser = async (username, password, role) => {
  return apiCall('/login', {
    method: 'POST',
    body: JSON.stringify({ username, password, role }),
  });
};

export const registerUser = async (username, password, role) => {
  return apiCall('/register', {
    method: 'POST',
    body: JSON.stringify({ username, password, role }),
  });
};

// Quest/Task management
export const createQuest = async (title, description, difficulty, assignedTo) => {
  return apiCall('/quest', {
    method: 'POST',
    body: JSON.stringify({ title, description, difficulty, assigned_to: assignedTo }),
  });
};

export const getQuests = async (userId) => {
  return apiCall(`/quests/${userId}`);
};

export const completeQuest = async (questId) => {
  return apiCall(`/quests/${questId}/complete`, {
    method: 'PUT',
  });
};

// User progress
export const getUserProgress = async (userId) => {
  return apiCall(`/user/${userId}/progress`);
};

// Avatar customization
export const getUserAvatar = async (userId) => {
  return apiCall(`/user/${userId}/avatar`);
};

export const updateUserAvatar = async (userId, avatarData) => {
  return apiCall(`/user/${userId}/avatar`, {
    method: 'PUT',
    body: JSON.stringify(avatarData),
  });
};

// Get all users (for parent to assign tasks to children)
export const getUsers = async () => {
  return apiCall('/users');
}; 