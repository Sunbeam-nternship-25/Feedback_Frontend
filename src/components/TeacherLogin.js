import React, { useState } from 'react';
import axios from 'axios';

function TeacherLogin() {
  const [formData, setFormData] = useState({ email: '', password: '' });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post('http://localhost:5000/teachers/login', formData)
      .then((res) => {
        alert('Login successful!');
        localStorage.setItem('token', res.data.token); // Store JWT or token if returned
        setFormData({ email: '', password: '' });
      })
      .catch(() => {
        alert('Login failed!');
      });
  };

  return (
    <div>
      <h2>Teacher Login</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          required
        />
        <br />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
          required
        />
        <br />
        <button type="submit">Login</button>
      </form>
    </div>
  );
}

export default TeacherLogin;
