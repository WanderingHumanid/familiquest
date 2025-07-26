import React, { createContext, useContext, useState } from 'react';

// Default avatar customization
const defaultAvatar = {
  skin: '#F9D3B4',
  hair: '#000',
  shirt: '#6C63FF',
  accessory: null,
};

const TaskContext = createContext();

export const TaskProvider = ({ children }) => {
  // Mock user type for demo
  const [user, setUser] = useState({ name: 'Alex', type: 'child' });
  const [tasks, setTasks] = useState([
    { id: 1, title: 'Clean your room', difficulty: 'Easy', completed: false },
    { id: 2, title: 'Do homework', difficulty: 'Medium', completed: false },
    { id: 3, title: 'Brush teeth', difficulty: 'Easy', completed: true },
  ]);
  const [avatar, setAvatar] = useState(defaultAvatar);

  const addTask = (task) => {
    setTasks(prev => [...prev, { ...task, id: Date.now(), completed: false }]);
  };

  const updateAvatar = (custom) => {
    setAvatar(custom);
  };

  return (
    <TaskContext.Provider value={{ user, setUser, tasks, addTask, avatar, updateAvatar }}>
      {children}
    </TaskContext.Provider>
  );
};

export const useTaskContext = () => useContext(TaskContext); 