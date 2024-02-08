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
    setTimeout(() => {
      setShowSignUpForm(true);
    }, '500');
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
