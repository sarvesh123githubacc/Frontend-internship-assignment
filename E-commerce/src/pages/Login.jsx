import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import '../styles/Login.css';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post('https://fakestoreapi.com/auth/login', {
        username,
        password,
      });

      const token = res.data.token;
      localStorage.setItem('token', token);
      navigate('/');
    } catch (err) {
      setError('❌ Login failed. Check your username and password.');
    }
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <h2 className="login-title">Login</h2>
        <p className="login-subtitle">Please enter your credentials to log in</p>
        <form onSubmit={handleLogin} className="login-form">
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
            className="login-input"
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="login-input"
          />
          <button type="submit" className="login-button">Log In</button>
        </form>
        {error && <p className="login-error">{error}</p>}
        <p className="login-hint">
          <strong>Hint:</strong> Try <code>mor_2314</code> / <code>83r5^_</code>
        </p>
      </div>
    </div>
  );
};

export default Login;
