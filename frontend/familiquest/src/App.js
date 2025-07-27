import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './components/Home';
import Login from './components/Login';
import Register from './components/Register';
import TaskAssignment from './components/TaskAssignment';
import Dashboard from './components/Dashboard';
import CustomizeAvatar from './components/CustomizeAvatar';
import About from './components/About';
import { TaskProvider, useTaskContext } from './components/TaskContext';
//import './App.css';

// Protected Route Component
const ProtectedRoute = ({ children }) => {
  const { user } = useTaskContext();
  return user ? children : <Navigate to="/login" />;
};

// App Content Component
const AppContent = () => {
  const { user, logout } = useTaskContext();

  return (
    <Router>
      <div className="App">
        <Navbar user={user} onLogout={logout} />
        <Routes>
          <Route path="/" element={user ? <Navigate to="/dashboard" /> : <Home />} />
          <Route path="/login" element={user ? <Navigate to="/dashboard" /> : <Login />} />
          <Route path="/register" element={user ? <Navigate to="/dashboard" /> : <Register />} />
          <Route path="/about" element={<About />} />
          
          {/* Protected Routes */}
          <Route 
            path="/dashboard" 
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/assign-task" 
            element={
              <ProtectedRoute>
                <TaskAssignment />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/customize-avatar" 
            element={
              <ProtectedRoute>
                <CustomizeAvatar />
              </ProtectedRoute>
            } 
          />
        </Routes>
      </div>
    </Router>
  );
};

// Main App Component
const App = () => {
  return (
    <TaskProvider>
      <AppContent />
    </TaskProvider>
  );
};

export default App;
