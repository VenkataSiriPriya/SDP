import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import "../css/Login.css";

const Login = () => {
  const navigate = useNavigate();
  const [isRegistering, setRegistering] = useState(false);
  const [fullname, setFullname] = useState('');
  const [email, setEmail] = useState('');
  const [role, setRole] = useState('1');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [showLogin, setShowLogin] = useState(true);  

  const toggleRegister = () => {
    setRegistering(true);
    setFullname('');
    setEmail('');
    setPassword('');
    setError('');
  };

  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.get(`http://localhost:2006/api/display?email=${email}`);
      const user = response.data;
      if (user.password === password) {
        if (user.role === 1) navigate("/admin");
        else if (user.role === 2) navigate("/landlord");
        else if (user.role === 3) navigate("/tenant");
        else setError("Invalid user role.");
        
        setShowLogin(false);  
      } else {
        setError("Invalid password.");
      }
    } catch (err) {
      setError("Login failed. Please try again.");
    }
  };

  const handleRegisterSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:2006/api/add', {
        fullname,
        email,
        role: parseInt(role),
        password,
      });
      setRegistering(false);
      setShowLogin(false);  
    } catch (err) {
      setError("Registration failed. Please try again.");
    }
  };

  if (!showLogin) return null;  

  return (
    <div className="d-content" onClick={(e) => e.stopPropagation()}>
      {error && <p className="error">{error}</p>}

      {!isRegistering ? (
        <form onSubmit={handleLoginSubmit}>
          <p className="form-title">Login</p>
          <input
            type="email"
            placeholder="Email"
            className="input-field"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Password"
            className="input-field"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button type="submit" className="s-button">Login</button>
          <p>
            Don't have an account?{" "}
            <button type="button" onClick={toggleRegister} className="register-link">Register</button>
          </p>
        </form>
      ) : (
        <form onSubmit={handleRegisterSubmit}>
          <p className="form-title">Register</p>
          <input
            type="text"
            placeholder="Full Name"
            className="input-field"
            value={fullname}
            onChange={(e) => setFullname(e.target.value)}
            required
          />
          <input
            type="email"
            placeholder="Email"
            className="input-field"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <select
            value={role}
            onChange={(e) => setRole(e.target.value)}
            className="input-field"
            required
          >
            <option value="2">Landlord</option>
            <option value="3">Tenant</option>
          </select>
          <input
            type="password"
            placeholder="Password"
            className="input-field"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button type="submit" className="s-button">Register</button>
        </form>
      )}
    </div>
  );
};

export default Login;
