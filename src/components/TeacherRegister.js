import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function TeacherRegister() {
  const [formData, setFormData] = useState({ first_name:'', last_name:'', email:'', password:'' });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post('http://localhost:5000/teachers', formData)
      .then(() => {
        alert('Registered successfully! Please login.');
        navigate('/login');
      })
      .catch(() => setError('Registration failed. Please try again.'));
  };

  return (
    <div className="card p-4" style={{ maxWidth: 500, margin: 'auto' }}>
      <h2>Teacher Registration</h2>
      {error && <div className="alert alert-danger">{error}</div>}
      <form onSubmit={handleSubmit}>
        <input className="form-control mb-3" name="first_name" value={formData.first_name} onChange={handleChange} placeholder="First Name" required />
        <input className="form-control mb-3" name="last_name" value={formData.last_name} onChange={handleChange} placeholder="Last Name" required />
        <input className="form-control mb-3" name="email" type="email" value={formData.email} onChange={handleChange} placeholder="Email" required />
        <input className="form-control mb-3" name="password" type="password" value={formData.password} onChange={handleChange} placeholder="Password" required />
        <button type="submit" className="btn btn-primary w-100">Register</button>
      </form>
    </div>
  );
}

export default TeacherRegister;
