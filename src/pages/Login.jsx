import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';

/* Uses original css/login.css - exact markup as login.html
   login.js toggle logic ported to useEffect */

export default function Login() {
  useEffect(() => {
    const container = document.querySelector('.container');
    const registerBtn = document.querySelector('.register-btn');
    const loginBtn = document.querySelector('.login-btn');

    if (!container || !registerBtn || !loginBtn) return;

    const onRegister = () => container.classList.add('active');
    const onLogin = () => container.classList.remove('active');

    registerBtn.addEventListener('click', onRegister);
    loginBtn.addEventListener('click', onLogin);

    return () => {
      registerBtn.removeEventListener('click', onRegister);
      loginBtn.removeEventListener('click', onLogin);
    };
  }, []);

  return (
    <>
      <link rel="stylesheet" href="/css/login.css" />

      {/* exact same markup as login.html body */}
      <div className="container active">
        <div className="form-box login">
          <form action="php/login.php" method="post">
            <h1>Login</h1>
            <div className="input-box">
              <input type="text" placeholder="Username" name="username" required />
              <i className="bx bxs-user"></i>
            </div>
            <div className="input-box">
              <input type="password" name="password" placeholder="Password" required />
              <i className="bx bxs-lock-alt"></i>
            </div>
            <div className="forgot-link">
              <a href="#">Forgot password?</a>
            </div>
            <button type="submit" className="btn">Login</button>
            <p>or login with social platforms</p>
            <div className="social-icons">
              <a href="#"><i className="bx bxl-google"></i></a>
              <a href="#"><i className="bx bxl-facebook"></i></a>
              <a href="#"><i className="bx bxl-github"></i></a>
              <a href="#"><i className="bx bxl-linkedin"></i></a>
            </div>
          </form>
        </div>

        <div className="form-box register">
          <form action="php/register.php" method="POST">
            <h1>Registration</h1>
            <div className="input-box">
              <input type="text" placeholder="Email" name="email" id="email" required />
              <i className="bx bxs-envelope"></i>
            </div>
            <div className="input-box">
              <input type="text" placeholder="Username" name="username" id="username" required />
              <i className="bx bxs-user"></i>
            </div>
            <div className="input-box">
              <input type="password" placeholder="Password" name="password" id="password" required />
              <i className="bx bxs-lock-alt"></i>
            </div>
            <button type="submit" className="btn">Register</button>
            <p>or Register with social platforms</p>
            <div className="social-icons">
              <a href="#"><i className="bx bxl-google"></i></a>
              <a href="#"><i className="bx bxl-facebook"></i></a>
              <a href="#"><i className="bx bxl-github"></i></a>
              <a href="#"><i className="bx bxl-linkedin"></i></a>
            </div>
          </form>
        </div>

        <div className="toggle-box">
          <div className="toggle-panel toggle-left">
            <h1>Hello, Welcome!</h1>
            <p>Don't have an account?</p>
            <button className="btn register-btn">Register</button>
          </div>
          <div className="toggle-panel toggle-right">
            <h1>Welcome Back!</h1>
            <p>Already have an account?</p>
            <button className="btn login-btn">Login</button>
          </div>
        </div>
      </div>
    </>
  );
}
