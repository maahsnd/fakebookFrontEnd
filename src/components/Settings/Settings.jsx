import React, { useState } from 'react';
import Nav from '../Nav/Nav';
import styles from './settings.module.css';

function Settings({ user, setUpdateUser }) {
  const [showForm, setShowForm] = useState(false);
  return (
    <div>
      <Nav user={user} setUpdateUser={setUpdateUser} />
      <div className={styles.profPicContainer}>
        <h3 className={styles.profPicTitle}>Profile Picture</h3>
        <div className={styles.picandChangeContainer}>
          <img
            src={user.profilePicter}
            alt="Profile picture"
            className={styles.profileImg}
          />
          <button className={styles.changeBtn}>Change</button>
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
        <form className={styles.postContainer}>
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
  );
}

export default Settings;
