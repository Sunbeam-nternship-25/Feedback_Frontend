import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import TeacherRegister from './pages/TeacherRegister.js';
import TeacherLogin from './pages/TeacherLogin.js';
import TeacherDashboard from './pages/TeacherDashboard.js';
import './App.css';

function App() {
  return (
    <Router>
      <nav className="navbar navbar-expand bg-dark navbar-dark p-2">
        <div className="container">
          <Link className="navbar-brand" to="/">Feedback System</Link>
          <div className="navbar-nav">
            <Link className="nav-link" to="/register">Register</Link>
            <Link className="nav-link" to="/login">Login</Link>
            <Link className="nav-link" to="/dashboard">Dashboard</Link>
          </div>
        </div>
      </nav>
      <div className="container mt-4">
        <Routes>
          <Route path="/" element={<TeacherRegister />} />
          <Route path="/register" element={<TeacherRegister />} />
          <Route path="/login" element={<TeacherLogin />} />
          <Route path="/dashboard" element={<TeacherDashboard />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
