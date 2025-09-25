import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function TeacherDashboard() {
  const [teacherName, setTeacherName] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/login');
      return;
    }

    axios.get('http://localhost:5000/teachers/profile', { headers: { token } })
      .then(res => setTeacherName(res.data.data.first_name + ' ' + res.data.data.last_name))
      .catch(() => {
        localStorage.removeItem('token');
        navigate('/login');
      });
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  return (
    <div className="card p-4" style={{ maxWidth: 600, margin: 'auto' }}>
      <h2>Welcome, {teacherName}</h2>
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
}

export default TeacherDashboard;


