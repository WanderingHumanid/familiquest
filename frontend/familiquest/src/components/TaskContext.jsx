import React, { createContext, useContext, useState, useEffect } from 'react';
import * as api from '../services/api';

// Default avatar customization
const defaultAvatar = {
  skin: '#F9D3B4',
  hair: '#000',
  shirt: '#6C63FF',
  accessory: null,
};

const TaskContext = createContext();

export const TaskProvider = ({ children }) => {
  // User state
  const [user, setUser] = useState(null);
  const [tasks, setTasks] = useState([]);
  const [avatar, setAvatar] = useState(defaultAvatar);
  const [userProgress, setUserProgress] = useState({
    level: 1,
    xp: 0,
    points: 0,
    streak: 0,
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Load user data from localStorage on mount
  useEffect(() => {
    const savedUser = localStorage.getItem('user');
    if (savedUser) {
      const userData = JSON.parse(savedUser);
      // Clear invalid user data if it exists
      clearInvalidUserData(userData);
    }
  }, []);

  const clearInvalidUserData = async (userData) => {
    try {
      // Try to load user data to see if the user still exists
      await api.getUserProgress(userData.id);
      // If successful, set the user and load data
      setUser(userData);
      loadUserData(userData.id);
    } catch (err) {
      // If user doesn't exist, clear localStorage and reset state
      console.log('User no longer exists, clearing cached data');
      localStorage.removeItem('user');
      setUser(null);
      setTasks([]);
      setAvatar(defaultAvatar);
      setUserProgress({ level: 1, xp: 0, points: 0, streak: 0 });
    }
  };

  const loadUserData = async (userId) => {
    if (!userId) return;
    
    setLoading(true);
    setError(null);
    
    try {
      // Load tasks
      const tasksData = await api.getQuests(userId);
      setTasks(tasksData);
      
      // Load user progress
      const progressData = await api.getUserProgress(userId);
      setUserProgress(progressData);
      
      // Load avatar
      const avatarData = await api.getUserAvatar(userId);
      setAvatar(avatarData);
    } catch (err) {
      setError('Failed to load user data');
      console.error('Error loading user data:', err);
    } finally {
      setLoading(false);
    }
  };

  const login = async (username, password, role) => {
    setLoading(true);
    setError(null);
    
    try {
      const response = await api.loginUser(username, password, role);
      const userData = {
        id: response.user_id,
        username: response.username,
        type: response.role,
      };
      
      setUser(userData);
      localStorage.setItem('user', JSON.stringify(userData));
      await loadUserData(userData.id);
      
      return response;
    } catch (err) {
      setError('Login failed');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    setUser(null);
    setTasks([]);
    setAvatar(defaultAvatar);
    setUserProgress({ level: 1, xp: 0, points: 0, streak: 0 });
    localStorage.removeItem('user');
  };

  const addTask = async (taskData) => {
    if (!user) return;
    
    // Only parents can assign tasks
    if (user.type !== 'parent') {
      setError('Only parents can assign tasks');
      throw new Error('Only parents can assign tasks');
    }
    
    setLoading(true);
    setError(null);
    
    try {
      // Use the assignee ID from taskData, or fall back to current user
      const assigneeId = taskData.assignee || user.id;
      const response = await api.createQuest(
        taskData.title,
        taskData.description,
        taskData.difficulty,
        assigneeId
      );
      
      // Reload tasks to get the updated list
      await loadUserData(user.id);
      
      return response;
    } catch (err) {
      setError('Failed to create task');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const completeTask = async (taskId) => {
    setLoading(true);
    setError(null);
    
    try {
      const response = await api.completeQuest(taskId);
      
      // Reload user data to get updated progress
      await loadUserData(user.id);
      
      return response;
    } catch (err) {
      setError('Failed to complete task');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const updateAvatar = async (avatarData) => {
    if (!user) return;
    
    setLoading(true);
    setError(null);
    
    try {
      await api.updateUserAvatar(user.id, avatarData);
      setAvatar(avatarData);
    } catch (err) {
      setError('Failed to update avatar');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const refreshData = () => {
    if (user) {
      loadUserData(user.id);
    }
  };

  const clearCache = () => {
    localStorage.removeItem('user');
    setUser(null);
    setTasks([]);
    setAvatar(defaultAvatar);
    setUserProgress({ level: 1, xp: 0, points: 0, streak: 0 });
  };

  return (
    <TaskContext.Provider value={{
      user,
      setUser,
      tasks,
      addTask,
      completeTask,
      avatar,
      updateAvatar,
      userProgress,
      login,
      logout,
      loading,
      error,
      refreshData,
      clearCache,
    }}>
      {children}
    </TaskContext.Provider>
  );
};

export const useTaskContext = () => useContext(TaskContext); 