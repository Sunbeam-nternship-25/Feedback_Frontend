import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function TeacherLogin() {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = e => {
    e.preventDefault();
    axios.post('http://localhost:5000/teachers/login', formData)
      .then(response => {
        if (response.data && response.data.data && response.data.data.token) {
          localStorage.setItem('token', response.data.data.token);
          alert('Login successful!');
          setError('');
          navigate('/dashboard'); // redirect here
        } else {
          setError('Token missing in response');
        }
      })
      .catch(() => setError('Login failed. Check your credentials.'));
  };

  return (
    <div className="card p-4" style={{ maxWidth: 400, margin: 'auto' }}>
      <h2>Teacher Login</h2>
      {error && <div className="alert alert-danger">{error}</div>}
      <form onSubmit={handleSubmit}>
        <input name="email" type="email" value={formData.email} onChange={handleChange} placeholder="Email" required />
        <input name="password" type="password" value={formData.password} onChange={handleChange} placeholder="Password" required />
        <button type="submit" className="btn btn-success w-100">Login</button>
      </form>
    </div>
  );
}

export default TeacherLogin;
