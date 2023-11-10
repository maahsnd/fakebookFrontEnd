import React, { useState } from 'react';
import styles from './loginform.module.css';

function LoginForm() {
  const [preexistingUser, setPreexistingUser] = useState(true);

  if (preexistingUser) {
    return (
      <div className={styles.container}>
        <h1 className={styles.title}>Fakebook</h1>
        <form /* onSubmit={handleSubmit} */>
          <div className={styles.formGroup}>
            {' '}
            <label>
              Username
              <input
                name="username"
                type="text"
                /*     onChange={(e) => setUsername(e.target.value)} */
              />
            </label>
          </div>

          <div className={styles.formGroup}>
            {' '}
            <label>
              Password
              <input name="password" type="password" />
            </label>
          </div>

          <button className={styles.btn} type="submit">
            Log in
          </button>
          <hr />
          <button className={styles.btn}>Log in as Guest User</button>
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
        <form /* onSubmit={handleSubmit} */>
          <div className={styles.formGroup}>
            {' '}
            <label>
              Username:
              <input
                name="username"
                type="text"
                /*     onChange={(e) => setUsername(e.target.value)} */
              />
            </label>
          </div>
          <div className={styles.formGroup}>
            <label>
              Password:
              <input name="password" type="password" />
            </label>
          </div>
          <div className={styles.formGroup}>
            {' '}
            <label>
              Confirm Password:
              <input name="confirmPassword" type="password" />
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
