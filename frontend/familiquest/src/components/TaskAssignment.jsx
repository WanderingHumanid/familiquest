import React, { useState, useEffect } from 'react';
import { useTaskContext } from './TaskContext';
import * as api from '../services/api';
import './TaskAssignment.css';

const TaskAssignment = () => {
  const { addTask, loading, error } = useTaskContext();
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    difficulty: 'Easy',
    assignee: ''
  });
  const [users, setUsers] = useState([]);
  const [recentTasks, setRecentTasks] = useState([]);
  const [successMessage, setSuccessMessage] = useState('');

  useEffect(() => {
    loadUsers();
    loadRecentTasks();
  }, []);

  const loadUsers = async () => {
    try {
      const usersData = await api.getUsers();
      setUsers(usersData.filter(user => user.role === 'child'));
    } catch (err) {
      console.error('Failed to load users:', err);
    }
  };

  const loadRecentTasks = async () => {
    try {
      // For now, load tasks for the first child user
      if (users.length > 0) {
        const tasksData = await api.getQuests(users[0].id);
        setRecentTasks(tasksData.slice(0, 5)); // Show last 5 tasks
      }
    } catch (err) {
      console.error('Failed to load recent tasks:', err);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!formData.assignee) {
      alert('Please select an assignee');
      return;
    }

    try {
      await addTask(formData);
      setFormData({
        title: '',
        description: '',
        difficulty: 'Easy',
        assignee: ''
      });
      setSuccessMessage('Task assigned successfully!');
      setTimeout(() => setSuccessMessage(''), 3000);
      loadRecentTasks(); // Refresh recent tasks
      
      // Refresh the parent's dashboard if they're on it
      if (window.location.pathname === '/dashboard') {
        window.location.reload();
      }
    } catch (err) {
      console.error('Failed to assign task:', err);
    }
  };

  const handleAssignAnother = () => {
    setFormData({
      title: '',
      description: '',
      difficulty: 'Easy',
      assignee: ''
    });
    setSuccessMessage('');
  };

  return (
    <div className="assign-split-bg">
      <div className="assign-split-container">
        {/* Left: Add Task Form */}
        <section className="assign-form-panel">
          <header className="assign-form-header">
            <h2>Assign New Task</h2>
          </header>
          
          {successMessage && (
            <div className="assign-confirmation">
              <span>✅ {successMessage}</span>
              <button onClick={handleAssignAnother} className="assign-another-btn">
                Assign Another Task
              </button>
            </div>
          )}

          <form onSubmit={handleSubmit} className="assign-form">
            <div className="assign-input-group">
              <label htmlFor="title">Task Title</label>
              <input
                type="text"
                id="title"
                name="title"
                value={formData.title}
                onChange={handleInputChange}
                placeholder="Enter task title"
                required
                disabled={loading}
              />
            </div>

            <div className="assign-input-group">
              <label htmlFor="description">Description</label>
              <textarea
                id="description"
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                placeholder="Describe the task"
                rows="3"
                required
                disabled={loading}
              />
            </div>

            <div className="assign-input-group">
              <label htmlFor="difficulty">Difficulty</label>
              <select
                id="difficulty"
                name="difficulty"
                value={formData.difficulty}
                onChange={handleInputChange}
                disabled={loading}
              >
                <option value="Easy">Easy (15 XP)</option>
                <option value="Medium">Medium (30 XP)</option>
                <option value="Hard">Hard (50 XP)</option>
              </select>
            </div>

            <div className="assign-input-group">
              <label htmlFor="assignee">Assign To</label>
              <select
                id="assignee"
                name="assignee"
                value={formData.assignee}
                onChange={handleInputChange}
                required
                disabled={loading}
              >
                <option value="">Select a child</option>
                {users.map(user => (
                  <option key={user.id} value={user.id}>
                    {user.username} (Level {user.level})
                  </option>
                ))}
              </select>
            </div>

            {error && <div className="assign-error">{error}</div>}
            
            <button type="submit" className="assign-submit-btn" disabled={loading}>
              {loading ? 'Assigning...' : 'Assign Task'}
            </button>
          </form>
        </section>

        {/* Right: Recent Tasks & Progress */}
        <aside className="assign-progress-panel">
          <div className="assign-card">
            <h3>Recently Assigned Tasks</h3>
            <div className="assign-task-placeholder">
              {recentTasks.length === 0 ? (
                <p>No tasks assigned yet</p>
              ) : (
                recentTasks.map(task => (
                  <div key={task.id} className="assign-recent-task">
                    <span className="assign-task-title">{task.title}</span>
                    <span className={`assign-task-difficulty diff-${task.difficulty.toLowerCase()}`}>
                      {task.difficulty}
                    </span>
                    <span className={`assign-task-status ${task.completed ? 'completed' : 'pending'}`}>
                      {task.completed ? '✅' : '⏳'}
                    </span>
                  </div>
                ))
              )}
            </div>
          </div>

          <div className="assign-card">
            <h3>Child Progress</h3>
            <div className="assign-progress-placeholder">
              {users.length === 0 ? (
                <p>No children registered</p>
              ) : (
                users.map(user => (
                  <div key={user.id} className="assign-progress-avatar">
                    <div className="assign-progress-details">
                      <div className="assign-progress-detail">
                        <span>Level {user.level}</span>
                      </div>
                      <div className="assign-progress-detail">
                        <span>{user.xp} XP</span>
                      </div>
                      <div className="assign-progress-note">
                        <span>Progress data will be displayed here</span>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
};

export default TaskAssignment; 