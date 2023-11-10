import React, { useState } from 'react';
import styles from './login.module.css';
import LoginForm from '../LoginForm/LoginForm';
function LogIn() {
  const [showSignUpForm, setShowSignUpForm] = useState(false);

  const handleButtonClick = () => {
    setShowSignUpForm(true);
  };

  return (
    <div className={styles.container}>
      <div className={styles.loginCard}>
        {showSignUpForm ? (
          <LoginForm />
        ) : (
          <button className={styles.mainBtn} onClick={handleButtonClick}>
            <h1 className={styles.title}>Fakebook</h1>
          </button>
        )}
      </div>
    </div>
  );
}

export default LogIn;
