import React, { useState } from 'react';
import axios from 'axios';

function App() {
  const [isRegistered, setIsRegistered] = useState(false);

  const [registerData, setRegisterData] = useState({
    first_name: '',
    last_name: '',
    email: '',
    password: '',
  });

  const [loginData, setLoginData] = useState({ email: '', password: '' });

  const handleRegisterChange = (e) => {
    setRegisterData({ ...registerData, [e.target.name]: e.target.value });
  };

  const handleRegisterSubmit = (e) => {
    e.preventDefault();
    axios.post('http://localhost:5000/teachers', registerData)
      .then(() => {
        alert('Registered successfully! Please login.');
        setIsRegistered(true);
      })
      .catch(() => alert('Registration failed'));
  };

  const handleLoginChange = (e) => {
    setLoginData({ ...loginData, [e.target.name]: e.target.value });
  };

  const handleLoginSubmit = (e) => {
    e.preventDefault();
    axios.post('http://localhost:5000/teachers/login', loginData)
      .then(() => alert('Login successful!'))
      .catch(() => alert('Login failed'));
  };

  return (
    <div style={{ maxWidth: 400, margin: 'auto', padding: 20 }}>
      {!isRegistered ? (
        <>
          <h2>Teacher Registration</h2>
          <form onSubmit={handleRegisterSubmit}>
            <input type="text" name="first_name" value={registerData.first_name} onChange={handleRegisterChange} placeholder="First Name" required />
            <br />
            <input type="text" name="last_name" value={registerData.last_name} onChange={handleRegisterChange} placeholder="Last Name" required />
            <br />
            <input type="email" name="email" value={registerData.email} onChange={handleRegisterChange} placeholder="Email" required />
            <br />
            <input type="password" name="password" value={registerData.password} onChange={handleRegisterChange} placeholder="Password" required />
            <br />
            <button type="submit">Register</button>
          </form>
        </>
      ) : (
        <>
          <h2>Teacher Login</h2>
          <form onSubmit={handleLoginSubmit}>
            <input type="email" name="email" value={loginData.email} onChange={handleLoginChange} placeholder="Email" required />
            <br />
            <input type="password" name="password" value={loginData.password} onChange={handleLoginChange} placeholder="Password" required />
            <br />
            <button type="submit">Login</button>
          </form>
        </>
      )}
    </div>
  );
}

export default App;

