import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function TeacherRegister() {
  const [formData, setFormData] = useState({
    first_name: '',
    last_name: '',
    email: '',
    password: '',
  });

  const [error, setError] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = e => {
    e.preventDefault();
    axios.post('http://localhost:5000/teachers/register', formData)
      .then(() => {
        setMessage('Registration successful! Redirecting to login...');
        setError('');
        navigate('/login');
      })
      .catch(error => {
        if (error.response && error.response.data) {
          setError(typeof error.response.data.error === 'string'
            ? error.response.data.error
            : JSON.stringify(error.response.data.error));
        } else {
          setError('Registration failed. Please try again.');
        }
        setMessage('');
      });
  };

  return (
    <div className="card p-4" style={{ maxWidth: 500, margin: 'auto' }}>
      <h2>Teacher Register</h2>
      {error && <div className="alert alert-danger">{error}</div>}
      {message && <div className="alert alert-success">{message}</div>}
      <form onSubmit={handleSubmit}>
        <input name="first_name" placeholder="First Name" value={formData.first_name} onChange={handleChange} required />
        <input name="last_name" placeholder="Last Name" value={formData.last_name} onChange={handleChange} required />
        <input name="email" type="email" placeholder="Email" value={formData.email} onChange={handleChange} required />
        <input name="password" type="password" placeholder="Password" value={formData.password} onChange={handleChange} required />
        <button type="submit" className="btn btn-primary w-100">Register</button>
      </form>
    </div>
  );
}

export default TeacherRegister;
