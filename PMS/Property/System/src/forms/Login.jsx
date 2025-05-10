import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import emailjs from 'emailjs-com'; // EmailJS import
import "../css/Login.css";

const Login = () => {
  const navigate = useNavigate();
  const [isRegistering, setRegistering] = useState(false);
  const [isForgotPassword, setForgotPassword] = useState(false);
  const [fullname, setFullname] = useState('');
  const [email, setEmail] = useState('');
  const [role, setRole] = useState('2'); // Default to landlord
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');
  const [showLogin, setShowLogin] = useState(true);

  const toggleRegister = () => {
    setRegistering(true);
    setForgotPassword(false);
    resetForm();
  };

  const toggleForgotPassword = () => {
    setForgotPassword(true);
    setRegistering(false);
    resetForm();
  };

  const resetForm = () => {
    setFullname('');
    setEmail('');
    setPassword('');
    setError('');
    setMessage('');
  };

  const sendEmail = (email, subject, msg) => {
    const templateParams = {
      user_email: email,
      subject: subject,
      message: msg,
    };

    emailjs.send('service_bij5kfi', 'template_unknusf', templateParams, 'UQEahFBIgFzmkYLpa')
      .then(response => console.log('Email sent:', response))
      .catch(err => console.error('Email error:', err));
  };

  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setMessage('');
    try {
      const response = await axios.get(`http://localhost:2006/api/display?email=${email}`);
      const user = response.data;
      if (user.password === password) {
        // Navigate based on role
        if (user.role === 1) navigate("/admin");
        else if (user.role === 2) navigate("/landlord");
        else if (user.role === 3) navigate("/tenant");
        else setError("Invalid user role.");

        setShowLogin(false);

        sendEmail(email, 'Login Successful', 'You have successfully logged in!');
      } else {
        setError("Invalid password.");
      }
    } catch (err) {
      setError("Login failed. Please try again.");
    }
  };

  const handleRegisterSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setMessage('');
    try {
      await axios.post('http://localhost:2006/api/add', {
        fullname,
        email,
        role: parseInt(role),
        password,
      });

      setRegistering(false);
      setShowLogin(false);

      sendEmail(email, 'Registration Successful', `Welcome ${fullname}, your registration is successful!`);
    } catch (err) {
      setError("Registration failed. Please try again.");
    }
  };

  const handleForgotPasswordSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setMessage('');
    try {
      await axios.post('http://localhost:2006/api/reset-password', { email });
      setMessage("Password reset link sent to your email.");
    } catch (err) {
      setError("Failed to send reset email. Try again.");
    }
  };

  if (!showLogin) return null;

  return (
    <div className="d-content" onClick={(e) => e.stopPropagation()}>
      {error && <p className="error">{error}</p>}
      {message && <p className="success">{message}</p>}

      {/* LOGIN FORM */}
      {!isRegistering && !isForgotPassword && (
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
            <button type="button" onClick={toggleRegister} className="register-link">Register</button> |
            <button type="button" onClick={toggleForgotPassword} className="register-link">Forgot Password?</button>
          </p>
        </form>
      )}

      {/* REGISTER FORM */}
      {isRegistering && (
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

      {/* FORGOT PASSWORD FORM */}
      {isForgotPassword && (
        <form onSubmit={handleForgotPasswordSubmit}>
          <p className="form-title">Reset Password</p>
          <input
            type="email"
            placeholder="Enter your email"
            className="input-field"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <button type="submit" className="s-button">Send Reset Link</button>
        </form>
      )}
    </div>
  );
};

export default Login;
