import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/login.css';

export default function Login() {
  const [isRegisterActive, setIsRegisterActive] = useState(false);
  const [loginUsername, setLoginUsername] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [registerEmail, setRegisterEmail] = useState('');
  const [registerUsername, setRegisterUsername] = useState('');
  const [registerPassword, setRegisterPassword] = useState('');

  const navigate = useNavigate();

  const handleLoginSubmit = (e) => {
    e.preventDefault();
    if (!loginUsername || !loginPassword) {
      alert('Please fill out all login fields.');
      return;
    }
    alert(`Welcome back, ${loginUsername}! You have successfully logged in.`);
    // Navigate back to the home page
    navigate('/');
  };

  const handleRegisterSubmit = (e) => {
    e.preventDefault();
    if (!registerEmail || !registerUsername || !registerPassword) {
      alert('Please fill out all registration fields.');
      return;
    }
    alert(`Account created successfully for ${registerUsername}! Please login.`);
    setIsRegisterActive(false); // Switch back to login form
    // Clear registration fields
    setRegisterEmail('');
    setRegisterUsername('');
    setRegisterPassword('');
  };

  return (
    <div className="login-page-container">
      <div className={`login-card-container ${isRegisterActive ? 'active' : ''}`}>
        
        {/* LOGIN FORM BOX */}
        <div className="form-box login">
          <form onSubmit={handleLoginSubmit}>
            <h1>Login</h1>
            <div className="input-box">
              <input
                type="text"
                placeholder="Username"
                value={loginUsername}
                onChange={(e) => setLoginUsername(e.target.value)}
                required
              />
              <i className="bx bxs-user"></i>
            </div>
            <div className="input-box">
              <input
                type="password"
                placeholder="Password"
                value={loginPassword}
                onChange={(e) => setLoginPassword(e.target.value)}
                required
              />
              <i className="bx bxs-lock-alt"></i>
            </div>
            <div className="forgot-link">
              <a href="#" onClick={(e) => { e.preventDefault(); alert('Password recovery link sent if email matches database.'); }}>
                Forgot password?
              </a>
            </div>
            <button type="submit" className="btn">Login</button>
            <p>or login with social platforms</p>
            <div className="social-icons">
              <a href="#" onClick={(e) => { e.preventDefault(); alert('Google Auth triggered'); }}><i className="bx bxl-google"></i></a>
              <a href="#" onClick={(e) => { e.preventDefault(); alert('Facebook Auth triggered'); }}><i className="bx bxl-facebook"></i></a>
              <a href="#" onClick={(e) => { e.preventDefault(); alert('Github Auth triggered'); }}><i className="bx bxl-github"></i></a>
              <a href="#" onClick={(e) => { e.preventDefault(); alert('LinkedIn Auth triggered'); }}><i className="bx bxl-linkedin"></i></a>
            </div>
          </form>
        </div>

        {/* REGISTRATION FORM BOX */}
        <div className="form-box register">
          <form onSubmit={handleRegisterSubmit}>
            <h1>Registration</h1>
            <div className="input-box">
              <input
                type="email"
                placeholder="Email"
                value={registerEmail}
                onChange={(e) => setRegisterEmail(e.target.value)}
                required
              />
              <i className="bx bxs-envelope"></i>
            </div>
            <div className="input-box">
              <input
                type="text"
                placeholder="Username"
                value={registerUsername}
                onChange={(e) => setRegisterUsername(e.target.value)}
                required
              />
              <i className="bx bxs-user"></i>
            </div>
            <div className="input-box">
              <input
                type="password"
                placeholder="Password"
                value={registerPassword}
                onChange={(e) => setRegisterPassword(e.target.value)}
                required
              />
              <i className="bx bxs-lock-alt"></i>
            </div>
            <button type="submit" className="btn">Register</button>
            <p>or Register with social platforms</p>
            <div className="social-icons">
              <a href="#" onClick={(e) => { e.preventDefault(); alert('Google Sign-Up triggered'); }}><i className="bx bxl-google"></i></a>
              <a href="#" onClick={(e) => { e.preventDefault(); alert('Facebook Sign-Up triggered'); }}><i className="bx bxl-facebook"></i></a>
              <a href="#" onClick={(e) => { e.preventDefault(); alert('Github Sign-Up triggered'); }}><i className="bx bxl-github"></i></a>
              <a href="#" onClick={(e) => { e.preventDefault(); alert('LinkedIn Sign-Up triggered'); }}><i className="bx bxl-linkedin"></i></a>
            </div>
          </form>
        </div>

        {/* TOGGLE PANELS */}
        <div className="toggle-box">
          <div className="toggle-panel toggle-left">
            <h1>Hello, Welcome!</h1>
            <p>Don't have an account?</p>
            <button className="btn register-btn" onClick={() => setIsRegisterActive(true)}>
              Register
            </button>
          </div>
          <div className="toggle-panel toggle-right">
            <h1>Welcome Back!</h1>
            <p>Already have an account?</p>
            <button className="btn login-btn" onClick={() => setIsRegisterActive(false)}>
              Login
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}
