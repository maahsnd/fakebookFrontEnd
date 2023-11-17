import React, { useState } from 'react';
import styles from './loginform.module.css';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';

function LoginForm() {
  const [preexistingUser, setPreexistingUser] = useState(true);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirm, setPasswordConfirm] = useState('');
  const navigate = useNavigate();

  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(
        'https://fakebookapi-production.up.railway.app/login',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ username, password })
        }
      );
      const data = await response.json();
      if (response.ok) {
        // Store the JWT token in cookies
        Cookies.set('jwt_token', data.token, {sameSite: 'strict', secure: true}  );
        Cookies.set('user_id', data.userId, {sameSite: 'strict', secure: true}  );
        navigate('/home');
        return;
      } else {
        setError(data.msg);
        // Handle authentication error
        console.error('Authentication failed');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const guestSignIn = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(
        'https://fakebookapi-production.up.railway.app/login/guest',
        {
          method: 'POST'
        }
      );
      const data = await response.json();
      if (response.ok) {
        // Store the JWT token in cookies
        Cookies.set('jwt_token', data.token, {sameSite: 'strict', secure: true}  );
        Cookies.set('user_id', data.userId, {sameSite: 'strict', secure: true}  );
        navigate('/home');
        return;
      } else {
        setError(data.msg);
        // Handle authentication error
        console.error('Authentication failed');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const handleSignupSubmit = async (e) => {
    e.preventDefault();
    try {
      const body = {
        username: username,
        password: password,
        confirm_password: passwordConfirm
      };
      const response = await fetch(
        'https://fakebookapi-production.up.railway.app/signup',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(body)
        }
      );
      const data = await response.json();
      if (response.ok) {
        // Store the JWT token in cookies
        Cookies.set('jwt_token', data.token, {sameSite: 'strict', secure: true}  );
        Cookies.set('user_id', data.userId, {sameSite: 'strict', secure: true}  );
        navigate('/home');
        return;
      } else {
        setError(data.msg);
        // Handle authentication error
        console.error('Authentication failed');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  if (preexistingUser) {
    return (
      <div className={styles.container}>
        <h1 className={styles.title}>Fakebook</h1>
        <form onSubmit={handleLoginSubmit}>
          <div className={styles.formGroup}>
            {' '}
            <label>
              Username
              <input
                name="username"
                type="text"
                onChange={(e) => setUsername(e.target.value)}
                value={username}
              />
            </label>
          </div>

          <div className={styles.formGroup}>
            {' '}
            <label>
              Password
              <input
                name="password"
                type="password"
                onChange={(e) => setPassword(e.target.value)}
                value={password}
              />
            </label>
          </div>

          <button className={styles.btn} type="submit">
            Log in
          </button>
          <hr />
          <button className={styles.btn} onClick={guestSignIn}>
            Log in as Guest User
          </button>
          <button
            className={styles.btn}
            onClick={() => setPreexistingUser(false)}
          >
            Sign up
          </button>
        </form>
      </div>
    );
  } else {
    return (
      <div className={styles.container}>
        <h1 className={styles.title}>Fakebook</h1>
        <form onSubmit={handleSignupSubmit}>
          <div className={styles.formGroup}>
            {' '}
            <label>
              Username:
              <input
                name="username"
                type="text"
                onChange={(e) => setUsername(e.target.value)}
                value={username}
              />
            </label>
          </div>
          <div className={styles.formGroup}>
            <label>
              Password:
              <input
                name="password"
                type="password"
                onChange={(e) => setPassword(e.target.value)}
                value={password}
              />
            </label>
          </div>
          <div className={styles.formGroup}>
            {' '}
            <label>
              Confirm Password:
              <input
                name="confirmPassword"
                type="password"
                onChange={(e) => setPasswordConfirm(e.target.value)}
                value={passwordConfirm}
              />
            </label>
          </div>

          <button className={styles.btn} type="submit">
            Sign Up
          </button>
        </form>
      </div>
    );
  }
}

export default LoginForm;
