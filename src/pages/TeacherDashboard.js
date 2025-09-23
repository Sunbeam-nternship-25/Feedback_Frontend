import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function TeacherDashboard() {
  const [teacherName, setTeacherName] = useState('');
  const [feedbacks, setFeedbacks] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/login');
      return;
    }

    // Example API to get Teacher details
    axios.get('http://localhost:5000/teachers/profile', { headers: { Authorization: `Bearer ${token}` } })
      .then(res => setTeacherName(res.data.first_name + ' ' + res.data.last_name))
      .catch(() => {
        localStorage.removeItem('token');
        navigate('/login');
      });

    // Example API to get Teacher feedback
    axios.get('http://localhost:5000/teachers/feedbacks', { headers: { Authorization: `Bearer ${token}` } })
      .then(res => setFeedbacks(res.data))
      .catch(err => console.log('Error fetching feedbacks', err));
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  return (
    <div className="card p-4" style={{ maxWidth: 600, margin: 'auto' }}>
      <h2>Welcome, {teacherName}</h2>
      <button className="btn btn-danger mb-3" onClick={handleLogout}>Logout</button>

      <h3>Feedback Received</h3>
      {feedbacks.length === 0 ? (
        <p>No feedback available.</p>
      ) : (
        <ul className="list-group">
          {feedbacks.map((fb, idx) => (
            <li className="list-group-item" key={idx}>
              {fb.comment} - Rating: {fb.rating}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default TeacherDashboard;

