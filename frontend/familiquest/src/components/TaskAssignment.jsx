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
  const [successMessage, setSuccessMessage] = useState('');

  useEffect(() => {
    loadUsers();
  }, []);

  const loadUsers = async () => {
    try {
      const usersData = await api.getUsers();
      setUsers(usersData.filter(user => user.role === 'child'));
    } catch (err) {
      console.error('Failed to load users:', err);
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
        {/* Centered: Add Task Form */}
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
      </div>
    </div>
  );
};

export default TaskAssignment; 