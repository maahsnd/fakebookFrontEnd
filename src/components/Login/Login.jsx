import React, { useState } from 'react';
import styles from './login.module.css';
import LoginForm from '../LoginForm/LoginForm';
import Cookies from 'js-cookie';
import { useNavigate } from 'react-router-dom';
function LogIn() {
  const [showSignUpForm, setShowSignUpForm] = useState(false);
  const [slideUp, setSlideUp] = useState(false);
  const navigate = useNavigate();

  const handleButtonClick = (e) => {
    setSlideUp(true);
    /*     setTimeout(() => {
      setShowSignUpForm(true);
    }, '500'); */
    guestSignIn(e);
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
        Cookies.set('jwt_token', data.token, {
          sameSite: 'strict',
          secure: true
        });
        Cookies.set('user_id', data.userId, {
          sameSite: 'strict',
          secure: true
        });
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

  return (
    <div className={styles.container}>
      <div className={styles.loginCard}>
        {showSignUpForm ? (
          <LoginForm />
        ) : (
          <button
            className={`${styles.mainBtn} ${slideUp ? styles.slideUp : ''}`}
            onClick={handleButtonClick}
          >
            <h1 className={styles.title}>Fakebook</h1>
          </button>
        )}
      </div>
    </div>
  );
}

export default LogIn;
