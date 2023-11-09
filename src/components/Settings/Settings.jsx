import React, { useState, useEffect } from 'react';
import Nav from '../Nav/Nav';
import styles from './settings.module.css';
import { useParams } from 'react-router-dom';

function Settings() {
  const [showForm, setShowForm] = useState(false);
  const [updateUser, setUpdateUser] = useState(false);
  const [user, setUser] = useState(null);
  const { id } = useParams();
  useEffect(() => {
    const fetchUser = async () => {
      const response = await fetch('https://localhost:3000/users/' + id);
      const data = await response.json();
      setUser(data);
      setUpdateUser(false);
    };
    fetchUser();
  }, [updateUser]);

  if (user) {
    return (
      <>
        <Nav user={user} setUpdateUser={setUpdateUser} />
        <div className={styles.settingsContainer}>
          <h2 className={styles.settingsTitle}>Settings</h2>
          <div className={styles.profPicContainer}>
            <h3 className={styles.profPicTitle}>Profile Picture</h3>
            <div className={styles.picAndChangeContainer}>
              <img
                src={user.profilePhoto}
                alt="Profile picture"
                className={styles.profImg}
              />

              <button
                className={styles.changeBtn}
                onClick={() => {
                  showForm ? setShowForm(false) : setShowForm(true);
                }}
              >
                Change
              </button>
            </div>

            <div
              className={
                showForm ? styles.formContainerShow : styles.formContainerHide
              }
            >
              <form className={styles.profPicForm}>
                <input type="file" name="profPicSelect" id="profPicSelect" />
                <button className={styles.submitProfPic}>Submit</button>
              </form>
            </div>
          </div>

          <div className={styles.aboutMe}>
            <h3 className={styles.aboutMeTitle}>About Me</h3>
            <form className={styles.bioForm}>
              <textarea
                /*    onChange={} */
                /*             value={} */
                className={styles.bioTextArea}
                name="updateBio"
                id="updateBio"
              ></textarea>
              <button
                className={styles.bioBtn}
                /*    onClick={} */
              >
                Post
              </button>
            </form>
          </div>
        </div>
      </>
    );
  }
}

export default Settings;
